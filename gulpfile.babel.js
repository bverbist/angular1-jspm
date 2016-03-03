import gulp from 'gulp';
import runSequence from 'run-sequence';
import del from 'del';
import plumber from 'gulp-plumber'; //Prevent pipe breaking caused by errors from gulp plugins

import browserSync from 'browser-sync';
import httpProxy from 'http-proxy-middleware';

import eslint from 'gulp-eslint';
import karma from 'karma';

import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

import {dirs, paths, files, proxy} from './gulpfile-config';

const browserSyncServer = browserSync.create();

gulp.task('default', ['build']);

gulp.task('build', callback =>
    runSequence(
        'clean',
        ['build:assets'],
        callback)
);

gulp.task('test', callback =>
    runSequence(
        'build',
        ['eslint'],
        'test:unit',
        callback)
);

gulp.task('dev', callback =>
    runSequence(
        'test',
        'watch',
        'serve',
        callback)
);

gulp.task('clean', callback =>
    del(paths.css, callback)
);

gulp.task('build:assets', ['build:assets:sass']);

gulp.task('build:assets:sass', () =>
    gulp
        .src(files.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css))
);

gulp.task('eslint', () =>
    gulp.src([files.gulp, files.js])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('test:unit', callback => {
    // remove 'coverage' directory before each test
    //del.sync(path.test.testReports.coverage);

    // run the karma test
    const server = new karma.Server({
        configFile: files.karmaConf,
        singleRun: true
    }, function() {
        callback();
    });
    server.start();
});

gulp.task('ci:unit', callback => {
    // remove 'coverage' directory before each test
    //del.sync(path.test.testReports.coverage);

    // run the karma test
    const server = new karma.Server({
        configFile: files.karmaConf,
        singleRun: false
    }, callback);
    server.start();
});

gulp.task('watch', () => {
    gulp.watch(files.js, ['eslint', 'test:unit']);
    gulp.watch(files.sass, ['build:assets:sass']);
});

gulp.task('serve', callback => {
    let options = {
        port: 8000,
        ui: {
            port: 8001
        },
        server: {
            baseDir: dirs.src
        },
        files: [
            files.html,
            files.css,
            files.js
        ]
    };

    if (proxy.context !== '') {
        let middleware = httpProxy(proxy.context, proxy.options);
        options.server.middleware = [middleware];
    }

    browserSyncServer.init(
        options,
        callback);
});

///**
// * Create JS production bundle.
// *
// * @param {Function} done - callback when complete
// */
//gulp.task('bundle', ['jshint'], (cb) => {
//    const ENV = !!util.env.env ? util.env.env : 'DEV';
//    const Builder = require('systemjs-builder');
//    const builder = new Builder();
//    const inputPath = 'src/app/app';
//    const outputFile = `${path.tmp.scripts}build.js`;
//    const outputOptions = {sourceMaps: true, config: {sourceRoot: path.tmp.scripts}, conditions: { 'src/app/core/config/env.conditions.js|mock.js': ENV.toLowerCase() === 'test', 'src/app/core/config/env.conditions.js|environment': ENV.toLowerCase()} };
//
//    builder.loadConfig(`${path.root}/jspm.conf.js`)
//        .then(() => {
//            builder.buildStatic(inputPath, outputFile, outputOptions)
//                .then(() => cb())
//                .catch((ex) => cb(new Error(ex)));
//        });
//});