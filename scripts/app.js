define(['angularAMD', 'angular', 'angular-route', 'ui-bootstrap'], function (angularAMD) {
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
                .when('/user/profile', angularAMD.route({
                    templateUrl: 'views/user-profile.html',
                    controller: 'UserProfileCtrl',
                    controllerUrl: 'controllers/UserProfileCtrl'
                }))
                .when('/user/ads', angularAMD.route({
                    templateUrl: 'views/user-ads.html',
                    controller: 'UserAdsCtrl',
                    controllerUrl: 'controllers/UserAdsCtrl'
                }))
                .when('/user/ads/publish', angularAMD.route({
                    templateUrl: 'views/ad-form.html',
                    controller: 'NewAdCtrl',
                    controllerUrl: 'controllers/NewAdCtrl'
                }))
                .when('/user/ads/edit/:id', angularAMD.route({
                    templateUrl: 'views/ad-form.html',
                    controller: 'EditAdCtrl',
                    controllerUrl: 'controllers/EditAdCtrl'
                }))
                .otherwise({ redirectTo: '/' });
        })
        .run(function ($rootScope, $location, userData) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (next.$$route && next.$$route.originalPath && !next.$$route.public && !$rootScope.currentUser) {
                    $location.path('/login');
                }
            })
        });

    return angularAMD.bootstrap(app);
});
