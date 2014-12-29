define(['app'], function (app) {
    app.factory('user', function ($http) {
        return {
            loggedIn: true,
            username: '',
            accessToken: '',
            name: '',
            email: '',
            phoneNumber: '',
            townId: ''
        };
    });
});
