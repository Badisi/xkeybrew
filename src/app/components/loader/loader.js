(function(app) {
    'use strict';

    app.directive('loader', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/loader/loader.tpl.html',
            scope: {
                effect: '@'
            }
        };
    });

}(angular.module('xbw.loader', [
])));
