(function(app) {
    'use strict';

    // Route
    app.config(function( $stateProvider ) {
        $stateProvider.state('template', {
            abstract: true,
            templateUrl: 'app/views/template/template.tpl.html'
        });
    });

}(angular.module('xbw.template', [
])));
