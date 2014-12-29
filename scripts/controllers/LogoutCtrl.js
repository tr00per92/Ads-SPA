define(['app'], function (app) {
    app.controller('LogoutCtrl', function ($rootScope, $location, userData) {
        userData.logout().then(function () {
            $rootScope.currentUser = undefined;
            delete localStorage['currentUser'];
            $location.path('/');
        });
    });
});
