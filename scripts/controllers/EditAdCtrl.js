define(['app', 'services/adData', 'services/otherData', 'directives/realSrc', 'directives/fileSelect'], function (app) {
    app.controller('EditAdCtrl', function ($scope, $rootScope, $routeParams, adData, otherData) {
        $rootScope.title = 'Ads - Edit Ad';
        $scope.editAd = true;
        var currentAdBackup;

        adData.getAdById($routeParams.id).then(function (data) {
            $scope.currentAd = data;
            currentAdBackup = angular.copy(data);
        });

        otherData.getCategories().then(function (data) {
            $scope.categories = data;
        });

        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });

        $scope.editAd = function () {
            adData.editAd($scope.currentAd.id, $scope.currentAd).then(function () {
            });
        };

        $scope.resetForm = function () {
            $scope.currentAd = angular.copy(currentAdBackup);
        };

        $scope.removeImage = function () {
            $scope.currentAd.imageDataUrl = undefined;
            var input = document.getElementById('img-selector');
            input.value = input.defaultValue;
        }
    });
});
