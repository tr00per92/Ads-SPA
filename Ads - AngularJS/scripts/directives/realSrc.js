define(['app'], function (app) {
    app.directive('realSrc', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                attributes.$observe('realSrc', function (newValue) {
                    if (newValue === '') {
                        element.attr('src', 'images/default-image.jpg');
                    } else if (newValue !== undefined) {
                        var img = new Image();
                        img.src = attributes.realSrc;
                        angular.element(img).bind('load', function () {
                            element.attr('src', attributes.realSrc);
                        });
                    }
                });
            }
        };
    });
});
