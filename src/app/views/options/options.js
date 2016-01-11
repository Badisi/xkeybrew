(function(app) {
    'use strict';

    // Route
    app.config(function( $stateProvider ) {
        $stateProvider.state('options', {
            parent: 'template',
            url: '/options',
            views: {
                'content': {
                    templateUrl: 'app/views/options/options.tpl.html',
					controller: 'OptionsCtrl',
					controllerAs: 'optionsCtrl',
                    bindToController: true
                }
            }
        });
    });

    // Controller
    app.controller('OptionsCtrl', function( $scope, $filter, $translate, $mdToast, $mdBottomSheet, Store, Config, CFG_LANGUAGES ) {
        var optionsCtrl = this;

        optionsCtrl.config = angular.copy(Config.prefs);
        optionsCtrl.languages = CFG_LANGUAGES;
        optionsCtrl.items = Store.items;

		// WATCHER(s)

		$scope.$watch('optionsCtrl.form.$dirty', function(newValue, oldvalue) {
        	if( newValue ) {
				optionsCtrl.save();
			}
		});

        // HANDLER(s)

        optionsCtrl.save = function() {
            if( optionsCtrl.form.$dirty && optionsCtrl.form.$valid ) {
                Config.save(optionsCtrl.config)
                    .then(function() {
                        optionsCtrl.form.$setPristine();
                        showToast('Save !');
                        $scope.$apply();
                    })
                    .fail(function() {
                        showToast('Save failed.');
                    });
            }
        };

        optionsCtrl.resetDefaults = function() {
            Config.resetDetaults();
            optionsCtrl.config = angular.copy(Config.prefs);
        };

        optionsCtrl.changeLanguage = function() {
            $translate.use(optionsCtrl.config.language);
        };

        optionsCtrl.showAbgxConsole = function($event) {
            $mdBottomSheet.show({
                templateUrl: 'app/views/options/abgx-console/abgx-console.tpl.html',
                controller: 'AbgxConsoleCtrl',
                controllerAs: 'abgxConsoleCtrl',
                bindToController: true,
                targetEvent: $event,
                locals: { files:getSelectedFiles() }
            }).then(function(results) {
				// TODO:
            });
        };

        // HELPER(s)

        function getSelectedFiles() {
            return $filter('filter')(optionsCtrl.items, {'$selected':true}).map(function(item) {
                return item.iso.filePath;
            });
        }

        function showToast(message) {
            $mdToast.show($mdToast.simple().content(message).position('top right').hideDelay(800));
        }
    });

}(angular.module('xbw.options', [
    'xbw.options.abgx-console'
])));
