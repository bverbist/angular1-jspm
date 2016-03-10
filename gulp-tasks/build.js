import gulp from 'gulp';
import runSequence from 'run-sequence';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import jspm from 'gulp-jspm';
import htmlReplace from 'gulp-html-replace';

import {dirs, files} from '../gulpfile-config';
import {test} from './test';

export const build = 'build';
export const cleanDist = 'clean:dist';
export const bundle = 'bundle';
export const indexDist = 'indexDist';

gulp.task(build, callback =>
    runSequence(
        cleanDist,
        test,
        bundle,
        indexDist,
        callback)
);

gulp.task(cleanDist, callback =>
    del(dirs.dist, callback)
);

gulp.task(bundle, () =>
    gulp.src(files.jsModuleToBundle)
        .pipe(sourcemaps.init())
        .pipe(jspm({
            selfExecutingBundle: true,
            minify: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.dist))
);

gulp.task(indexDist, () =>
    gulp.src(files.indexHtml)
        .pipe(htmlReplace({
            'jsBundle': files.jsBundled
        }))
        .pipe(gulp.dest(dirs.dist))
);