define(['app', 'services/adData', 'services/otherData'], function (app) {
    app.controller('HomeCtrl', function ($scope, adData, otherData) {
        adData.getAll().then(function (data) {
            $scope.ads = data.ads;
        });
        otherData.getCategories().then(function (data) {
            $scope.categories = data;
        });
        otherData.getTowns().then(function (data) {
            $scope.towns = data;
        });
    });
});
