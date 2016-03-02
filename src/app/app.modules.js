(function() {
    'use strict';

    // Plugins
    angular.module('xbw.plugins', [
        'pascalprecht.translate',
        'ui.router',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngMaterial',
        'ngMessages',
        'ngMdIcons',
        'ngMask'
    ]);

    // Components
    angular.module('xbw.components', [
        'xbw.starrating',
        'xbw.filepicker',
		// TODO: 'xbw.winbtns', (check VS electron 'title-bar-style')
        // TODO: 'xbw.preloader', 'xbw.pathloader', 'xbw.loader' (todos)
    ]);

    // Common
    angular.module('xbw.common', [
        //'xbw.clickoutside',
		'xbw.fabtoolbarextra',
        'xbw.background',
		'xbw.mdtoast',
        'xbw.http',
    ]);

    // Core
    angular.module('xbw.core', [
        'xbw.utils',
        'xbw.logger',
        'xbw.config',
        'xbw.worker',
        'xbw.store',
		'xbw.themes'
    ]);

    // VO
    angular.module('xbw.vo', [
        'xbw.game',
        'xbw.iso'
    ]);

    // Views
    angular.module('xbw.views', [
        'xbw.template',
		'xbw.home',
        'xbw.games',
        'xbw.options'
    ]);

}());
