define(['app', 'services/otherData'], function (app) {
    app.controller('RegisterCtrl', function ($scope, $rootScope, $location, user, otherData) {
        $rootScope.title = 'Ads - Registration';
        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });
        $scope.register = function () {
            user.register($scope.newUser).then(function () {
                $location.path('user/home');
            });
        };
    });
});
