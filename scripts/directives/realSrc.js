define(['app'], function (app) {
    app.directive('realSrc', function () {
        return {
            link: function (scope, element, attributes) {
                attributes.$observe('realSrc', function (newValue) {
                    if (newValue !== undefined) {
                        var img = new Image();
                        img.src = attributes.realSrc;
                        angular.element(img).bind('load', function () {
                            element.attr('src', attributes.realSrc);
                        });
                    }
                });
            }
        }
    });
});
