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

	// Model
    app.factory('Games', function( $rootScope, $filter, Store, GamesConfig ) {
		var games = {};

		games.config = GamesConfig;
		games.items = Store.items;
		games.filteredItems = [];

		// WATCHER(s)

		$rootScope.$watch(function() { return games.items; }, filterItemsIfChanges, true);
		$rootScope.$watch(function() { return games.config.filterBy; }, filterItemsIfChanges);
		$rootScope.$watch(function() { return games.config.search; }, filterItemsIfChanges);

		// HELPER(s)

		function filterItemsIfChanges(newValue, oldValue) {
			if( newValue !== oldValue ) {
				filterItems();
			}
		}

		function filterItems() {
			var filterBy = $filter('filterBy')(games.items, games.config.filterBy, games.config.search);
			var groupBy = $filter('groupBy')(filterBy, games.config.groupBy.key);
			games.filteredItems = Object.keys(groupBy)
				.map(function(key) {
					var group = groupBy[key];
					group = $filter('orderBy')(group, games.config.orderBy);
					group.$label = (key !== 'null' && key !== 'undefined') ? key : '?';
					return group;
				})
				.sort(function(a, b) {
					if( a.$label === '?' ) { return 1; }
					if( b.$label === '?' ) { return -1; }
					return (a.$label > b.$label);
				});
			games.filteredItems.$total = filterBy.length;
		}

		return games;
	});

    // Controller
    app.controller('GamesCtrl', function( $scope, $timeout, $filter, Themes, Store, Games, GamesSelector, GamesDetails, AbgxConsole ) {
        var gamesCtrl = this;

		gamesCtrl.themes = Themes;
        gamesCtrl.games = Games;
        gamesCtrl.toolbarIsOpen = false;
		gamesCtrl.selectModeActive = false;
        gamesCtrl.mdCols = 7;

		// ---
		gamesCtrl.currentGroup = gamesCtrl.games.filteredItems[0];
		// ---

        // --- HANDLER(s) ---

		gamesCtrl.zoom = function() {
			switch( gamesCtrl.mdCols ) {
				case 5: gamesCtrl.mdCols = 7; break;
				case 7: gamesCtrl.mdCols = 10; break;
				case 10: gamesCtrl.mdCols = 5; break;
			}
		};

        gamesCtrl.showDetails = function(item, $event) {
			// Fix for mdDialog : it uses event.target and not event.currentTarget which is what we need
			var event = { target:$event.currentTarget };
			if( !gamesCtrl.selectModeActive ) {
				GamesDetails.show(event, item, function(response) {

				});
			} else {
				item.$selected = !item.$selected;
			}
        };

		gamesCtrl.showAbgxToast = function() {
			if( !gamesCtrl.selectModeActive ) {
				gamesCtrl.selectModeActive = true;
				gamesCtrl.toolbarIsOpen = false;

				GamesSelector.show(function(success) {
					if( success ) {
						AbgxConsole.show(getSelectedFiles(), function() {
							gamesCtrl.selectModeActive = false;
						});
					} else {
						gamesCtrl.selectModeActive = false;
					}
			    });
			}
		};

		// --- HELPER(s) ---

		function getSelectedFiles() {
			return $filter('filter')(gamesCtrl.items, {'$selected':true}).map(function(item) {
				return item.iso.filePath;
			});
		}

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
	'xbw.games.game',
	'xbw.games.dvd-menu',
    'xbw.games.details',
	'xbw.games.selector',
	'xbw.games.abgx-console'
])));
