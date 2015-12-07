(function(app) {
    'use strict';

    app.factory('Utils', function( CFG_APP ) {
        var crypto = require('crypto');
        var path = require('path');

        var utils = {};

        utils.lookupArray = function(array, prop, value) {
            for( var i = 0, len = array.length; i < len; i++ ) {
                if( array[i][prop] === value ) {
                    return array[i];
                }
            }
            return null;
        };

        utils.hash = function(data) {
            return crypto.createHash('sha1').update(data).digest('hex');
        };

        utils.hashFilePath = function(filePath) {
            var pattern = '/' + CFG_APP.gamesFolderName + '/';
            var p1 = filePath.replace(/\\/g, '/');
            var p2 = p1.slice(p1.indexOf(pattern) + pattern.length);
            return utils.hash(p2);
        };

        utils.isEmpty = function(value) {
            return (value !== null) && (value !== '');
        };

        return utils;
    });

}(angular.module('xbw.utils', [
])));
