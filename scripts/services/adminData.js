define(['app', 'services/alerts'], function (app) {
    app.factory('adminData', function ($rootScope, $http, $q, backendUrl, alerts) {
        var baseUrl = backendUrl + 'admin/';

        function getAds(startPage, townId, categoryId, statusId) {
            var deferred = $q.defer();
            $http.get(baseUrl + 'ads?pagesize=5&startpage=' + startPage + '&townid=' + townId +
                                '&categoryid=' + categoryId + '&status=' + statusId, {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.currentUser.accessToken
                }})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    console.error(data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function editAd(adId, action, adObj) {
            var deferred = $q.defer();
            $http.put(baseUrl + 'ads/' + action + adId, adObj, {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.currentUser.accessToken
                }})
                .success(function (data) {
                    var successMsg;
                    switch (action) {
                        case 'approve/': successMsg = 'Advertisement approved successfully.'; break;
                        case 'reject/': successMsg = 'Advertisement rejected successfully.'; break;
                        case '': successMsg = 'Advertisement edited successfully.'; break;
                        default: successMsg = 'Operation successful.'; break;
                    }
                    alerts.add('success', successMsg);
                    deferred.resolve(data);
                })
                .error(function (data) {
                    alerts.add('danger', data.message || data.modelState[Object.keys(data.modelState)[0]][0]);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function getItems(startPage, items) {
            var deferred = $q.defer();
            $http.get(baseUrl + items + '?pagesize=10&startpage=' + startPage, {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.currentUser.accessToken
                }})
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    console.error(data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function deleteItem(itemId, itemType) {
            var deferred = $q.defer();
            $http.delete(baseUrl + itemType + itemId, {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.currentUser.accessToken
                }})
                .success(function (data) {
                    var successMsg;
                    switch (itemType) {
                        case 'ads/': successMsg = 'Advertisement deleted successfully.'; break;
                        case 'user/': successMsg = 'User deleted successfully.'; break;
                        case 'categories/': successMsg = 'Category deleted successfully.'; break;
                        case 'towns/': successMsg = 'Town deleted successfully.'; break;
                        default: successMsg = 'Operation successful.'; break;
                    }
                    alerts.add('success', successMsg);
                    deferred.resolve(data);
                })
                .error(function (data) {
                    alerts.add('danger', data.message || data.modelState[Object.keys(data.modelState)[0]][0]);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        return {
            getAds: getAds,
            editAd: function (adId, adObj) {
                return editAd(adId, '', adObj)
            },
            approveAd: function (adId) {
                return editAd(adId, 'approve/');
            },
            rejectAd: function (adId) {
                return editAd(adId, 'reject/');
            },
            getCategories: function (startPage) {
                return getItems(startPage, 'categories');
            },
            getTowns: function (startPage) {
                return getItems(startPage, 'towns');
            },
            getUsers: function (startPage) {
                return getItems(startPage, 'users');
            },
            deleteAd: function (adId) {
                return deleteItem(adId, 'ads/');
            },
            deleteUser: function (username) {
                return deleteItem(username, 'user/');
            },
            deleteCategory: function (categoryId) {
                return deleteItem(categoryId, 'categories/');
            },
            deleteTown: function (townId) {
                return deleteItem(townId, 'towns/');
            }
        }
    });
});
