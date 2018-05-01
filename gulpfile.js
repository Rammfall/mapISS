'use strict';

let gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  del = require('del'),
  htmlmin = require('gulp-htmlmin'),
  cssmin = require('gulp-cssmin'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  debug = require('gulp-debug');

gulp.task('sass', function () {
  return gulp.src('app/scss/main.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass({outputStyle: 'compressed'}) )
    .pipe( autoprefixer() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest('app/css') );
});

gulp.task('clean', function () {
  return del('public');
});

gulp.task('htmlmin', function () {
  return gulp.src('app/*.html')
    .pipe( htmlmin({collapseWhitespace: true}) )
    .pipe( gulp.dest('public/') );
});

gulp.task('cssmin', function () {
  return gulp.src('app/css/main.css')
    .pipe( cssmin() )
    .pipe( gulp.dest('public/css/') );
});

gulp.task('jsmin', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('public/js'));
});

gulp.task('pre-build', ['clean']);

gulp.task('build', ['pre-build', 'htmlmin', 'cssmin', 'jsmin']);

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.*', ['sass']);
});

gulp.task('serve', function () {
  browserSync.init({
    server: 'app'
  });

  browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['serve', 'watch']);