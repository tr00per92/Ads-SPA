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
                    templateUrl: 'views/register.html'
                }))
                .when('/login', angularAMD.route({
                    templateUrl: 'views/login.html',
                    public: true
                }))
                .otherwise({ redirectTo: '/' });
        })
        .run(function ($rootScope, $location, user) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (next.$$route && !next.$$route.public && !user.loggedIn) {
                    $location.path('/login');
                }
            })
        });

    return angularAMD.bootstrap(app);
});
