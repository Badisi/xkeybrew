(function(app) {
    'use strict';

    app.factory('Logger', function( CFG_PATHS ) {
        var fs = require('fs');
        var stream = null;

        function init() {
            stream = fs.createWriteStream(CFG_PATHS.log, {flags:'w'});
            stream.write(
                '<style>' +
                    'body {' +
                        'white-space: pre;' +
                        'tab-size: 4;' +
                        'font-family: Menlo, monospace;' +
                        'font-size: 11px;' +
                        'color: #222830;' +
                    '}' +
                '</style>'
            );
        }

        function debug(title, content, error) {
            var msg = title;
            if( content ) {
                msg = title + ': ' + JSON.stringify(content, null, '\t');
            }
            var timeStamp = '<span style="color:royalblue">' + new Date().toLocaleString() + '</span> - ';
            var htmlMsg = msg.replace(/\n/g, '<br>').replace(/\t/g, '&#09;');
            var hr = '<hr noshade size="1" color="#ECECEC">';

            if( error ) {
                console.error(msg);
                stream.write('<p>' + timeStamp + '<span style="color:red">' + htmlMsg + '</span></p>' + hr);
            } else {
                console.log(msg);
                stream.write('<p>' + timeStamp + htmlMsg + '</p>' + hr);
            }
        }

        return {
            error: function(title, content) {
                debug(title, content, true);
            },
            log: function(title, content) {
                debug(title, content);
            },
            init: function() {
                init();
            }
        };
    });

}(angular.module('xbw.logger', [
])));
