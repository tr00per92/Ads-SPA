define(['app', 'services/alerts'], function (app) {
    app.factory('adData', function ($rootScope, $http, $q, backendUrl, alerts) {
        var baseUrl = backendUrl + 'user/ads';

        function getAds(startPage, townId, categoryId) {
            var deferred = $q.defer();
            $http.get(backendUrl + 'ads?pagesize=5&startpage=' + startPage + '&townid=' + townId + '&categoryid=' + categoryId)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    console.error(data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function getUserAds(startPage, statusId) {
            var deferred = $q.defer();
            $http.get(baseUrl + '?pagesize=4&startpage=' + startPage + '&status=' + statusId, {
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

        function getAdById(adId) {
            var deferred = $q.defer();
            $http.get(baseUrl + '/' + adId, {
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

        function publishAd(adObj) {
            var deferred = $q.defer();
            $http.post(baseUrl, JSON.stringify(adObj), {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.currentUser.accessToken
                }})
                .success(function (data) {
                    alerts.add('success', 'Advertisement submitted for approval. Once approved, it will be published.');
                    deferred.resolve(data);
                })
                .error(function (data) {
                    alerts.add('danger', data.modelState[Object.keys(data.modelState)[0]][0]);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function deleteAd(adId) {
            var deferred = $q.defer();
            $http.delete(baseUrl + '/' + adId, {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.currentUser.accessToken
                }})
                .success(function (data) {
                    alerts.add('success', 'Ad deleted successfully.');
                    deferred.resolve(data);
                })
                .error(function (data) {
                    alerts.add('danger', data.message);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function editAd(adId, action, adObj) {
            var deferred = $q.defer();
            $http.put(baseUrl + '/' + action + adId, adObj, {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.currentUser.accessToken
                }})
                .success(function (data) {
                    var successMsg;
                    switch (action) {
                        case 'deactivate/': successMsg = 'Ad deactivated successfully.'; break;
                        case 'publishagain/': successMsg = 'Ad submitted for approval.'; break;
                        default: successMsg = 'Advertisement edited. Don\'t forget to submit it for publishing.'; break;
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
            getUserAds: getUserAds,
            getAdById: getAdById,
            publishAd: publishAd,
            deleteAd: deleteAd,
            editAd: function (adId, adObj) {
                return editAd(adId, '', adObj)
            },
            deactivateAd: function (adId) {
                return editAd(adId, 'deactivate/');
            },
            publishAgainAd: function (adId) {
                return editAd(adId, 'publishagain/');
            }
        };
    });
});
