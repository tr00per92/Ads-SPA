define(['app', 'services/otherData'], function (app) {
    app.controller('UserProfileCtrl', function ($scope, $rootScope, userData, otherData) {
        $rootScope.title = 'Ads - Edit User Profile';

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
