var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var rsync = require('gulp-rsync');

// setup browserify
var bundler = browserify('./app/js/main.js');

var config = {};
try {
  config = require('./gulp-config.json');
}
catch (e) {
  console.log('A gulp-config.json file is needed for some tasks');
}

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

gulp.task('release', ['build'], function (done) {
  gulp.src(['app/**/*', '!**/*.less', '.tmp/**/*'])
    .pipe(gulp.dest('dist'))
  done();
});

gulp.task('rsync', function () {
  gulp.src('dist/**')
    .pipe(rsync({
      root: 'dist',
      hostname: config.deploy.host,
      username: config.deploy.user,
      destination: config.deploy.path,
      incremental: true,
      progress: true
    }));
});

gulp.task('build', ['less', 'js']);
gulp.task('server', ['build', 'watch']);
gulp.task('deploy', ['release', 'rsync']);
gulp.task('default', ['build']);
