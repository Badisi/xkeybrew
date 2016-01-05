'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

module.exports = function(options) {
    gulp.task('electron', shell.task(['electron src']));
};
