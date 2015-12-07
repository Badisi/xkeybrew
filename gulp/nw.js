'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

module.exports = function(options) {
    gulp.task('nw', shell.task(['nwbuild --run src']));
    gulp.task('nw-offline', shell.task(['nwbuild --run --version=0.12.3 src']));
};
