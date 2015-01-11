define(['app', 'services/adminData', 'services/otherData', 'directives/confirmClick'], function (app) {
    app.controller('AdminEditUserCtrl', function ($scope, $routeParams, adminData, otherData) {
        var currentUserBackup;

        adminData.getUserById($routeParams.id).then(function (data) {
            $scope.user = data;
            $scope.password = { username: data.userName };
            currentUserBackup = angular.copy(data);
        });

        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });

        $scope.resetUserData = function () {
            $scope.user = angular.copy(currentUserBackup);
        };

        $scope.changePassword = function () {
            adminData.changeUserPassword($scope.password).finally(function () {
                $scope.password = { username: $scope.user.userName };
            });
        };

        $scope.updateUser = function () {
            adminData.updateUser($scope.user.userName, $scope.user).then(function () {
                adminData.getUserById($routeParams.id).then(function (data) {
                    $scope.user = data;
                    currentUserBackup = angular.copy(data);
                })
            })
        };
    });
});
