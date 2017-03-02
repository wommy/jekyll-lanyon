var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  cps = require('child_process').spawn;
  
gulp.task('jekyll-build', function (done) {
    browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
    return cps('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['jekyll-rebuild'], function() {
  browserSync({
    server: {baseDir: '_site'},
    port:process.env.PORT,
    host:process.env.IP
  });
});

gulp.task('watch', function () {
    gulp.watch(['*.html','*.md','_data/*','*/*.html','*/*.md','_config.yml'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);