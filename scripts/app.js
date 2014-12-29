define(['angularAMD', 'angular-route', 'ui-bootstrap'], function (angularAMD) {
    var app = angular
        .module('ads', ['ngRoute', 'ui.bootstrap'])
        .constant('backendUrl', 'http://localhost:1337/api/')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', angularAMD.route({
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl',
                    controllerUrl: 'controllers/HomeCtrl',
                    public: true
                }))
                .when('/register', angularAMD.route({
                    templateUrl: 'views/register.html',
                    controller: 'RegisterCtrl',
                    controllerUrl: 'controllers/RegisterCtrl',
                    public: true
                }))
                .when('/login', angularAMD.route({
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl',
                    controllerUrl: 'controllers/LoginCtrl',
                    public: true
                }))
                .when('/logout', angularAMD.route({
                    templateUrl: 'views/home.html',
                    controller: 'LogoutCtrl',
                    controllerUrl: 'controllers/LogoutCtrl',
                    public: true
                }))
                .when('/user/home', angularAMD.route({
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl',
                    controllerUrl: 'controllers/HomeCtrl'
                }))
                .otherwise({ redirectTo: '/' });
        })
        .run(function ($rootScope, $location, userData) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (next.$$route && !next.$$route.public && !$rootScope.currentUser) {
                    $location.path('/login');
                }
            })
        });

    return angularAMD.bootstrap(app);
});
