'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

module.exports = function(options) {

	function browserSyncInit(baseDir, browser) {
		browser = browser === undefined ? 'default' : browser;

		var routes = null;
		if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
			routes = {
				'/bower_components': 'bower_components'
			};
		}

		var server = {
			baseDir: baseDir,
			routes: routes
		};

		browserSync.instance = browserSync.init({
			startPath: '/',
			server: server,
			browser: 'none' //browser
		});
	}

	browserSync.use(browserSyncSpa({
		selector: '[ng-app]'// Only needed for angular apps
	}));

	gulp.task('browser-sync', ['watch'], function () {
		browserSyncInit([options.tmp + '/serve', options.src]);
	});

	gulp.task('serve', ['clean', 'browser-sync']);
	gulp.task('serve:dist', ['build', 'browser-sync']);
};
