define(['app'], function (app) {
    app.directive('adsSidebar', function ($rootScope) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope) {
                scope.getAsideUrl = function () {
                    if (!$rootScope.currentUser) {
                        return 'templates/sidebars/guest-nav.html';
                    } else if ($rootScope.currentUser.isAdmin) {
                        return 'templates/sidebars/admin-nav.html';
                    } else {
                        return 'templates/sidebars/user-nav.html';
                    }
                };
            },
            template: '<aside ng-include="getAsideUrl()"></aside>'
        }
    });
});
