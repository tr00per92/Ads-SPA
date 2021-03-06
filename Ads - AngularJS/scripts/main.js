require.config({
    baseUrl: 'scripts',
    paths: {
        'angularAMD': 'https://cdn.jsdelivr.net/angular.amd/0.2/angularAMD.min',
        'angular-route': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.min',
        'ui-bootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.12.0/ui-bootstrap-tpls.min'
    },
    deps: ['app', 'services/userData', 'directives/adsSidebar', 'directives/adsHeader', 'directives/adsAlerts']
});
