define(['app'], function (app) {
    app.factory('adData', function ($rootScope, $http, $q, backendUrl) {
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

        function publishAd(adObj) {
            var deferred = $q.defer();
            $http.post(backendUrl + 'user/ads', JSON.stringify(adObj), {
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
            publishAd: publishAd
        };
    });
});
