const gulp = require('gulp');
const less = require('gulp-less');
const replace = require('gulp-replace');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const { readFileSync } = require('fs');

gulp.task('copy:dev', (cb) => {
  gulp.src('index.html')
    .pipe(gulp.dest('build'));

  cb();
});

gulp.task('clean', cb =>
  del(['build'], cb)
);

gulp.task('less', (cb) => {
  gulp.src('index.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest('build'));

  cb();
});

gulp.task('prod', (cb) => {
  const file = readFileSync(__dirname + '/build/index.css', 'utf-8');
  gulp.src('index.html')
    .pipe(replace('@@STYLE@@', file))
    .pipe(gulp.dest('build'));

  cb();
});

gulp.task('dev', () => {
  gulp.watch(['index.html', 'index.less'], gulp.series('clean', 'copy:dev', 'less'));
});

gulp.task('preprod', gulp.series('clean', 'less'));
