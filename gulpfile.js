'use strict';
/* jshint node:true */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    karmaServer = require('karma').Server;


gulp.task('js', function () {
  return gulp.src('deling.js')
    .pipe(concat('deling.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('css', function () {
  return gulp.src('deling.css')
    .pipe(concat('deling.min.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['js', 'css']);

gulp.task('test', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
  }, done).start();
});

gulp.task('test-run', function(done) {
    new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
  }, done).start();
});
