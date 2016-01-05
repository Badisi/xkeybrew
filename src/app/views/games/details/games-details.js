(function(app) {
    'use strict';

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
