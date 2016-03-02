(function(app) {
    'use strict';

    app.factory('Themes', function( $rootScope, Config, Logger, CFG_PATHS, CFG_FILES ) {
		var themesFolderPath = CFG_PATHS.themes;
		var path = require('path');
		var fs = require('fs');
		var Q = require('Q');

		var themes = {};

		themes.items = [];
		themes.current = null;

		// WATCHER(s)

		$rootScope.$watch(
			function() { return themes.current; },
			function( newValue, oldValue ) {
				if( (newValue !== oldValue) && (Config.prefs.lastUsedTheme !== newValue.name) ) {
					Config.save({ lastUsedTheme:newValue.name });
				}
			}
		);

		// HANDLER(s)

		themes.getByName = function(name) {
			var results = this.items.filter(function(item) {
				return (item.name === name);
			});
			return (results.length > 0) ? results[0] : null;
		};

		themes.loadAll = function() {
			return Q.Promise(function(resolve, reject, notify) {
				// Load themes
				fs.readdirSync(themesFolderPath).forEach(function(file) {
					var filePath = path.join(themesFolderPath, file);
					if( fs.statSync(filePath).isDirectory() ) {
						var layoutPath = path.join(filePath, CFG_FILES.layout);
						if( fs.existsSync(layoutPath) ) {
							themes.items.push({
								name: file,
								dirPath: filePath,
								layoutPath: 'file:///' + layoutPath
							});
						} else {
							// TODO: throw error: layout not found for theme (file)
						}
					}
				});

				// Define current theme
				var defaultTheme = themes.getByName(Config.prefs.lastUsedTheme);
				if( defaultTheme === null ) {
					defaultTheme = themes.getByName('Default');
				}
				if( defaultTheme !== null ) {
					themes.current = defaultTheme;
					Logger.log('[THEMES][LOAD]', {'result':'SUCCESS'});
					resolve();
				} else {
					var message = 'Default theme was not found';
					Logger.error('[THEMES][LOAD]', {'err':message});
					reject(message);
				}
			});
		};

        return themes;
    });

}(angular.module('xbw.themes', [
])));
