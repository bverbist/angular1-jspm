import gulp from 'gulp';
import runSequence from 'run-sequence';
import httpProxy from 'http-proxy-middleware';
import browserSync from 'browser-sync';

import {dirs, files, proxy} from '../gulpfile-config';

const browserSyncServer = browserSync.create();

gulp.task('dev', callback =>
    runSequence(
        'test',
        'watch',
        'serve',
        callback)
);

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

export default '';