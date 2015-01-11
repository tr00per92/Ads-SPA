define(['app'], function (app) {
    app.directive('adsHeader', function () {
        return {
            restrict: 'A',
            replace: true,
            template: "<h1 ng-bind=\"title + (currentUser ? ' (' + currentUser.username + ')' : '')\"></h1>"
        }
    });
});
