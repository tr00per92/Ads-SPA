define(['app', 'services/adsData'], function (app) {
    app.controller('HomeCtrl', function ($scope, adsData) {
        adsData.getAllAds().then(function (data) {
            $scope.ads = data.ads;
        });
    });
});
