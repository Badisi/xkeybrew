(function(app) {
    'use strict';

	// not used, TODO:
    app.directive('pathLoader', function() {
        return {
            restrict: 'A',
            link: function( $scope, element, attrs ) {
                var el = element[0];

                // Initialize
                el.style.strokeDasharray = el.style.strokeDashoffset = el.getTotalLength();

                // Listen for changes
                attrs.$observe('pathLoader', function(value) {
                    // Draw path
                    el.style.strokeDashoffset = el.getTotalLength() * (1 - value/10);
                });
            }
        };
    });

}(angular.module('xbw.pathloader', [
])));
