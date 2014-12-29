define(['app', 'services/adData', 'services/otherData', 'directives/realSrc'], function (app) {
    app.controller('HomeCtrl', function ($scope, $rootScope, adData, otherData) {
        $rootScope.title = 'Ads - Home';
        $scope.selectedTown = '';
        $scope.selectedCategory = '';
        $scope.selectedPage = 1;

        $scope.loadAds = function () {
            adData.getAds($scope.selectedPage, $scope.selectedTown, $scope.selectedCategory)
                .then(function (data) {
                    $scope.totalAds = data.numItems;
                    $scope.ads = data.ads;
            });
        };
        $scope.loadAds();

        otherData.getCategories().then(function (data) {
            $scope.categories = data;
        });

        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });

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
