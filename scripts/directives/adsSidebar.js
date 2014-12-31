define(['app'], function (app) {
    app.directive('adsSidebar', function ($rootScope) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope) {
                scope.getAsideUrl = function () {
                    return $rootScope.currentUser ? 'views/user-nav.html' : 'views/guest-nav.html';
                };
            },
            template: '<aside ng-include="getAsideUrl()"></aside>'
        }
    });
});
