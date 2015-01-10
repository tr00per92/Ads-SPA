define(['app', 'services/adminData', 'directives/confirmClick', 'directives/editModal'], function (app) {
    app.controller('AdminCategoriesCtrl', function ($scope, adminData) {
        $scope.baseItem = 'Category';
        $scope.selectedPage = 1;

        $scope.loadItems = function () {
            adminData.getCategories($scope.selectedPage).then(function (data) {
                $scope.totalItems = data.numItems;
                $scope.items = data.categories;
            })
        };
        $scope.loadItems();

        $scope.createItem = function (newName) {
            adminData.createCategory(newName).then(function () {
                $scope.loadItems();
            });
        };

        $scope.editItem = function (itemId, newName) {
            adminData.editCategory(itemId, newName).then(function () {
                $scope.loadItems();
            });
        };

        $scope.deleteItem = function (item) {
            adminData.deleteCategory(item.id).then(function () {
                $scope.loadItems();
            });
        };
    });
});
