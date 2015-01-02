define(['app', 'services/otherData'], function (app) {
    app.controller('RegisterCtrl', function ($scope, $location, userData, otherData) {
        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });

        $scope.register = function () {
            userData.register($scope.newUser).then(function () {
                $location.path('/');
            });
        };
    });
});
