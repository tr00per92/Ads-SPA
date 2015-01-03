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
                    title: 'Home',
                    public: true
                }))
                .when('/register', angularAMD.route({
                    templateUrl: 'views/register.html',
                    controller: 'RegisterCtrl',
                    controllerUrl: 'controllers/RegisterCtrl',
                    title: 'Registration',
                    public: true
                }))
                .when('/login', angularAMD.route({
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl',
                    controllerUrl: 'controllers/LoginCtrl',
                    title: 'Login',
                    public: true
                }))
                .when('/logout', angularAMD.route({
                    template: '',
                    controller: function (userData) {
                        userData.logout();
                    }
                }))
                .when('/user/profile', angularAMD.route({
                    templateUrl: 'views/user-profile.html',
                    controller: 'UserProfileCtrl',
                    controllerUrl: 'controllers/UserProfileCtrl',
                    title: 'Edit User Profile'
                }))
                .when('/user/ads', angularAMD.route({
                    templateUrl: 'views/user-ads.html',
                    controller: 'UserAdsCtrl',
                    controllerUrl: 'controllers/UserAdsCtrl',
                    title: 'My Ads'
                }))
                .when('/user/ads/publish', angularAMD.route({
                    templateUrl: 'views/ad-form.html',
                    controller: 'NewAdCtrl',
                    controllerUrl: 'controllers/NewAdCtrl',
                    title: 'Publish New Ad'
                }))
                .when('/user/ads/edit/:id', angularAMD.route({
                    templateUrl: 'views/ad-form.html',
                    controller: 'EditAdCtrl',
                    controllerUrl: 'controllers/EditAdCtrl',
                    title: 'Edit Ad'
                }))
                .when('/admin/home', angularAMD.route({
                    templateUrl: 'views/admin-home.html',
                    controller: 'AdminHomeCtrl',
                    controllerUrl: 'controllers/AdminHomeCtrl',
                    title: 'Administration Home',
                    admin: true
                }))
                .otherwise({ redirectTo: '/' });
        })
        .run(function ($rootScope, $location, userData) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (next.$$route && next.$$route.originalPath && !next.$$route.public) {
                    if (!$rootScope.currentUser || (next.$$route.admin && !$rootScope.currentUser.isAdmin)) {
                        $location.path('/');
                    }
                }
            });
            $rootScope.$on('$routeChangeSuccess', function (event, next) {
                $rootScope.title = 'Ads - ' + next.$$route.title;
            });
        });

    return angularAMD.bootstrap(app);
});
