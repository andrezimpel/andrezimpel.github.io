var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    path = require('path');


// ------------------------------------------


// paths
var paths = {
  scripts: ['javascripts/**/*.js'],
  images: 'img/**/*',
  sass: "scss/**/*.scss",
  html: "index.html",
  public_dist: "dist/**/*.*"
};


// ------------------------------------------


// Retrun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.public_dist, ['public_dist']);
});



// copy index to /public for developing with pow
gulp.task('html', function () {
  gulp.src(paths.html)
    .pipe(gulp.dest('./public/'));
});



// compile sass to css and store it in dist
gulp.task('sass', function () {
  gulp.src('./scss/andrezimpel.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});



gulp.task('scripts', function() {
  gulp.src([
            './bower_components/jquery/dist/jquery.js',
            './bower_components/bootstrap-sass/js/transition.js',
            './bower_components/bootstrap-sass/js/alert.js',
            './bower_components/bootstrap-sass/js/button.js',
            './bower_components/bootstrap-sass/js/carousel.js',
            './bower_components/bootstrap-sass/js/collapse.js',
            './bower_components/bootstrap-sass/js/dropdown.js',
            './bower_components/bootstrap-sass/js/modal.js',
            './bower_components/bootstrap-sass/js/tooltip.js',
            './bower_components/bootstrap-sass/js/popover.js',
            './bower_components/bootstrap-sass/js/scrollspy.js',
            './bower_components/bootstrap-sass/js/tab.js',
            './bower_components/bootstrap-sass/js/affix.js',
            './bower_components/twitter-text/twitter-text.js',
            './bower_components/momentjs/moment.js',
            "./javascripts/main.js"
            ])
    // .pipe(uglify())
    .pipe(concat('andrezimpel.min.js'))
    .pipe(gulp.dest('./dist/js'));
});



// copy files from dist to public dist as they change
gulp.task('public_dist', function () {
  gulp.src(paths.public_dist)
    .pipe(gulp.dest('./public/dist'));
});

// ------------------------------------------


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass','html','public_dist', 'scripts', 'watch']);
