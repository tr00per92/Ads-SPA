define(['app', 'services/adminData', 'directives/confirmClick'], function (app) {
    app.controller('AdminUsersCtrl', function ($scope, adminData) {
        $scope.selectedPage = 1;

        $scope.loadUsers = function () {
            adminData.getUsers($scope.selectedPage).then(function (data) {
                $scope.totalUsers = data.numItems;
                $scope.users = data.users;
            })
        };
        $scope.loadUsers();

        $scope.deleteUser = function (user) {
            adminData.deleteUser(user.username).then(function () {
                $scope.loadUsers();
            });
        };
    });
});
