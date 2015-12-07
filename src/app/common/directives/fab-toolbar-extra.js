(function(app) {
    'use strict';

    app.directive('fabToolbarExtra', function() {
        return {
            restrict: 'A',
            compile: function(el) {
                el.click(function(e) {
                    var target = $(e.target);
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
                        // Hack on md-fab-toolbar to make use of a flex spacer
                        el.find('span[spacer]').parent().addClass('flex');

                        // Hack on md-fab-toolbar to make children hidden by default
                        el.find('.md-fab-action-item').css('transition-delay', '325ms');
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
