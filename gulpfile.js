var gulp = require('gulp');

// auto-load gulp-* plugins
var $ = require('gulp-load-plugins')();

//
// all others
var del = require('del');
var autoprefixer = require('autoprefixer-stylus');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge2');
var runSequence = require('run-sequence');

var config = require('./config.json');
var paths = config.paths;
var production = $.util.env.p || $.util.env.prod;

// autoprefixer settings
var Browsers = ['last 2 versions'];

var stylusOptions = {
    use: [autoprefixer({browsers: Browsers})],
    paths: [paths.css.src],
    import: ['_vars']
};


//
// styles

gulp.task('styles', function () {
    return merge(

        // normalize
        gulp.src('node_modules/normalize.css/normalize.css'),

        // vendor css
        gulp.src('node_modules/skeleton.css/skeleton.css'),

        // custom css
        gulp.src([
                '!' + paths.css.src + '/**/_*.*',
                paths.css.src + '/**/*.styl'
            ])
            .pipe($.plumber())
            .pipe($.stylus(stylusOptions))
            .pipe($.concatCss('all.css'))
        )
        .pipe($.plumber())
        .pipe($.concatCss('main.css'))
        .pipe(production ? $.minifyCss() : $.util.noop() )
        .pipe(gulp.dest(paths.css.dest));
});


//
// scripts

// vendor | no-minification
gulp.task('scripts-vendor', function(){
    return gulp.src([
            paths.js.src + '/vendor/**/*.js',
            'node_modules/zepto/zepto.min.js'
        ])
        .pipe(gulp.dest('public/js/vendor/'));
});

// custom
gulp.task('scripts-custom', function(){
    return gulp.src(paths.js.src + '/*.js')
        .pipe($.plumber())
        .pipe($.concat('main.js'))
        .pipe(production ? $.uglify() : $.util.noop())
        .pipe(gulp.dest(paths.js.dest));
});

// main js only
gulp.task('scripts-main', function(){
    return gulp.src(paths.js.src + '/*.js')
        .pipe($.plumber())
        .pipe($.concat('main.js'))
        .pipe(production ? $.uglify() : $.util.noop())
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('scripts', ['scripts-vendor', 'scripts-custom'], function(){
    reload();
});


//
// react jsx
gulp.task('react-jsx', function(){
    return gulp.src(paths.js.src + '/app/src/**/*.js')
        .pipe($.plumber())
        .pipe($.react())
        .pipe(gulp.dest(paths.js.src + '/app/build/'));
});

// react scripts
gulp.task('react-js', ['react-jsx'], function(){
    return gulp.src(paths.js.src + '/app/build/**/*.js')
        .pipe(production ? $.uglify() : $.util.noop())
        .pipe(gulp.dest(paths.js.dest + '/app/'));
});

// react full
gulp.task('react', ['react-js'], function(){
    reload();
});


//
// html
gulp.task('html', function(){
    return gulp.src('src/index.html')
        .pipe(gulp.dest('public/'));
});


//
// images
gulp.task('images', function(){
    return gulp.src(paths.img.src + '/**')
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('favicon', function(){
    return gulp.src('favicon.ico')
        .pipe(gulp.dest('public/'));
});


//
// browser sync

gulp.task('bs-reload', function(){
    reload();
});

gulp.task('sync', function(){
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        files: ["public/**/*.*"],
        port: config.port
//        , logLevel: "debug"
    });
});


//
// cleanup
gulp.task('clean', function(cb){
    return del([
        'public/*.html',
        paths.css.dest,
        paths.js.dest,
        paths.img.dest,
        'public/*.ico'
    ], cb);
});


//
// build
gulp.task('build', ['clean'], function(){
    return runSequence(
        'html',
        'images',
        'favicon',
        'styles',
        'react'
    );
});


//
// default
gulp.task('default', ['build'], function(){
    runSequence(
        'sync',
        function(){
            gulp.watch('./src/*.html', ['html']);
//            gulp.watch('./templates/**/*.*', ['templates']);
//            gulp.watch('./' + paths.js.src + '/**/*.js', ['scripts-all']);
            gulp.watch('./' + paths.js.src + '/app/src/**/*.js', ['react']);
            gulp.watch('./' + paths.css.src + '/**/*.styl', ['styles']);
        });
});
