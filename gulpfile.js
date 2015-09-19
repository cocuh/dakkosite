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

gulp.task('compile', ['webpack', 'compile:dom']);

gulp.task("webpack", ["webpack:main"]);

gulp.task("webpack:main", function () {
    return gulp.src(config.main.entry)
        .pipe($.webpack(config.main))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('default', function () {
    runSequence('clean', 'compile');
});

gulp.task('serve', function () {
    gulp.src('build')
        .pipe($.webserver({
            livereload: false,
            directroyListing: true,
            open: true
        }));
});

gulp.task('watch', function () {
    runSequence('clean', 'compile');
    gulp.watch(['src/**/*'], function () {
        runSequence('clean', 'compile');
    });
});
