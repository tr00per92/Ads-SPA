define(['app'], function (app) {
    app.controller('LogoutCtrl', function ($rootScope, $location, userData) {
        $rootScope.currentUser = undefined;
        delete localStorage['currentUser'];
        $location.path('/');
    });
});
