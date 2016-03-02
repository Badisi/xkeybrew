(function(app) {
    'use strict';

    // Route
    app.config(function( $stateProvider ) {
        $stateProvider.state('template', {
            abstract: true,
            templateUrl: 'app/views/template/template.tpl.html',
			controllerAs: 'templateCtrl',
			controller: 'TemplateCtrl'
        });
    });

	// Controller
	app.controller('TemplateCtrl', function( Utils, Config, Themes, CFG_URLS ) {
		var templateCtrl = this;

		templateCtrl.themes = Themes;

		// HANDLER(s)

		templateCtrl.openGithub = function() {
			Utils.openURL(CFG_URLS.github);
		};

		templateCtrl.openPaypal = function() {
			Utils.openURL(CFG_URLS.paypal);
		};

	});

}(angular.module('xbw.template', [
])));
