define(['app', 'services/adData', 'directives/realSrc'], function (app) {
    app.controller('UserAdsCtrl', function ($scope, $rootScope, adData) {
        $rootScope.title = 'Ads - My Ads';
        $scope.selectedStatus = '';
        $scope.selectedPage = 1;

        $scope.loadAds = function () {
            adData.getUserAds($scope.selectedPage, $scope.selectedStatus).then(function (data) {
                $scope.totalAds = data.numItems;
                $scope.ads = data.ads;
            })
        };
        $scope.loadAds();

        $scope.deactivateAd = function (ad) {
            adData.deactivateAd(ad.id).then(function () {
                ad.status = 'Inactive';
            });
        };

        $scope.adIsInactive = function (ad) {
            return ad.status == 'Inactive' || ad.status == 'Rejected';
        };
    });
});
