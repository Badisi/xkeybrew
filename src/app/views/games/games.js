(function(app) {
    'use strict';

    // Route
    app.config(function( $stateProvider ) {
        $stateProvider.state('games', {
            parent: 'template',
            url: '/games',
            views: {
                'content': {
                    templateUrl: 'app/views/games/games.tpl.html',
					controllerAs: 'gamesCtrl',
                    controller: 'GamesCtrl',
                    bindToController: true
                }
            }
        });
    });

    // Config
    app.factory('GamesConfig', function() {
        var groupByItems = [
            { key:'none', label:'group.none' },
            { key:'game.genre', label:'group.genre' },
            { key:'game.publisher', label:'group.publisher' },
            { key:'game.developer', label:'group.developer' }
        ];

        return {
            filterBy: ['game.title', 'game.titleId'],
            orderBy: ['game.title'],
            groupByItems: groupByItems,
            groupBy: groupByItems[1],
            search:  ''
        };
    });

    // Controller
    app.controller('GamesCtrl', function( $scope, $document, $mdDialog, $timeout, $filter, $parse, Store, Cache, GamesConfig ) {
        var gamesCtrl = this;

        gamesCtrl.config = GamesConfig;
        gamesCtrl.items = Store.items;
        gamesCtrl.filteredItems = [];
        gamesCtrl.toolbarIsOpen = false;
        gamesCtrl.mdCols = 7;

        // Watcher(s)

        /*$scope.$watch('gamesCtrl.items', function(newValue, oldValue) {
            if( newValue !== oldValue ) {
                gamesCtrl.filterItems();
            }
        }, true);*/

        // Handler(s)

        gamesCtrl.select = function($event, item) {
            $mdDialog.show({
                templateUrl: 'app/views/games/details/games-details.tpl.html',
                controller: 'GamesDetailsCtrl',
                controllerAs: 'gamesDetailsCtrl',
                bindToController: true,
                parent: angular.element(document.querySelector('md-content[ui-view="content"]')),
                targetEvent: $event,
                clickOutsideToClose: false,
                locals: { item:item }
            }).then(function() {
                //console.log('closed');
                //global.gc();
            }, function() {

            });
        };

        gamesCtrl.filterItems = function() {
            var filterBy = $filter('filterBy')(gamesCtrl.items, gamesCtrl.config.filterBy, gamesCtrl.config.search);
            var groupBy = $filter('groupBy')(filterBy, gamesCtrl.config.groupBy.key);
            gamesCtrl.filteredItems = Object.keys(groupBy)
                .map(function(key) {
                    return angular.extend(groupBy[key], { $key:key });
                })
                .sort(function(a, b) {
                    return a.$key > b.$key;
                });
        };
        gamesCtrl.filterItems();


        /*var test = function() {
            gamesCtrl.select($('md-grid-tile')[0], gamesCtrl.items[5]);
        };
        $timeout(test, 10);*/


        /*function refreshItems() {
            Cache.isos().forEach(function(iso) {
                $scope.items.push({
                    iso: iso,
                    game: Cache.gameById(iso.gameId)
                });
            });
        }

        function loadData() {
            console.log('load cache');
            return Store.loadCache().then(function() {
                console.log('finish');
                //return Store.loadGamesFolder()
                //    .fail(function(err) {
                //        //TODO: show message in alert & check weither we could proceed or not
                //        console.error(err);
                //    });
            });
        }

        function init() {
            loadData().then(refreshItems);
        }
        init();*/

    });

}(angular.module('xbw.games', [
    'angular.filter',
    'xbw.games.details'
])));
