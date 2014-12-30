define(['app'], function (app) {
    app.factory('adData', function ($rootScope, $http, $q, backendUrl) {
        var baseUrl = backendUrl + 'user/ads';

        function getAds(startPage, townId, categoryId) {
            var deferred = $q.defer();
            $http.get(backendUrl + 'ads?pagesize=4&startpage=' + startPage + '&townid=' + townId + '&categoryid=' + categoryId)
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

        function publishAd(adObj) {
            var deferred = $q.defer();
            $http.post(baseUrl, JSON.stringify(adObj), {
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

        function deactivateAd(adId) {
            var deferred = $q.defer();
            $http.put(baseUrl + '/deactivate/' + adId, undefined, {
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
            getUserAds: getUserAds,
            publishAd: publishAd,
            deactivateAd: deactivateAd
        };
    });
});
