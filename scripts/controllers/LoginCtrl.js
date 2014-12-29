define(['app'], function (app) {
    app.controller('LoginCtrl', function ($scope, $rootScope, $location, user) {
        $rootScope.title = 'Ads - Login';
        $scope.login = function () {
            user.login($scope.loginUser).then(function () {
                $location.path('user/home');
            });
        };
    });
});
