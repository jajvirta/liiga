const gulp         = require('gulp');
const gutil        = require('gulp-util');
const source       = require('vinyl-source-stream');
const babelify     = require('babelify');
const watchify     = require('watchify');
const browserify   = require('browserify');
const browserSync  = require('browser-sync');
const buffer       = require('vinyl-buffer');
const sourcemaps   = require('gulp-sourcemaps');
const _            = require('lodash');
const uglify       = require('gulp-uglify')
const gulpif       = require('gulp-if');
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const runSequence  = require('run-sequence');

var useBrowserSync = false;
const fullPathsInBrowserify = false;

const path = {
    MAIN: './app/app.jsx',
    HTML: './app/**/*.html',
    SASS: './app/**/*.scss',
    CSS: './app/**/*.css',
    JS: ['./app/**/*.js', './app/**/*.jsx'],
    IMG: ['./app/**/*.svg', './app/**/*.gif', './app/**/*.jpg', './app/**/*.png', './app/**/*.ico'],
    FONTS: './app/fonts/**',
    RESOURCES: './app/resources/**',
    DIST: './dist',
    STYLES: './dist/styles',
    BACK: '../src/main/resources/static'
};

const vendorLibs = _.union(
    Object.keys(require('./package.json').dependencies),
    [
        'react/addons',
        'moment/locale/fi',
        'moment/locale/sv',
        'react-day-picker/moment'
    ]);

const devbundler = watchify(browserify(path.MAIN,
    _.assign(watchify.args, {fullPaths: fullPathsInBrowserify, debug: true}))); // debug päälle, jotta saadaan source mapit

devbundler.transform(babelify)
    .on('update', watchBundle)
    .on('log', gutil.log);

function watchBundle() {
    gutil.log('Compiling JS...');

    return devbundler
        .external(vendorLibs)
        .bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            if (useBrowserSync) {
                browserSync.notify('Browserify Error!');
            }
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.DIST))
        .pipe(gulpif(useBrowserSync, browserSync.reload({ stream: true, once: true })));
}

const bundler = browserify('./app/app.jsx', { fullPaths: fullPathsInBrowserify, debug: false });
bundler.transform(babelify);

function dist() {
    return bundler
        .external(vendorLibs)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest(path.DIST));
}

var vendorsBundler = browserify({
    debug: true, // It is nice to have sourcemapping when developing
    require: vendorLibs,
    fullPaths: fullPathsInBrowserify
});

gulp.task('vendor', function () {
    gutil.log('Compiling vendor bundle...\n', vendorLibs);
    //process.env.NODE_ENV = 'production';

    return vendorsBundler.bundle()
        .on('error', function (err) {  gutil.log(err.message); })
        .pipe(source('./vendor.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(path.DIST));
});

/**
 * Gulp task alias
 */
gulp.task('watch-bundle', function () {
    return watchBundle();
});

gulp.task('distbundle', ['copy-to-dist', 'vendor'], function () {
    return dist();
});


gulp.task('proto', ['watch-bundle'], function () {
    useBrowserSync = true;
    browserSync({
        server: {
            baseDir: path.DIST
        }
    });
});

gulp.task('default', function(callback) {
    runSequence(
        ['copy-to-dist', 'watch-bundle', 'watch-sass', 'vendor'],
        'copy-to-back',
        'watch-dist',
        callback);
});

gulp.task('watch-sass', function() {
    return gulp.watch(path.SASS, ['sass']);
});

gulp.task('sass', function() {
    return gulp.src(path.SASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(path.STYLES));
});

gulp.task('watch-dist', function() {
    return gulp.watch('dist/**/*', ['copy-to-back']);
});

gulp.task('copy-to-back', function() {
    return gulp.src('./dist/**/*', { base: './dist' })
        .pipe(gulp.dest(path.BACK));
});

gulp.task(
    'copy-to-dist',
    ['sass', 'fonts-to-dist', 'resources-to-dist', 'img-to-dist'],
    function() {
        return gulp.src([path.HTML, path.CSS].concat(path.IMG))
            .pipe(gulp.dest(path.DIST));
    });

gulp.task('img-to-dist', function() {
    return gulp.src(path.IMG)
        .pipe(gulp.dest(path.DIST + '/img'));
});

gulp.task('fonts-to-dist', function() {
    return gulp.src(path.FONTS)
        .pipe(gulp.dest(path.DIST + '/fonts'));
});

gulp.task('resources-to-dist', function() {
    return gulp.src(path.RESOURCES)
        .pipe(gulp.dest(path.DIST + '/resources'));
});

gulp.task('dist', function(callback) {
    runSequence(
        ['copy-to-dist', 'distbundle',  'vendor'],
        'copy-to-back',
        callback);
});

