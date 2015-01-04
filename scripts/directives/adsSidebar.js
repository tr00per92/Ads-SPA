define(['app'], function (app) {
    app.directive('adsSidebar', function ($rootScope) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope) {
                scope.getAsideUrl = function () {
                    if (!$rootScope.currentUser) {
                        return 'views/guest-nav.html';
                    } else if ($rootScope.currentUser.isAdmin) {
                        return 'views/admin-nav.html';
                    } else {
                        return 'views/user-nav.html';
                    }
                };
            },
            template: '<aside ng-include="getAsideUrl()"></aside>'
        }
    });
});
