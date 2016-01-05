(function(app) {
    'use strict';

	// not used, TODO: check VS electron 'title-bar-style'
    app.directive('winBtns', function() {
		var win = require('electron').BrowserWindow.getFocusedWindow();

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
