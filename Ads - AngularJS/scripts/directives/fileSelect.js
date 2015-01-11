define(['app', 'services/fileReader'], function (app) {
    app.directive('fileSelect', function(fileReader, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                element.bind('change', function (event) {
                    var file = (event.srcElement || event.target).files[0];
                    fileReader.readAsDataUrl(file, $scope).then(function (result) {
                        $timeout(function () {
                            $scope.ngModel = result;
                        });
                    });
                });
            },
            scope: {
                ngModel: '='
            }
        };
    });
});
