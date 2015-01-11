define(['app', 'services/adData', 'services/otherData', 'directives/realSrc', 'directives/fileSelect'], function (app) {
    app.controller('NewAdCtrl', function ($scope, $rootScope, $location, adData, otherData) {
        $scope.currentAd = { townId: $rootScope.currentUser.townId };

        otherData.getCategories().then(function (data) {
            $scope.categories = data;
        });

        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });

        $scope.publishAd = function () {
            adData.publishAd($scope.currentAd).then(function () {
                $location.path('/user/ads');
            });
        };

        $scope.clearForm = function () {
            $scope.currentAd = undefined;
            document.getElementById('new-ad-form').reset();
        };

        $scope.removeImage = function () {
            $scope.currentAd.imageDataUrl = undefined;
            var input = document.getElementById('img-selector');
            input.value = input.defaultValue;
        }
    });
});