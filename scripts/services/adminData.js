define(['app'], function (app) {
    app.factory('adminData', function ($rootScope, $http, $q, backendUrl) {
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

        return {
            getAds: getAds
        }
    });
});
