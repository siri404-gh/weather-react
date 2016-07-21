var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function(){
    browserify('./client/src/js/app.js')
        .transform('reactify')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./client/dist/js'))
});

gulp.task('copy', function(){
    gulp.src('./client/src/*.html').pipe(gulp.dest('./client/dist'));
    gulp.src('./client/src/css/*.*').pipe(gulp.dest('./client/dist/css'));
    gulp.src('./client/src/fonts/*.*').pipe(gulp.dest('./client/dist/fonts'));
    gulp.src('./client/src/js/vendor/*.*').pipe(gulp.dest('./client/dist/js/vendor'));
});

gulp.task('default',['browserify','copy'], function(){
    return gulp.watch('src/**/*.*',['browserify','copy']);
});
