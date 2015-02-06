var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var less = require('gulp-less');

gulp.task('less', function () {
    gulp.src(['app/less/*.less', '!app/less/_*'])
      .pipe(less())
      .pipe(gulp.dest('.tmp/css'))
      .pipe(livereload())
});

gulp.task('sources', function () {
    gulp.src(['app/*.html', 'app/js/**/*.js'])
      .pipe(livereload());
});

gulp.task('watch', ['connect'], function () {
  livereload.listen();
  gulp.watch(['app/*.html', 'app/js/**/*.js'], ['sources']);
  gulp.watch(['app/less/*.less'], ['less']);
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

gulp.task('build', ['less']);
gulp.task('server', ['build', 'watch']);
gulp.task('default', ['build']);
