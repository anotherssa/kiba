'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('bourbon');
var bourbonNeat = require('bourbon-neat');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();


gulp.task('sass', function() {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sass({
            includePaths: bourbon.includePaths.concat(bourbonNeat.includePaths)
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src([
        'src/assets/vendor/jquery-3.1.1/jquery-3.1.1.min.js',
        'src/assets/vendor/jquery-ui-1.12.1.custom/jquery-ui.js',
        'src/assets/vendor/slick-1.6.0/slick/slick.min.js',
        'src/assets/js/app.js',
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('src/assets/images/icons/*.png').pipe(spritesmith({
        imgName: '../images/sprite.png',
        cssName: 'sprite.css'
    }));

    var imgStream = spriteData.img
        .pipe(gulp.dest('dist/assets/images/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('dist/assets/css/'));

    return merge(imgStream, cssStream);
});

gulp.task('default', ['html', 'sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/assets/scss/**/*.scss', ['sass']);
    gulp.watch("src/assets/js/**/*.js", ['js']).on('change', browserSync.reload);
    gulp.watch('src/**/*.html', ['html']).on('change', browserSync.reload);
});

gulp.task('build', ['sass', 'html', 'sprite']);