define(['app'], function (app) {
    app.controller('LoginCtrl', function ($scope, $location, userData) {
        $scope.login = function () {
            userData.login($scope.loginUser).then(function () {
                $location.path('/');
            });
        };
    });
});
