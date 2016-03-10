import gulp from 'gulp';
import runSequence from 'run-sequence';
import httpProxy from 'http-proxy-middleware';
import browserSync from 'browser-sync';

import {dirs, files, proxy} from '../gulpfile-config';
import {prepareAssetsSass} from './prepare';
import {test, jslint, testUnit} from './test';

const browserSyncServer = browserSync.create();

export const dev = 'dev';
export const watch = 'watch';
export const serve = 'serve';

gulp.task(dev, callback =>
    runSequence(
        test,
        watch,
        serve,
        callback)
);

gulp.task(watch, () => {
    gulp.watch(files.js, [jslint, testUnit]);
    gulp.watch(files.sass, [prepareAssetsSass]);
});

gulp.task(serve, callback => {
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