(function(app) {
    'use strict';

    app.directive('clearInput', function( $compile, $timeout ) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {},
            link: function(scope, el, attrs, ctrl) {
                var inputTypes = /text|search|tel|url|email|password/i;
                if( el[0].nodeName !== 'INPUT' ) {
                    throw new Error('resetField is limited to input elements');
                }
                if( !inputTypes.test(attrs.type) ) {
                    throw new Error('Invalid input type for resetField: ' + attrs.type);
                }

                var template = $compile('<i ng-show="clearVisible" ng-mousedown="clear()" class="glyphicon glyphicon-remove"></i>')(scope);
                el.after(template);

                scope.clear = function() {
                    ctrl.$setViewValue(null);
                    ctrl.$render();
                    $timeout(function() {
                        el[0].focus();
                    }, 0, false);
                };

                el.bind('input', function() {
                    scope.clearVisible = !ctrl.$isEmpty(el.val());
                });
                el.bind('focus', function() {
                    scope.clearVisible = !ctrl.$isEmpty(el.val());
                    scope.$apply();
                });
                el.bind('blur', function() {
                    scope.clearVisible = false;
                    scope.$apply();
                });
            }
        };
    });

}(angular.module('xbw.clearinput', [
])));