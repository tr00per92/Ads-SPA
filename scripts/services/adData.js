define(['app'], function (app) {
    app.factory('adData', function ($http, $q, backendUrl) {
        function getAds(startPage, townId, categoryId) {
            var deferred = $q.defer();
            $http.get(backendUrl + 'ads?pagesize=4&startpage=' + startPage)
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
            getAds: getAds
        };
    });
});
