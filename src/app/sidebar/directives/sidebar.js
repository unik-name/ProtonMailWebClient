/* @ngInject */
const sidebar = (sidebarModel, userSettingsModel) => ({
    scope: {},
    replace: true,
    templateUrl: require('../../../templates/partials/sidebar.tpl.html'),
    link(scope) {
        scope.listStates = Object.keys(sidebarModel.getStateConfig());

        if (userSettingsModel.get('UnikName')) {
            scope.myUnikName = `@${userSettingsModel.get('UnikName')}`;
        }

        scope.updateUnikName = () => {
            userSettingsModel.set('UnikName', scope.myUnikName.replace('@', ''));
        };
    }
});
export default sidebar;
