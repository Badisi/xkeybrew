(function(app) {
    'use strict';

	// Factory
	app.factory('GamesSelector', function( $mdToast, $document ) {
		return {
			show: function(callback) {
				return $mdToast.show({
					parent: $document[0].querySelector('#toastBounds'),
					hideDelay: false,
					position: 'bottom center',
					templateUrl: 'app/views/games/selector/games-selector.tpl.html',
					controller: 'GamesSelectorCtrl',
					controllerAs: 'gamesSelectorCtrl',
					bindToController: true
				}).then(callback);
			}
		};
	});

    // Controller
    app.controller('GamesSelectorCtrl', function( $mdToast ) {
		var gamesSelectorCtrl = this;

		gamesSelectorCtrl.choices = [ 'all', 'selected' ];
		gamesSelectorCtrl.currentChoice = gamesSelectorCtrl.choices[1];

		// Handler(s)

		gamesSelectorCtrl.choiceChange = function() {
			console.log(gamesSelectorCtrl.currentChoice);
		};

		gamesSelectorCtrl.resolve = function(value) {
			$mdToast.hide(value);
		};
    });

}(angular.module('xbw.games.selector', [
])));
