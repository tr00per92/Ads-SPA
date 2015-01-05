define(['app', 'services/adminData', 'services/otherData', 'directives/realSrc', 'directives/confirmClick'], function (app) {
    app.controller('AdminHomeCtrl', function ($scope, adminData, otherData) {
        $scope.selectedTown = '';
        $scope.selectedCategory = '';
        $scope.selectedStatus = '';
        $scope.selectedPage = 1;

        $scope.loadAds = function () {
            adminData.getAds($scope.selectedPage, $scope.selectedTown, $scope.selectedCategory, $scope.selectedStatus)
                .then(function (data) {
                    $scope.totalAds = data.numItems;
                    $scope.ads = data.ads;
                });
        };
        $scope.loadAds();

        $scope.approveAd = function (ad) {
            adminData.approveAd(ad.id).then(function () {
                ad.status = 'Published';
            });
        };

        $scope.rejectAd = function (ad) {
            adminData.rejectAd(ad.id).then(function () {
                ad.status = 'Rejected';
            });
        };

        $scope.deleteAd = function (ad) {
            adminData.deleteAd(ad.id).then(function () {
                $scope.loadAds();
            });
        };

        otherData.getCategories().then(function (data) {
            $scope.categories = data;
        });

        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });

        $scope.statusChanged = function (status) {
            if ($scope.selectedStatus !== status) {
                $scope.selectedStatus = status;
                $scope.loadAds();
            }
        };

        $scope.townChanged = function (townId) {
            if ($scope.selectedTown !== townId) {
                $scope.selectedTown = townId;
                $scope.loadAds();
            }
        };

        $scope.categoryChanged = function (categoryId) {
            if ($scope.selectedCategory !== categoryId) {
                $scope.selectedCategory = categoryId;
                $scope.loadAds();
            }
        };
    });
});
