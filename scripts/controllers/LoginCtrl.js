define(['app'], function (app) {
    app.controller('LoginCtrl', function ($scope, $location, userData) {
        $scope.login = function () {
            userData.login($scope.loginUser).then(function (data) {
                if (data.isAdmin) {
                    $location.path('/admin/home');
                } else {
                    $location.path('/');
                }
            });
        };
    });
});
