'use strict';

var ops = {
	patternWatchFiles: ['app/renderer/*.*', 'app/renderer/**/*.*'],
	scssFile: './app/browser/resources/scss/main.scss',
	patternScssFiles: './app/browser/resources/**/*.scss',
	cssFilePath: './app/browser/resources/css/',
	patternJsFiles: ['app/*.js', 'app/**/*.js'],
	runCmd: './node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron ./app',
	killCmd: "kill $(ps -eo pid,command | grep ./build/atom-shell/Atom.app/Contents/MacOS/Atom | grep -v grep | awk '{print $1}')"
};

var gulp = require('gulp');
var watch = require('gulp-watch');
var debug = require('gulp-debug');
var run = require('gulp-run');
var plumber = require('gulp-plumber');
var wait = require('gulp-wait');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var scsslint = require('gulp-scss-lint');
var runSequence = require('run-sequence');


gulp.task('default', function () {
	var cmd = new run.Command(ops.runCmd);
	cmd.exec();

	watch(ops.patternWatchFiles)
		.pipe(plumber({
			errorHandler: function(){}
		}))
		.pipe(run(ops.killCmd))
		.pipe(wait(100))
		.pipe(run(ops.runCmd));

	watch(ops.patternScssFiles, function() {
		runSequence('compile-sass');
	});
});

gulp.task('compile-sass', function () {
	gulp.src(ops.scssFile)
		.pipe(sass())
		.pipe(gulp.dest(ops.cssFilePath));
});

gulp.task('jslint', function () {
	return gulp.src(ops.patternJsFiles)
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('scsslint', function() {
	gulp.src(ops.patternScssFiles)
		.pipe(scsslint());
});

gulp.task('lint', function() {
	runSequence('jslint', 'scsslint');
});
