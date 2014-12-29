define(['app', 'services/otherData'], function (app) {
    app.controller('RegisterCtrl', function ($scope, $rootScope, $location, userData, otherData) {
        $rootScope.title = 'Ads - Registration';
        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });
        $scope.register = function () {
            userData.register($scope.newUser).then(function () {
                $location.path('user/home');
            });
        };
    });
});
