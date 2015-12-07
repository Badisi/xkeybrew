(function(app) {
    'use strict';

    app.factory('Cache', function( Http, Utils, GameVO, IsoVO ) {
        var loki = require('lokijs');
        var fs = require('fs');
        var Q = require('q');

        var cache = {};
        var _db;

        //collection.find({int: {$in: [3,4,5,6]})

        // Helper(s)
        function gameCollection() { return _db.getCollection('games'); }
        function isoCollection() { return _db.getCollection('isos'); }

        // APIs
        cache.games = function() { return gameCollection().data; };
        cache.isos = function() { return isoCollection().data; };

        cache.gameByTitleId = function(value) { return gameCollection().findOne({'titleId':value}); };
        cache.gameById = function(value) { return gameCollection().get(value); };
        cache.isoByHash = function(value) { return isoCollection().findOne({'hash':value}); };

        cache.insertGame = function(game) { return gameCollection().insert(game); };
        cache.insertIso = function(iso) { return isoCollection().insert(iso); };

        cache.updateGame = function(game) { return gameCollection().update(game); };
        cache.updateIso = function(iso) { return isoCollection().update(iso); };

        cache.save = function() { _db.saveDatabase(); };
        cache.saveGame = function(game) { cache.updateGame(game); cache.save(); };
        cache.saveIso = function(iso) { cache.updateIso(iso); cache.save(); };

        cache.loadFromFile = function(file) {
            return Q.Promise(function(resolve, reject, notify) {
                _db = new loki(file);

                if( fs.existsSync(file) ) {
                    _db.loadDatabase({ games: { proto: GameVO }, isos: { proto: IsoVO } }, resolve);
                } else {
                    _db.addCollection('games', { indices:'titleId' });
                    _db.addCollection('isos', { indices:'hash' });
                    resolve();
                }
            });
        };
        return cache;
    });

}(angular.module('xbw.cache', [
])));
