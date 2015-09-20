var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var config = require('./webpack.config.js');


gulp.task('clean', del.bind(null, ['build/*']));

gulp.task('compile:dom', function () {
  return gulp.src(['src/**/*.{html,svg}']).pipe(gulp.dest('build'));
});

gulp.task('compile:style', function () {
  return gulp.src(['src/**/*.less'])
    .pipe($.less({}))
    .on('error', function() {})
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp.src(['src/**/*.png']).pipe(gulp.dest('build'));
});

gulp.task('compile', ['webpack', 'compile:dom', 'compile:style']);

gulp.task("webpack", ["webpack:main"]);

gulp.task("webpack:main", function () {
  return gulp.src(config.main.entry)
    .pipe($.webpack(config.main))
    .pipe(gulp.dest(config.js.dest));
});

gulp.task('default', function () {
  runSequence('clean', 'compile', 'copy');
});

gulp.task('serve', function () {
  gulp.src('build')
    .pipe($.webserver({
      livereload: false,
      directoryListing: false,
      open: true
    }));
});

gulp.task('watch', ['default'], function () {
  gulp.watch(['src/**/*'], function () {
    runSequence('default');
  });
});
