(function(app) {
    'use strict';

    app.directive('xbwsplitview', function() {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: 'app/components/splitview/splitview.tpl.html',
            scope: {
                toggle: '='
            },
            link: function( scope, el, attrs ) {
                var placeholder = el.find('#xbw-splitview-transclude');
                var leftPane = el.find('#xbw-splitview-left');
                var rightPane = el.find('#xbw-splitview-right');

                leftPane.append(placeholder.children().eq(0).children());
                rightPane.append(placeholder.children().eq(1).children());
                placeholder.remove();

                var init = function() {
                    scope.$watch('toggle', function(value) {
                        if( value ) {
                            el.addClass('menu-open');
                        } else {
                            el.removeClass('menu-open');
                        }
                    });
                };
                init();
            }
        };
    });

}(angular.module('xbw.splitview', [
])));
