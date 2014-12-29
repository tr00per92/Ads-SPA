define(['angularAMD', 'angular', 'angular-route'], function (angularAMD) {
    var app = angular
        .module('ads', ['ngRoute'])
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
                .when('/user/home', angularAMD.route({
                    templateUrl: 'views/home.html'
                }))
                .otherwise({ redirectTo: '/' });
        })
        .run(function ($rootScope, $location, user) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (next.$$route && !next.$$route.public && !user.current) {
                    $location.path('/login');
                }
            })
        });

    return angularAMD.bootstrap(app);
});
