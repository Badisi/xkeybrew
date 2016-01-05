'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
	gulp.task('styles', function () {
		var sassOptions = {
			style: 'expanded'
		};

		return gulp.src([
			options.src + '/app/app.scss',
		])
		.pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
		.pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(options.tmp + '/serve/app/'))
		.pipe(browserSync.reload({ stream: true }));
	});
};
