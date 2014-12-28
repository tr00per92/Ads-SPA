define(['angularAMD'], function (angularAMD) {
    var app = angular
        .module('ads', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', angularAMD.route({
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl',
                    controllerUrl: 'controllers/HomeCtrl'
                }))
                .otherwise({ redirectTo: '/' });
        })
        .constant('backendUrl', 'http://localhost:1337/api/');

    return angularAMD.bootstrap(app);
});
