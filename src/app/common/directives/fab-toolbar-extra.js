(function(app) {
    'use strict';

    app.directive('fabToolbarExtra', function( $document ) {
        return {
            restrict: 'A',
            compile: function(el) {
                el.on('click', function(e) {
                    var target = angular.element(e.target);
                    if( target.hasClass('prevent') || target.parent().hasClass('prevent') ) {
                        e.stopImmediatePropagation();
                        e.stopPropagation();
                        e.preventDefault();
                    }
                });

                el.bind('keydown keypress keyup', function(e) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                });

                return {
                    post: function postLink(scope, el) {
						var query = function(selector) {
							return angular.element(el[0].querySelectorAll(selector));
						};

                        // Hack on md-fab-toolbar to make use of a flex spacer
                        query('span[spacer]').parent().addClass('flex');

                        // Hack on md-fab-toolbar to make children hidden by default
                        query('.md-fab-action-item').css('transition-delay', '200ms');
                    },
                    pre: function preLink(scope, el) {
                        scope.$on('$destroy', function() {
                            el.off('click');
                            el.unbind();
                        });
                    }
                };
            }
        };
    });

}(angular.module('xbw.fabtoolbarextra', [
])));
