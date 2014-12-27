define(['angularAMD', 'angular', 'angular-route'], function (angularAMD) {
    var app = angular.module('ads', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', angularAMD.route({
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl',
                    controllerUrl: 'controllers/HomeCtrl'
                }))
                .otherwise({ redirectTo: '/' });
    });
    return angularAMD.bootstrap(app);
});
