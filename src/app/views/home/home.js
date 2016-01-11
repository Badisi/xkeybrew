(function(app) {
    'use strict';

    /*
     * 	 PAL   4:3 - 720, 540
     *	 PAL  16:9 - 720, 405
     *	 NTSC  4:3 - 720, 540
     *	 NTSC 16:9 - 720, 405
     *
     *   [ DVDAuthor sLimitations ]
     *   The following limits are imposed by the DVD-Video spec.
     *
     *   There can be no more than 99 titlesets, no more than 99 menus in the VMG or a titleset,
     *   and no more than 99 titles in a titleset.
     *
     *   Each title may be made up of up to 999 PGCs. Each PGC may consist of up to 255 programs.
     *   The <pre> and <post> sections of a PGC put together can contain no more than 128 VM instructions.
     *
     *   Since there is only one VOB file (VIDEO_TS.VOB) in the VMG, the total amount of video in the VMG
     *   menus must fit into 1073709056 bytes (524272 sectors of 2kiB each). In each titleset, all the menu
     *   video must fit in the first VOB (VTS_nn_0.VOB), so is limited to the same amount.
     */

    // Routes
    app.config(function( $stateProvider ) {
        $stateProvider
            .state('home', {
                parent: 'template',
                url: '/home',
                views: {
                    'content': {
                        templateUrl: 'app/views/home/home.tpl.html',
                        controller: 'HomeCtrl',
						controllerAs: 'homeCtrl',
                        bindToController: true
                    }
                }
            })
            .state('home.view', {
                url: '/:index',
                controller: function($scope, $stateParams) {
                    $scope.setCurrentMenuIndex(parseInt($stateParams.index));
                }
            });
    });

    // Controller
    app.controller('HomeCtrl', function() {
        var homeCtrl = this;

        homeCtrl.currentMenuIndex = -1;
        homeCtrl.currentMenu = null;
        homeCtrl.previousMenu = null;
        homeCtrl.nextMenu = null;

        // Helper(s)
        /*function getMenuAtIndex(index) {
            return (index >= 0 && index < menus.length) ? menus[index] : null;
        }

        homeCtrl.setCurrentMenuIndex = function(index) {
            if( (index >= 0) && (index < menus.length) ) {
                homeCtrl.currentMenuIndex = index;
            }
            homeCtrl.currentMenu = getMenuAtIndex(homeCtrl.currentMenuIndex);
            homeCtrl.previousMenu = getMenuAtIndex(homeCtrl.currentMenuIndex - 1);
            homeCtrl.nextMenu = getMenuAtIndex(homeCtrl.currentMenuIndex + 1);
        };*/
    });

}(angular.module('xbw.home', [
    'xbw.common'
])));
