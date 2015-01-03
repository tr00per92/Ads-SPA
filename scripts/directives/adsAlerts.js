define(['app'], function (app) {
    app.directive('adsAlerts', function () {
        return {
            restrict: 'A',
            template: '<div alert ng-repeat="alert in alerts" dismiss-on-timeout="4000" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</div>'
        }
    });
});
