define(['app'], function (app) {
    app.directive('confirmClick', function ($modal) {
        var ModalInstanceCtrl = function ($scope, $modalInstance) {
            $scope.ok = function() {
                $modalInstance.close();
            };
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                element.bind('click', function() {
                    var modalHtml = '<div class="modal-body">' + (attributes.confirmMessage || 'Are you sure?') + '</div>' +
                            '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">Yes</button>' +
                            '<button class="btn btn-default" ng-click="cancel()">Cancel</button></div>',
                        modalInstance = $modal.open({
                            template: modalHtml,
                            controller: ModalInstanceCtrl
                        });

                    modalInstance.result.then(function () {
                        scope.confirmClick();
                    });
                });
            },
            scope: {
                confirmClick: '&'
            }
        }
    });
});
