import gulp from 'gulp';

import {build} from './gulp-tasks/build.js';
import './gulp-tasks/test.js';
import './gulp-tasks/dev.js';

gulp.task('default', [build]);

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