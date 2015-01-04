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
                        default: successMsg = 'Advertisement edited successfully.'; break;
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

        function getTownsOrCategories(startPage, items) {
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
                return getTownsOrCategories(startPage, 'categories');
            },
            getTowns: function (startPage) {
                return getTownsOrCategories(startPage, 'towns');
            }
        }
    });
});
