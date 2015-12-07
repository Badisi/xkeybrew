(function(app) {
    'use strict';

    app.directive('clickOutside', function( $document ) {
        return {
            restrict: 'A',
            link: function( scope, el, attrs ) {
                var classList = (attrs.outsideIfNot !== undefined) ? attrs.outsideIfNot.replace(', ', ',').split(',') : [];
                if( attrs.id !== undefined ) {
                    classList.push(attrs.id);
                }

                $document.on('click', function(e) {
                    if( e.target ) {
                        for( var item = e.target; item; item = item.parentNode ) {
                            var id = item.id;
                            if( id !== undefined ) {
                                for( var i = 0; i < classList.length; i++ ) {
                                    if( id.indexOf(classList[i]) > -1 || item.className.indexOf(classList[i]) > -1 ) {
                                        return;
                                    }
                                }
                            }
                        }
                        scope.$evalAsync(attrs.clickOutside);
                    }
                });
            }
        };
    });

}(angular.module('xbw.clickoutside', [
])));
