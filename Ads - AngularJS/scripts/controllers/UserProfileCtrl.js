define(['app', 'services/otherData', 'directives/confirmClick'], function (app) {
    app.controller('UserProfileCtrl', function ($scope, $rootScope, userData, otherData) {
        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });

        $scope.resetUserData = function () {
            $scope.user = angular.copy($rootScope.currentUser);
            $scope.user.username = undefined;
            $scope.user.accessToken = undefined;
        };
        $scope.resetUserData();

        $scope.changePassword = function () {
            userData.changePassword($scope.password).finally(function () {
                $scope.password = undefined;
            });
        };

        $scope.updateUser = function () {
            userData.updateUser($scope.user).finally(function () {
                $scope.resetUserData();
            });
        };
    });
});
