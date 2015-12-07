(function(app) {
    'use strict';

    app.directive('winBtns', function() {
        var win = require('nw.gui').Window.get();

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/win-btns/win-btns.tpl.html',
            link: function(scope, element, attr) {
                scope.platform = process.platform;

                scope.buttons = {
            		'win32': ['min', 'close'],
            		'darwin': ['close', 'min'],
            		'linux': ['min', 'close']
            	}[scope.platform];

                scope.click = function(btn) {
                    switch( btn ) {
                        case 'close': win.close(); break;
                        case 'min': win.minimize(); break;
                    }
                };
            }
        };
    });

}(angular.module('xbw.winbtns', [
])));
