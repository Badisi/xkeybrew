(function(app) {
    'use strict';

    app.config(function($provide) {
    	$provide.decorator('$mdToast', function($delegate, $location, $document) {

      		$delegate.showConfirmation = function(options) {
				var defaultOptions = {
					parent: $document[0].querySelector('#toastBounds'),
					hideDelay: false,
					position: 'bottom center',
					template:
						'<md-toast>' +
							((options.textContent) ? options.textContent : options.template) +
						'	<md-button ng-click="toastCtrl.resolve(false)" style="min-width:40px;margin-left:30px;">' +
						'		CANCEL' +
						'	</md-button>' +
						'	<md-button ng-click="toastCtrl.resolve(true)" style="min-width:40px;margin-left:2px;margin-right:0;">' +
						'		OK' +
						'	</md-button>' +
						'</md-toast>',
					controller: function mdToastCtrl() {
            			var toastCtrl = this;
			            toastCtrl.resolve = function(value) {
			              	$delegate.hide(value);
			            };
		          	},
					controllerAs: 'toastCtrl',
          			bindToController: true
				};
				return $delegate.show(angular.extend(defaultOptions, options));
      		};

      		return $delegate;
		});
    });

}(angular.module('xbw.mdtoast', [
])));
