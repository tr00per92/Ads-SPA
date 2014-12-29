define(['app'], function (app) {
    app.controller('LoginCtrl', function ($scope, $rootScope, $location, userData) {
        $rootScope.title = 'Ads - Login';
        $scope.login = function () {
            userData.login($scope.loginUser).then(function () {
                $location.path('user/home');
            });
        };
    });
});
