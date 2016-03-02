(function(app) {
    'use strict';

    app.directive('game', function() {
        return {
            restrict: 'EA',
			replace: true,
            templateUrl: 'app/views/games/game/game.tpl.html',
			controller: 'GameCtrl',
			controllerAs: 'gameCtrl',
			bindToController: true,
            scope: {
                item: '=ngModel',
				selectMode: '='
            }
        };
    });

	app.controller('GameCtrl', function() {

	});

}(angular.module('xbw.games.game', [
])));
