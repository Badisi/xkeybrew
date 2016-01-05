(function(app) {
    'use strict';

    app.directive('starRating', function() {
        return {
            restrict: 'EA',
            templateUrl: 'app/components/star-rating/star-rating.tpl.html',
            scope: {
                readonly: '=?',
                value: '=ngModel',
                max: '=?',
                onClick: '&?'
            },
            link: function(scope, el, attrs) {
                if( !angular.isDefined(scope.max) ) {
                    scope.max = 5;
                }

                // LISTENER(s)
                scope.$watch('max', function(newValue) {
                    scope.stars = [];
                    for( var i = 0; i < newValue; i++ ) {
                        scope.stars.push({
                            icon: (i < scope.value) ? 'star' : 'star_outline'
                        });
                    }
                });

                scope.$watch('value', function(newValue) {
                    if( newValue >= 0 ) {
                        angular.forEach(scope.stars, function(star, index) {
                            star.icon = (index < newValue) ? 'star' : 'star_outline';
                        });
                    }
                });

                // HANDLER(s)
                scope.toggle = function(index) {
                    if( (scope.readonly === undefined) || (scope.readonly === false) ) {
                        scope.value = ((index + 1) === scope.value) ? index : index + 1;
                        if( scope.onClick !== undefined ) {
                            scope.onClick(scope.value);
                        }
                    }
                };
            }
        };
    });

}(angular.module('xbw.starrating', [
])));
