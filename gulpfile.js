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
var webpack = require('webpack');

var config = require('./config');
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

        // font-awesome
        gulp.src('node_modules/font-awesome/css/font-awesome.css'),

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
        .pipe($.concatCss('main.css', {rebaseUrls : false}))
        .pipe(production ? $.minifyCss() : $.util.noop() )
        .pipe(gulp.dest(paths.css.dest));
});


//
// fonts
gulp.task('fonts', function(){
    gulp.src('./node_modules/font-awesome/fonts/**/*')
        .pipe(gulp.dest(paths.fonts.dest));
});


//
// scripts
gulp.task('webpack', function(cb) {
    var config = require('./webpack.config.js');
    webpack(config,
        function(err, stats) {
            if(err) throw new $.util.PluginError('webpack', err);
            $.util.log('[webpack]', stats.toString());
            cb();
        });
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
// data
gulp.task('data', function(){
    return gulp.src(paths.data.src + '/**')
        .pipe(gulp.dest(paths.data.dest));
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
        paths.fonts.dest,
        paths.data.dest,
        'public/*.ico'
    ], cb);
});


//
// build
gulp.task('build', ['clean'], function(){
    return runSequence(
        'html',
        'data',
        'images',
        'fonts',
        'favicon',
        'styles',
        'webpack'
    );
});


//
// default
gulp.task('default', ['build'], function(){
    runSequence(
        'sync',
        function(){
            gulp.watch('./src/*.html', ['html']);
            gulp.watch('./data/**/*.json', ['data']);
//            gulp.watch('./templates/**/*.*', ['templates']);
            gulp.watch('./' + paths.js.src + '/app/**/*.{js,jsx}', ['webpack']);
            gulp.watch('./' + paths.css.src + '/**/*.styl', ['styles']);
        });
});


//
// code linting
gulp.task('js-check', ['webpack'], function(){
    gulp.watch('./.eslintrc', ['webpack']);
    gulp.watch('./' + paths.js.src + '/app/**/*.{js,jsx}', ['webpack']);
});