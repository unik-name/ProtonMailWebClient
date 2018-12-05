/* @ngInject */
function showUnikNameModal(pmModal) {
    return pmModal({
        controllerAs: 'ctrl',
        templateUrl: require('../../../templates/modals/showUnikNameModal.tpl.html'),
        /* @ngInject */
        controller: function(params) {
            this.explicite = params.unikname;
            this.label = params.label;
            this.unikard = mapUnikName(params.unikard, params.label);

            this.unikRange = function(min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                return input;
            };

            function mapUnikName(unikard, label) {
                if (unikard && unikard.supportedTypes) {
                    let supportedTypes = unikard.supportedTypes.map((suppType) => {
                        let data = unikard.labels[label || 'default'].links[suppType.type];
                        if (data) {
                            suppType.data = data;
                        }
                        return suppType;
                    });
                    unikard.supportedTypes = supportedTypes;
                }
                return unikard;
            }
        }
    });
}
export default showUnikNameModal;
