define(['app'], function (app) {
    app.factory('alerts', function ($rootScope) {
        $rootScope.alerts = [];
        $rootScope.closeAlert = function (index) {
            $rootScope.alerts.splice(index, 1);
        };

        return {
            add: function (type, msg) {
                $rootScope.alerts.push({ 'type': type, 'msg': msg });
            }
        };
    });
});
