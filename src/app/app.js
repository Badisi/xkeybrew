(function(app) {
    'use strict';

    // TODO: check glyphicons vs fontawesome, font: source-sans-pro sans-serif

    // Initialize node-webkit
	var gui = require('nw.gui');
	var win = gui.Window.get();
	win.showDevTools();

    /*var gui = nw.require('nw.gui');
    gui.Window.get().showDevTools();
    if( process.platform === 'darwin' ) {
        var mb = new gui.Menu({ type:'menubar' });
        mb.createMacBuiltin('RoboPaint', {
            hideEdit: false,
        });
        gui.Window.get().menu = mb;
    }*/

    // Config
    app.config(function( $mdThemingProvider, $translateProvider, $urlRouterProvider ) {
        // Themes
        //$mdThemingProvider.theme('altTheme').primaryPalette('purple');

        // Routes
        $urlRouterProvider.otherwise('/dvdmenu');

        // Localizations
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.preferredLanguage('en');
        $translateProvider.useStaticFilesLoader({
            prefix: '/assets/languages/',
            suffix: '.json'
        });
    });

    // Run
    app.run(function( $rootScope, $state ) {
        $rootScope.state = $state;
    });

    // Controller
    app.controller('AppCtrl', function( $scope, Config, Store ) {

        function loadApp() {
            // TODO:

            // Initialize
            Store.load()
                .then(function() {
                    $scope.$apply();
                })
                .fail(function(err) {
                    //TODO: show message in alert & check weither we could proceed or not
                    console.error(err);
                });
        }

        function loadConfig() {
            return Config.load().fail(function(err) {
                //TODO: show message in alert
                console.error(err);
            });
        }

        function init() {
            //TODO: check weither we could loadApp even if fail
            loadConfig().then(loadApp);
        }
        init();

    });

}(angular.module('xbw', [
    'xbw.plugins',
    'xbw.components',
    'xbw.common',
    'xbw.core',
    'xbw.vo',
    'xbw.views'
])));

// modules..
(function() {
    'use strict';
    // Plugins
    angular.module('xbw.plugins', [
        'pascalprecht.translate',
        'ui.router',
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngMaterial',
        'ngMessages',
        'ngMdIcons',
        'ngMask'
    ]);
    // Components
    angular.module('xbw.components', [
        'xbw.winbtns',
        'xbw.starrating',
        'xbw.splitview',
        'xbw.pathloader',
        'xbw.clearinput',
        'xbw.filepicker',
        'xbw.preloader',
        'xbw.loader'
    ]);
    // Common
    angular.module('xbw.common', [
        'xbw.fabtoolbarextra',
        'xbw.background',
        'xbw.clickoutside',
        'xbw.http',
    ]);
    // Core
    angular.module('xbw.core', [
        'xbw.utils',
        'xbw.logger',
        'xbw.config',
        'xbw.worker',
        'xbw.store'
    ]);
    // VO
    angular.module('xbw.vo', [
        'xbw.game',
        'xbw.iso'
    ]);
    // Views
    angular.module('xbw.views', [
        'xbw.template',
        'xbw.games',
        'xbw.dvdmenu',
        'xbw.options'
    ]);
}());
