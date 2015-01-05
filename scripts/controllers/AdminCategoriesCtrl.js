define(['app', 'services/adminData', 'directives/confirmClick'], function (app) {
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

        $scope.deleteItem = function (item) {
            adminData.deleteCategory(item.id).then(function () {
                $scope.loadItems();
            });
        };
    });
});
