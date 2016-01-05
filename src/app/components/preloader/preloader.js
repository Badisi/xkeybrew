(function(app) {
    ///* global Modernizr:true */
    'use strict';

	// not used, TODO:
    app.directive('preloader', function( $window ) {
        /*function noscroll() {
            $window.scrollTo(0, 0);
        }

        function stopLoading() {
            var header = angular.element('xbw-preloader header.header');
            var animEndEventName = {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation' : 'animationend'
            }[ Modernizr.prefixed('animation') ];

            // Animate
            $scope.isLoaded = true;

            // Wait animation to finish
            header.one(animEndEventName, function() {
                $window.removeEventListener('scroll', noscroll);
            });
        }*/

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                value: '=',
                loaded: '='
            },
            templateUrl: 'app/components/preloader/preloader.tpl.html',
            link: function( scope, element, attrs ) {
                // Disable scrolling
                //$window.addEventListener('scroll', noscroll);

                /*console.log(scope.progressValue);

                // Wait for the end
                scope.$watch(attrs.value, function(value) {
                    console.log(value);
                    if( value >= 100 ) {
                        stopLoading();
                    }
                });*/

                /*var msg = element.find('.header .loader .message');

                attrs.$observe('message', function(value) {
                    msg.append('<p>' + value + '</p>');
                    msg.animate({ scrollTop: msg[0].scrollHeight }, 'slow');
                });*/

                /*var container = $('.preloader-message');
                container.append('<p class="row">' + item + '</p>');
                container.animate({ scrollTop: container[0].scrollHeight }, "slow");
                console.log(container);*/

            }
        };
    });

}(angular.module('xbw.preloader', [
])));
