(function(app) {
    'use strict';

	// Factory
	app.factory('GamesDetails', function( $mdDialog ) {
		return {
			show: function(event, item, callback) {
				return $mdDialog.show({
					templateUrl: 'app/views/games/details/games-details.tpl.html',
					controller: 'GamesDetailsCtrl',
					controllerAs: 'gamesDetailsCtrl',
					bindToController: true,
					parent: angular.element(document.querySelector('div.xbw-games').parentNode),
					targetEvent: event,
					clickOutsideToClose: false,
					hasBackdrop: false,
					locals: { item:item }
				}).then(callback, callback);
			}
		};
	});

    // Controller
    app.controller('GamesDetailsCtrl', function( $scope, $mdDialog, item ) {
        var gamesDetailsCtrl = this;

        gamesDetailsCtrl.item = angular.copy(item);

        //console.log(item.game.regions);

        $scope.$on('$destroy', function() {
            //console.log('destroy');
            //delete gamesDetailsCtrl.item;
        });

        gamesDetailsCtrl.hide = function() {
            //console.log('close');
            //var img = angular.element('.background-image');
            //img.css('-webkit-filter', 'none');
            //img.remove();

            $mdDialog.hide();
            //global.gc();
            //$mdDialog.hide(gamesDetailsCtrl.item);
            //console.log(process.memoryUsage());

        };
    });

}(angular.module('xbw.games.details', [
])));
