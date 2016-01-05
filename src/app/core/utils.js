(function(app) {
    'use strict';

    app.factory('Utils', function( CFG_APP ) {
        var crypto = require('crypto');
		var shell = require('electron').shell;

        return {
			openURL: function(url) {
				shell.openExternal(url);
			},
			inArray: function(array, prop, value) {
	            for( var i = 0, len = array.length; i < len; i++ ) {
	                if( array[i][prop] === value ) {
	                    return array[i];
	                }
	            }
	            return null;
	        },
			hash: function(data) {
	            return crypto.createHash('sha1').update(data).digest('hex');
	        },
			hashFilePath: function(filePath) {
	            var pattern = '/' + CFG_APP.gamesFolderName + '/';
	            var p1 = filePath.replace(/\\/g, '/');
	            var p2 = p1.slice(p1.indexOf(pattern) + pattern.length);
	            return this.hash(p2);
	        },
			isEmpty: function(value) {
	            return (value !== null) && (value !== '');
	        }
		};
	});

}(angular.module('xbw.utils', [
])));
