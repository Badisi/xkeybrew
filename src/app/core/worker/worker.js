(function(app) {
    /*'use strict';

    app.factory('Worker', function( $timeout, Config, Logger ) {
        var childProcess = require('child_process');
        var cheerio = require('cheerio');
        var request = require('request');
        var fs = require('fs');
        var Q = require('q');
        var xbw = null;

        var worker = {};

        // HELPER(s)
        function xbwConnect() {
            return Q.Promise(function(resolve, reject, notify) {
                if( xbw && !xbw.connected ) {
                    xbwDisconnect();
                }
                if( xbw === null ) {
                    xbw = childProcess.fork('app/core/worker/xbw.js', [], {silent:true});

                    // Register for messages from worker
                    xbw.stdout.on('data', function(data) { Logger.log(String(data)); });
                    xbw.stderr.on('data', function(data) { Logger.error(String(data)); });
                    xbw.on('exit', function(code, signal) {
                        Logger.error('[WORKER] Exited with code (' + code + ') signal (' + signal + ')');
                        xbwDisconnect();
                    });
                }

                // Give time to connect
                $timeout(resolve, 1000);
            });
        }

        function xbwDisconnect(force) {
            if( xbw !== null ) {
                xbw.removeAllListeners();
                if( force ) {
                    xbw.kill();
                } else {
                    xbw.disconnect();
                }
                xbw = null;
            }
        }

        // API(s)
        worker.saveImage = function(url, destination) {
            return Q.Promise(function(resolve, reject, notify) {
                var requestObject = request(url);
                requestObject
                    .once('response', function(resp) {
                        if( resp.statusCode === 200 ) {
                            requestObject.pipe(fs.createWriteStream(destination));
                            Logger.log('[WORKER][DL][IMAGE]', {'url':url,'to':destination});
                            return resolve();
                        } else {
                            var msg = resp.statusCode + ' ' + resp.statusMessage;
                            Logger.error('[WORKER][DL][IMAGE]', {'url':url,'err':msg});
                            return reject(msg);
                        }
                    })
                    .once('error', function(err) {
                        Logger.error('[WORKER][DL][IMAGE]', {'url':url,'err':err.message});
                        return reject(err);
                    });
            });
        };

        worker.getWebInfos = function(url) {
            return Q.Promise(function(resolve, reject, notify) {
                var params = { url:url, timeout:Config.get('requestTimeout') };
                request(params, function(err, resp, body) {
                    if( !err && (resp.statusCode === 200) ) {
                        var $ = cheerio.load(body);
                        var webInfos = {};

                        var getOwnText = function(elem) {
                            return elem.clone().children().remove().end().text().trim();
                        };

                        var gameDetails = $('#gameDetails').first();
                        webInfos.title = gameDetails.find('h1').first().text();
                        var mediaControl = gameDetails.find('#MediaControl').first();
                        webInfos.overview = mediaControl.find('#overview1 .Text p').first().text();
                        var productPublishing = mediaControl.find('#overview2 #ProductPublishing').first().find('li');
                        productPublishing.each(function(index, product) {
                            var text = $(product).text();
                            if( text.indexOf('Original release date:') !== -1 ) {
                                webInfos.originalReleaseDate = getOwnText($(product));
                            } else if( text.indexOf('Developer:') !== -1 ) {
                                webInfos.developer = getOwnText($(product));
                            } else if( text.indexOf('Publisher:') !== -1 ) {
                                webInfos.publisher = getOwnText($(product));
                            } else if( text.indexOf('Genre:') !== -1 ) {
                                webInfos.genre = getOwnText($(product));
                            }
                        });

                        Logger.log('[WORKER][WEB-INFOS]', {'url':url,'result':webInfos});
                        return resolve(webInfos);
                    } else if( err ) {
                        Logger.error('[WORKER][WEB-INFOS]', {'url':url,'err':err.message});
                        return reject(err);
                    } else {
                        var msg = resp.statusCode + ' ' + resp.statusMessage;
                        Logger.error('[WORKER][WEB-INFOS]', {'url':url,'err':msg});
                        return reject(msg);
                    }
                });
            });
        };

        worker.getXexInfos = function(files) {
            return Q.Promise(function(resolve, reject, notify) {
                return xbwConnect().then(function() {
                    xbw.once('message', function(results) {
                        xbwDisconnect();
                        resolve(results);
                    });
                    xbw.send({ type:'xexInfos', data:files });
                });
            });
        };

        worker.verifiedWithAbgx360 = function(files, options) {
            return Q.Promise(function(resolve, reject, notify) {
                return xbwConnect().then(function() {
                    xbw.on('message', function(data) {
                        if( data === 'end' ) {
                            xbwDisconnect();
                            resolve();
                        } else {
                            notify(data);
                        }
                    });
                    xbw.send({ type:'abgx360', data:options.concat(files) });
                });
            });
        };

        worker.abort = function() {
            Logger.log('[WORKER]', {'result':'CANCELLED'});
            xbwDisconnect(true);
        };

        return worker;
    });*/

}(angular.module('xbw.worker', [
])));
