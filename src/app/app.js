(function(app) {
    'use strict';

    // Config
    app.config(function( $mdThemingProvider, $translateProvider, $urlRouterProvider ) {
        // Themes
        //$mdThemingProvider.theme('altTheme').primaryPalette('purple');

        // Routes
        $urlRouterProvider.otherwise('/games');

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
    app.controller('AppCtrl', function( $scope, Config, Logger, Store, Themes ) {

        function loadData() {
            return Store.load()
                .then(function() {
                    $scope.$apply();
                })
                .fail(function(err) {
                    // TODO: show alert message & check weither we could proceed or not
                    Logger.error(err);
                });
        }

		function loadThemes() {
			return Themes.loadAll().fail(function(err) {
				// TODO: show alert message
                Logger.error(err);
			});
		}

        function loadConfig() {
            return Config.load().fail(function(err) {
                // TODO: show alert message
                Logger.error(err);
            });
        }

        function init() {
            // TODO: check weither we could loadData even if fail
            loadConfig().then(loadThemes).then(loadData);
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
