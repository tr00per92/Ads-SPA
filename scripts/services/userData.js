define(['app'], function (app) {
    app.factory('userData', function ($http, $q, $rootScope, backendUrl) {
        if (localStorage['currentUser']) {
            $rootScope.currentUser = JSON.parse(localStorage['currentUser'])
        }

        function registerOrLogin(userObj, type) {
            var deferred = $q.defer();
            $http.post(backendUrl + 'user/' + type, JSON.stringify(userObj))
                .success(function (data) {
                    getUserProfile(data.access_token).then(function (userData) {
                        userData.username = data.username;
                        userData.accessToken = data.access_token;
                        $rootScope.currentUser = userData;
                        localStorage['currentUser'] = JSON.stringify(userData);
                        deferred.resolve(data);
                    });
                })
                .error(function (data) {
                    console.error(data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function getUserProfile(accessToken) {
            var deferred = $q.defer();
            $http.get(backendUrl + 'user/profile', {
                headers: { 'Authorization': 'Bearer ' + accessToken }
            })
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
            login: function (userObj) {
                return registerOrLogin(userObj, 'login');
            },
            register: function (userObj) {
                return registerOrLogin(userObj, 'register');
            }
        };
    });
});
