define(['app'], function (app) {
    app.factory('adsData', function ($http, $q, backendUrl) {
        var baseUrl = backendUrl + 'ads';

        function getAllAds() {
            var deferred = $q.defer();
            $http({method: 'GET', url: baseUrl + '?pagesize=100'})
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
            getAllAds: getAllAds
        };
    });
});
