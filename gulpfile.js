'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

gulp.task('default', function() {
	return gulp
		.src('./simplicity.es6.js')
		.pipe(babel())
		.pipe(rename('simplicity.js'))
		.pipe(gulp.dest('./dist'));
});