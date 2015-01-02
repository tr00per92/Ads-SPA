define(['app', 'services/adData', 'directives/realSrc', 'directives/confirmClick'], function (app) {
    app.controller('UserAdsCtrl', function ($scope, $rootScope, adData, alerts) {
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
                alerts.add('success', 'Ad deactivated successfully!');
            });
        };

        $scope.publishAgainAd = function (ad) {
            adData.publishAgainAd(ad.id).then(function () {
                ad.status = 'WaitingApproval';
                alerts.add('success', 'Ad submitted for approval!');
            });
        };

        $scope.deleteAd = function (ad) {
            adData.deleteAd(ad.id).then(function () {
                $scope.loadAds();
                alerts.add('success', 'Ad deleted successfully!');
            });
        };

        $scope.adIsInactive = function (ad) {
            return ad.status == 'Inactive' || ad.status == 'Rejected';
        };
    });
});
