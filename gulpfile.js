'use strict';

/* eslint-env node */

var gulp = require('gulp');

var plugins = {
  concat:     require('gulp-concat'),
  rename:     require('gulp-rename'),
  sourcemaps: require('gulp-sourcemaps'),
  uglify:     require('gulp-uglify')
};

gulp.task('build', function () {
  return gulp.src(['lib/index.js', 'lib/propagations/*.js'])
    .pipe(plugins.concat('tiler-propagate.js'))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.rename({extname: '.min.js'}))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch(['lib/index.js', 'lib/propagations/*.js'], ['build']);
});

gulp.task('default', ['watch']);
