define(['app', 'services/adData', 'services/otherData', 'directives/realSrc'], function (app) {
    app.controller('HomeCtrl', function ($scope, $rootScope, adData, otherData) {
        $rootScope.title = 'Ads - Home';

        $scope.loadAds = function () {
            adData.getAds($scope.selectedPage).then(function (data) {
                $scope.totalAds = data.numItems;
                $scope.ads = data.ads;
            });
        };
        $scope.selectedPage = 1;
        $scope.loadAds();

        otherData.getCategories().then(function (data) {
            $scope.categories = data;
        });
        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });
    });
});
