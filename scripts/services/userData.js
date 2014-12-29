define(['app'], function (app) {
    app.factory('userData', function ($http, $q, $rootScope, backendUrl) {
        var baseUrl = backendUrl + 'user/';
        if (localStorage['currentUser']) {
            $rootScope.currentUser = JSON.parse(localStorage['currentUser'])
        }

        function getUserProfile(accessToken) {
            var deferred = $q.defer();
            $http.get(baseUrl + 'profile', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
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

        function registerOrLogin(userObj, type) {
            var deferred = $q.defer();
            $http.post(baseUrl + type, JSON.stringify(userObj))
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

        function changePassword(passwordObj) {
            var deferred = $q.defer();
            $http.put(baseUrl + 'changepassword', JSON.stringify(passwordObj), {
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

        function updateUser(userObj) {
            var deferred = $q.defer();
            $http.put(baseUrl + 'profile', JSON.stringify(userObj), {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.currentUser.accessToken
                }})
                .success(function (data) {
                    $rootScope.currentUser.name = userObj.name;
                    $rootScope.currentUser.email = userObj.email;
                    $rootScope.currentUser.phoneNumber = userObj.phoneNumber;
                    $rootScope.currentUser.townId = userObj.townId;
                    localStorage['currentUser'] = JSON.stringify($rootScope.currentUser);
                    deferred.resolve(data);
                })
                .error(function (data) {
                    console.error(data);
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            $http.post(baseUrl + 'logout', undefined, {
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
            login: function (userObj) {
                return registerOrLogin(userObj, 'login');
            },
            register: function (userObj) {
                return registerOrLogin(userObj, 'register');
            },
            changePassword: changePassword,
            updateUser: updateUser,
            logout: logout
        };
    });
});
