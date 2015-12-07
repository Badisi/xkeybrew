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
            .state('dvdmenu', {
                //abstract: true,
                parent: 'template',
                url: '/dvdmenu',
                views: {
                    'content': {
                        templateUrl: 'app/views/dvdmenu/dvdmenu.tpl.html',
                        controller: 'DvdMenuCtrl',
                        controllerAs: 'dvdMenuCtrl',
                        bindToController: true
                    }
                },
                /*resolve: {
                    menus: function( Java, Http ) {
                        // Load menus
                        if( Java.isLoaded() ) {
                            return angular.fromJson(Java.getDvdMenus());
                        } else {
                            // Use mocked data when in debug mode
                            return Http.get('data/themes.json').then(function(data) {
                                return data;
                            });
                        }
                    }
                }*/
            })
            .state('dvdmenu.view', {
                url: '/:index',
                controller: function($scope, $stateParams) {
                    $scope.setCurrentMenuIndex(parseInt($stateParams.index));
                }
            });
    });

    // Controller
    app.controller('DvdMenuCtrl', function( $scope ) {
        var dvdMenuCtrl = this;

        console.log('dvdmenu');

        dvdMenuCtrl.currentMenuIndex = -1;
        dvdMenuCtrl.currentMenu = null;
        dvdMenuCtrl.previousMenu = null;
        dvdMenuCtrl.nextMenu = null;

        // Helper(s)
        function getMenuAtIndex(index) {
            return (index >= 0 && index < menus.length) ? menus[index] : null;
        }

        dvdMenuCtrl.setCurrentMenuIndex = function(index) {
            if( (index >= 0) && (index < menus.length) ) {
                dvdMenuCtrl.currentMenuIndex = index;
            }
            dvdMenuCtrl.currentMenu = getMenuAtIndex(dvdMenuCtrl.currentMenuIndex);
            dvdMenuCtrl.previousMenu = getMenuAtIndex(dvdMenuCtrl.currentMenuIndex - 1);
            dvdMenuCtrl.nextMenu = getMenuAtIndex(dvdMenuCtrl.currentMenuIndex + 1);
        };
    });

}(angular.module('xbw.dvdmenu', [
    'xbw.common'
])));
