var gulp        = require('gulp')
    plumber     = require('gulp-plumber')
    del         = require('del')
    runSequence = require('run-sequence')
    mjml        = require('gulp-mjml')
    nunjucks    = require('gulp-nunjucks')
    browserSync = require('browser-sync')
    reload      = browserSync.reload;

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: './dist',
            directory: true
        }
    })
});

gulp.task('clear', function () {
    del('./dist/*.html')
});

gulp.task('mjml', function () {
    return gulp.src('./src/*.mjml')
        .pipe(plumber())
        .pipe(nunjucks.compile({name: 'Sindre'}))
        .pipe(mjml())
        .pipe(gulp.dest('./dist'))
        .pipe(reload({stream:true}))
});

gulp.task('watch', function(){
    gulp.watch('./src/**/*.mjml', ['mjml'])
});

gulp.task('default', function(callback) {
  runSequence('clear', ['browser-sync', 'mjml', 'watch'], callback)
});