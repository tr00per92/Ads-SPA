define(['app'], function (app) {
    app.directive('editModal', function ($modal) {
        var ModalInstanceCtrl = function ($scope, $modalInstance) {
            $scope.ok = function() {
                $modalInstance.close($scope.newName);
            };
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        };

        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                element.bind('click', function() {
                        var modalHtml = '<div class="modal-body">Please enter the name: ' +
                            '<input type="text" ng-model="newName" ng-init="newName=\'' + (attributes.itemName || '') + '\'" /></div>' +
                            '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">Ok</button>' +
                            '<button class="btn btn-default" ng-click="cancel()">Cancel</button></div>',
                        modalInstance = $modal.open({
                            template: modalHtml,
                            controller: ModalInstanceCtrl
                        });

                    modalInstance.result.then(function (newName) {
                        if (attributes.newItem !== undefined) {
                            scope.editModal()(newName);
                        } else {
                            scope.editModal()(attributes.itemId, newName);
                        }
                    });
                });
            },
            scope: {
                editModal: '&'
            }
        }
    });
});
