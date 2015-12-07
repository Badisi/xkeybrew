(function(app) {
    'use strict';

    app.factory('Store', function( $translate, CFG_APP, CFG_PATHS, Utils, Config, Cache, Logger, Worker, GameVO, IsoVO ) {
        var glob = require('glob');
        var path = require('path');
        var fs = require('fs');
        var Q = require('q');

        function addOrUpdateUnknown(file) {
            var isoHash = Utils.hashFilePath(file);

            // Create or update iso entity
            var iso = Cache.isoByHash(isoHash);
            if( iso === null ) {
                // Create game entity
                var game = GameVO.create();
                Logger.log('[STORE][CREATE][UNKOWN GAME]', {'file':file});
                Cache.insertGame(game);

                // Create iso entity
                iso = IsoVO.create({
                    hash: isoHash,
                    gameId: game.$loki,
                    filePath: file
                });
                Logger.log('[STORE][CREATE][UNKOWN ISO]', {'file':file,'id':isoHash});
                Cache.insertIso(iso);
            }
            else {
                iso.loaded = true;
                Cache.updateIso(iso);
            }
        }

        function addOrUpdate(xexInfo, updateWebInfos) {
            var gameTitleId = xexInfo.titleId.toLowerCase();
            var isoHash = Utils.hashFilePath(xexInfo.file);

            var _updateGameAsync = function(game) {
                game.updateInfos().then(function() {
                    Cache.saveGame(game);
                });
            };
            var _updateIsoAsync = function(iso) {
                iso.updateInfos().then(function() {
                    Cache.saveIso(iso);
                });
            };

            // Create or update game entity
            var game = Cache.gameByTitleId(gameTitleId);
            if( game === null ) {
                game = GameVO.create({
                    titleId: gameTitleId,
                    regions: xexInfo.regions,
                    discCount: xexInfo.discCount
                });
                Logger.log('[STORE][CREATE][GAME]', {'file':xexInfo.file,'id':gameTitleId});
                Cache.insertGame(game);
                _updateGameAsync(game);
            }
            else if( updateWebInfos && !game.isInfosComplete() && !game.isUpdating ) {
                _updateGameAsync(game);
            }

            // Create or update iso entity
            var iso = Cache.isoByHash(isoHash);
            if( iso === null ) {
                iso = IsoVO.create({
                    hash: isoHash,
                    gameId: game.$loki,
                    titleId: gameTitleId,
                    mediaId: xexInfo.mediaId,
                    discNumber: xexInfo.discNumber,
                    filePath: xexInfo.file
                });
                Logger.log('[STORE][CREATE][ISO]', {'file':xexInfo.file,'id':isoHash});
                Cache.insertIso(iso);
                _updateIsoAsync(iso);
            }
            else {
                iso.loaded = true;
                Cache.updateIso(iso);

                if( updateWebInfos && !iso.isInfosComplete() && !iso.isUpdating ) {
                    _updateIsoAsync(iso);
                }
            }
        }

        function loadItems(xexInfos) {
            try {
                Cache.games().forEach(function(game) {
                    delete game.isUpdating;
                    Cache.updateGame(game);
                });

                Cache.isos().forEach(function(iso) {
                    delete iso.isUpdating;
                    iso.loaded = false;
                    Cache.updateIso(iso);
                });

                xexInfos.forEach(function(xexInfo) {
                    if( xexInfo.is360ISO ) {
                        console.log(xexInfo);
                        addOrUpdate(xexInfo, true);
                    } else {
                        addOrUpdateUnknown(xexInfo.file);
                    }
                });

                Cache.save();
            } catch(err) {
                console.error(err);
            }
        }

        function loadFolder(path) {
            return Q.nfcall(glob, path + '/**/*.iso')
                .then(Worker.getXexInfos)
                .then(loadItems);
        }

        function loadGamesFolder() {
            return Q.Promise(function(resolve, reject, notify) {
                var gamesFolderPath = Config.get('gamesFolderPath');
                if( !fs.existsSync(gamesFolderPath) ) {
                    return $translate('error.gamesFolderNotFound').then(reject);
                } else if( path.basename(gamesFolderPath) !== CFG_APP.gamesFolderName ) {
                    return $translate('error.gamesFolderNotCorrectlySpelled').then(reject);
                } else {
                    return loadFolder(gamesFolderPath).then(resolve);
                }
            });
        }

        function loadCache() {
            return Cache.loadFromFile(CFG_PATHS.store);
        }

        return {
            items: [],
            isLoaded: false,
            isLoading: false,
            load: function() {
                var me = this;
                return Q.Promise(function(resolve, reject, notify) {
                    if( !me.isLoaded ) {
                        me.isLoading = true;
                        me.items.length = 0;

                        //return loadCache().then(loadGamesFolder).then(function() {
                        return loadCache().then(function() {
                            Cache.isos().forEach(function(iso) {
                                me.items.push({
                                    iso: iso,
                                    game: Cache.gameById(iso.gameId),
                                    $span: { row:1, col:1 }
                                });
                            });

                            me.isLoading = false;
                            me.isLoaded = true;
                            resolve();
                        });
                    }
                    resolve();
                });
            },
            reload: function() {
                this.isLoaded = false;
                this.load();
            }
        };
    });

}(angular.module('xbw.store', [
    'xbw.cache',
    'xbw.worker'
])));
