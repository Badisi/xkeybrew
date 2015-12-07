(function(app) {
    'use strict';

    //var gui = require('nw.gui');
    var mkdirp = require('mkdirp');
    var path = require('path');
    var fs = require('fs');
    var Q = require('Q');

    /*var gui = require('nw.gui');
    var currentWin = gui.Window.get();
    currentWin.setBadgeLabel('2');
    currentWin.setProgressBar(0.5);
    currentWin.showDevTools();*/

    // APP
    var APP = {
        description: nw.App.manifest.description,
        version: nw.App.manifest.version,
        gamesFolderName: 'games'
    };
    app.constant('CFG_APP', APP);

    // LANGUAGE(s)
    var LANGUAGES = [
        { key:'en', value:'English' },
        { key:'fr', value:'Français' },
        { key:'cn', value:'简体字' },
        { key:'de', value:'Deutsch' },
    ];
    app.constant('CFG_LANGUAGES', LANGUAGES);

    // DVDMENU
    var DVDMENU = {
        maxGamePerMenu: 16,
        maxTitleSet: 99,
        maxMenuPerVmg: 99,
        /* Should be 98, but a value greater than 10 will make DVDStyler crashes during the build process */
        maxGamePerTitleSet: 10 //98
    };
    app.constant('CFG_DVDMENU', DVDMENU);

    // FILES
    var FILES = {
        store: 'xbw.db',
        config: 'xbw.cfg',
        layout: 'layout.xml',
        dvds: 'theme.dvds',
        iso: 'menu.iso',
        xsk: 'menu.xsk',
        xso: 'menu.xso',
        log: 'log.html'
    };
    app.constant('CFG_FILES', FILES);

    // PATHS
    var resPath = path.join(/*gui.App.dataPath*/'', 'User');
    var buildPath = path.join(resPath, 'build');
    var PATHS = {
        themes: path.join(resPath, 'themes'),
        images: path.join(resPath, 'images'),
        store: path.join(resPath, FILES.store),
        config: path.join(resPath, FILES.config),
        log: path.join(resPath, FILES.log),
        dvds: path.join(buildPath, FILES.dvds),
        iso: path.join(buildPath, FILES.iso),
        xsk: path.join(buildPath, FILES.xsk)
    };
    app.constant('CFG_PATHS', PATHS);

    // URLS
    var URLS = {
        dvdstyler: 'http://www.dvdstyler.org',
        paypal: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8VETXK2GHPDSJ',
        bitbucket: 'https://bitbucket.org/Badisi/xkeybrew',
        marketplace: 'http://marketplace.xbox.com/en-US/Product/66acd000-77fe-1000-9115-d802%titleid%?nosplash=1',
        screenshotUrl: 'http://download.xbox.com/content/images/66acd000-77fe-1000-9115-d802%titleid%/1033/screenlg1.jpg',
        frontCoverUrls: [
            {name:'Download.xbox.com', url:'http://download.xbox.com/content/images/66acd000-77fe-1000-9115-d802%titleid%/1033/boxartlg.jpg'},
            {name:'Tiles.xbox.com', url:'http://tiles.xbox.com/consoleAssets/%titleid%/en-US/largeboxart.jpg'},
            //{name:'Spiffycovers.com (3D)', url:'http://spiffycovers.com/cover/%titleid%/360/3D/'},
            //{name:'Spiffycovers.com', url:'http://spiffycovers.com/cover/%titleid%/360/front/'}
        ],
        bannerUrls: [
            {name:'Download.xbox.com', url:'http://download.xbox.com/content/images/66acd000-77fe-1000-9115-d802%titleid%/1033/banner.png'}
        ]
    };
    app.constant('CFG_URLS', URLS);

    // DEFAULT(s)
    var DEFAULTS = {
        maxTitleSet: DVDMENU.maxTitleSet,
        maxMenuPerVmg: DVDMENU.maxMenuPerVmg,
        maxGamePerTitleSet: DVDMENU.maxGamePerTitleSet,
        requestTimeout: 20000, // 20 secs
        gamesFolderPath: '',
        //dvdStylerPath: '',
        abgxOptions: '-c --af3 --splitvid --patchitanyway --patchgarbage --html',
        language: 'en',
        //bannerSource: '',
        //frontCoverSource: '',
        //lastUsedTheme: '',
        //showCache: false,
        //buildDvds: true,
        //buildIso: true,
        //buildXsk: true,
        //deploy: true
        //openWith: false
    };

    /*
     * CONFIGURATION
     */
    app.factory('Config', function( $translate, Logger ) {

        // Initialize
        Logger.init();

        // Create subdirectories if they does not exists
        if( !fs.existsSync(resPath) ) { mkdirp(resPath); }
        if( !fs.existsSync(buildPath) ) { mkdirp(buildPath); }
        if( !fs.existsSync(PATHS.themes) ) { mkdirp(PATHS.themes); }
        if( !fs.existsSync(PATHS.images) ) { mkdirp(PATHS.images); }

        return {
            data: angular.copy(DEFAULTS),

            resetDefaults: function() {
                angular.extend(this.data, DEFAULTS);
            },

            save: function(value) {
                angular.extend(this.data, value);
                return Q.nfcall(fs.writeFile, PATHS.config, JSON.stringify(this.data, null, '\t'))
                    .then(function() {
                        Logger.log('[CONFIG][SAVE]', {'result':'SUCCESS'});
                    })
                    .fail(function(err) {
                        Logger.error('[CONFIG][SAVE]', {'err':err.message});
                    });
            },

            load: function() {
                var config = this;
                if( fs.existsSync(PATHS.config) ) {
                    return Q.nfcall(fs.readFile, PATHS.config)
                        .then(function(data) {
                            angular.extend(config.data, JSON.parse(data));
                            $translate.use(config.data.language);
                            Logger.log('[CONFIG][LOAD]', {'result':'SUCCESS'});
                        })
                        .fail(function(err) {
                            Logger.error('[CONFIG][LOAD]', {'err':err.message});
                        });
                } else {
                    return config.save();
                }
            }
        };
    });

}(angular.module('xbw.config', [
])));
