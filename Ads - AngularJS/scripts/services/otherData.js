define(['app'], function (app) {
    app.factory('otherData', function ($http, $q, backendUrl) {
        function getAll(items) {
            var deferred = $q.defer();
            $http.get(backendUrl + items)
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
            getTowns: function () {
                return getAll('towns');
            },
            getCategories: function () {
                return getAll('categories')
            }
        };
    });
});
