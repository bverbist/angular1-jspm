import gulp from 'gulp';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';
import karma from 'karma';

import {files} from '../gulpfile-config';
import {build} from './build';

export const test = 'test';
export const jslint = 'jslint';
export const testUnit = 'test:unit';
export const ciUnit = 'ci:unit';

gulp.task(test, callback =>
    runSequence(
        build,
        [jslint],
        testUnit,
        callback)
);

gulp.task(jslint, () =>
    gulp.src([files.gulp, files.js])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task(testUnit, callback => {
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

gulp.task(ciUnit, callback => {
    // remove 'coverage' directory before each test
    //del.sync(path.test.testReports.coverage);

    // run the karma test
    const server = new karma.Server({
        configFile: files.karmaConf,
        singleRun: false
    }, callback);
    server.start();
});