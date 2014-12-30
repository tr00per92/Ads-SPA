define(['app', 'services/adData', 'services/otherData', 'directives/realSrc', 'directives/fileSelect'], function (app) {
    app.controller('NewAdCtrl', function ($scope, $rootScope, adData, otherData) {
        $rootScope.title = 'Ads - Publish New Ad';

        otherData.getCategories().then(function (data) {
            $scope.categories = data;
        });

        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });

        $scope.publishAd = function () {
            adData.publishAd($scope.newAd).then(function () {
                $scope.newAd = undefined;
            });
        }
    });
});