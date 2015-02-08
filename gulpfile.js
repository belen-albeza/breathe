var minimist = require('minimist');
var browserify = require('browserify');
var watchify = require('watchify');

var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');

// command line args
var knownOptions =  {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};
var options = minimist(process.argv.slice(2), knownOptions);

// setup browserify
var bundler = browserify('./app/js/main.js');
// add browserify transforms here
// bundler.transform('brfs');

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/js'))
    .pipe(livereload());
}

gulp.task('js', bundle);

gulp.task('less', function () {
  gulp.src(['app/less/*.less', '!app/less/_*'])
    .pipe(less())
    .pipe(gulp.dest('.tmp/css'))
    .pipe(livereload())
});

gulp.task('html', function () {
  gulp.src(['app/*.html'])
    .pipe(livereload());
});

gulp.task('watch', ['connect'], function () {
  livereload.listen();
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['app/less/*.less'], ['less']);

  bundler = watchify(bundler, watchify.args);
  bundler.on('update', bundle);
});

gulp.task('connect', function () {
  connect.server({
    root: ['app', '.tmp']
  });
});

gulp.task('release', ['build'], function () {
  gulp.src(['app/**/*', '!**/*.less', '.tmp/**/*'])
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['less', 'js']);
gulp.task('server', ['build', 'watch']);
gulp.task('default', ['build']);
