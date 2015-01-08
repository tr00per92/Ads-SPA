define(['app', 'services/adminData', 'directives/confirmClick', '../directives/editModal'], function (app) {
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

        $scope.createItem = function (newName) {
            adminData.createTown(newName).then(function () {
                $scope.loadItems();
            });
        };

        $scope.editItem = function (itemId, newName) {
            adminData.editTown(itemId, newName).then(function () {
                $scope.loadItems();
            });
        };

        $scope.deleteItem = function (item) {
            adminData.deleteTown(item.id).then(function () {
                $scope.loadItems();
            });
        };
    });
});
