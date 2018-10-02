'use strict';

const gulp        = require('gulp');
const babel = require("gulp-babel");
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const removeFiles = require('gulp-remove-files');
const minify = require('gulp-minifier');
const errorHandler = require('gulp-error-handle');
// const injectPartials = require('gulp-inject-partials');
const jsImport = require('gulp-js-import');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
// const autoprefixer = require('autoprefixer');

gulp.task('images', function () {
    return gulp.src('app/images/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('clearImages', function () {
    return gulp.src('dist/images/*')
        .pipe(removeFiles())
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('clearFonts', function () {
    return gulp.src('dist/fonts/*')
        .pipe(removeFiles())
});

gulp.task('js', function () {
    return gulp.src('app/js/main.js')
    .pipe(jsImport({hideConsole: true}))
        .pipe(gulp.dest('dist/js/'))
});
gulp.task('clearjs', function () {
    return gulp.src('dist/js/*')
        .pipe(removeFiles())
});

gulp.task('sasstocss', function() {
    return gulp.src('app/sass/styles.scss')
        .pipe(errorHandler())
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('jsbabel', function() {
    return gulp.src('app/js/custom.js')
        .pipe(babel())
        .pipe(gulp.dest('app/js'))
});

gulp.task('css', function() {
    return gulp.src('dist/css/*.css')
        .pipe(postcss([
            tailwindcss('tailwind.js'),
            require('autoprefixer'),
        ]))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('compressJs', function() {
    return gulp.src('dist/js/main.js').pipe(minify({
        minify: true,
        minifyJS: {
          sourceMap: false
        },
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('compressCss', function() {
    return gulp.src('dist/css/**/*').pipe(minify({
        minify: true,
        minifyCSS: true,
    })).pipe(gulp.dest('dist/css'))
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
            //  .pipe(injectPartials())
             .pipe(gulp.dest('dist'));
  });


gulp.task('watch', gulp.series('sasstocss', 'css', 'clearFonts', 'fonts', 'html','clearjs','js','clearImages', 'images', function () {
    browserSync.init({
        server: true,
        browser: "firefox",
        startPath: "index.html",
        notify: false
    });
    gulp.watch(['app/sass/**/*.*','tailwind.js'], gulp.series('sasstocss', 'css'));
    gulp.watch('app/fonts/**/*.*', gulp.series('clearFonts','fonts'));
    gulp.watch('app/js/**/*.*', gulp.series('clearjs','js'));
    gulp.watch('app/**/*.html', gulp.series('html'));
    gulp.watch('app/images/**/*.*', gulp.series('clearImages', 'images'));
    browserSync.watch(['dist/**/*.html','dist/**/*.js','app/images/*.*','dist/**/*.css','dist/fonts/**/*.*','tailwind.js']).on('change', browserSync.reload);
}));

gulp.task('build', gulp.series('sasstocss', 'css', 'clearImages', 'images', 'clearjs', 'jsbabel','js', 'compressJs', 'compressCss', 'html'));