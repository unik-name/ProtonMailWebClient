/* @ngInject */
function showUnikNameModal(pmModal) {
    return pmModal({
        controllerAs: 'ctrl',
        templateUrl: require('../../../templates/modals/showUnikNameModal.tpl.html'),
        /* @ngInject */
        controller: function(params, contactGroupModel, composerContactGroupSelection) {
            this.unikname = params.unikname;
            this.unikRange = function(min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                return input;
            };
        }
    });
}
export default showUnikNameModal;
