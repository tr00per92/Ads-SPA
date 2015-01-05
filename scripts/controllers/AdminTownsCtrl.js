define(['app', 'services/adminData', 'directives/confirmClick'], function (app) {
    app.controller('AdminTownsCtrl', function ($scope, adminData) {
        $scope.baseItem = 'Town';
        $scope.selectedPage = 1;

        $scope.loadItems = function () {
            adminData.getTowns($scope.selectedPage).then(function (data) {
                $scope.totalItems = data.numItems;
                $scope.items = data.towns;
            })
        };
        $scope.loadItems();

        $scope.deleteItem = function (item) {
            adminData.deleteTown(item.id).then(function () {
                $scope.loadItems();
            });
        };
    });
});
