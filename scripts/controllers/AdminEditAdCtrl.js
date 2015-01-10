define(['app', 'services/adminData', 'services/otherData', 'directives/realSrc', 'directives/fileSelect'], function (app) {
    app.controller('AdminEditAdCtrl', function ($scope, $routeParams, adminData, otherData) {
        var currentAdBackup;
        $scope.editAd = true;

        adminData.getAdById($routeParams.id).then(function (data) {
            $scope.currentAd = data;
            currentAdBackup = angular.copy(data);
        });

        otherData.getCategories().then(function (data) {
            $scope.categories = data;
        });

        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });

        $scope.resetForm = function () {
            $scope.currentAd = angular.copy(currentAdBackup);
        };

        $scope.removeImage = function () {
            $scope.currentAd.imageDataUrl = undefined;
            var input = document.getElementById('img-selector');
            input.value = input.defaultValue;
        };

        $scope.editAd = function () {
            if ($scope.currentAd.imageDataUrl != currentAdBackup.imageDataUrl) {
                $scope.currentAd.changeImage = true;
            }

            adminData.editAd($scope.currentAd.id, $scope.currentAd).then(function () {
                $scope.currentAd.changeImage = undefined;
                currentAdBackup = angular.copy($scope.currentAd);
            });
        };
    });
});
