define(['angularAMD'], function (angularAMD) {
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
                    public: true
                }))
                .when('/login', angularAMD.route({
                    templateUrl: 'views/login.html',
                    public: true
                }))
                .otherwise({ redirectTo: '/' });
        })
        .run(function ($rootScope, $location) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (next.$$route && !next.$$route.public) {
                    $location.path('/login');
                }
            })
        });

    return angularAMD.bootstrap(app);
});
