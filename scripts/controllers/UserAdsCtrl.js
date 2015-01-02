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

        $scope.statusChanged = function (status) {
            if ($scope.selectedStatus !== status) {
                $scope.selectedStatus = status;
                $scope.loadAds();
            }
        };

        $scope.deactivateAd = function (ad) {
            adData.deactivateAd(ad.id).then(function () {
                ad.status = 'Inactive';
            });
        };

        $scope.publishAgainAd = function (ad) {
            adData.publishAgainAd(ad.id).then(function () {
                ad.status = 'WaitingApproval';
            });
        };

        $scope.deleteAd = function (ad) {
            adData.deleteAd(ad.id).then(function () {
                $scope.loadAds();
            });
        };

        $scope.adIsInactive = function (ad) {
            return ad.status == 'Inactive' || ad.status == 'Rejected';
        };
    });
});
