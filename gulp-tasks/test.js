import gulp from 'gulp';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';
import karma from 'karma';

import {files} from '../gulpfile-config';

gulp.task('test', callback =>
    runSequence(
        'build',
        ['eslint'],
        'test:unit',
        callback)
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

export default '';