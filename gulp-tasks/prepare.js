import gulp from 'gulp';
import runSequence from 'run-sequence';
import del from 'del';
import plumber from 'gulp-plumber'; //Prevent pipe breaking caused by errors from gulp plugins
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

import {paths, files} from '../gulpfile-config';

export const prepare = 'prepare';
export const cleanCss = 'clean:css';
export const prepareAssets = 'prepare:assets';
export const prepareAssetsSass = 'prepare:assets:sass';

gulp.task(prepare, callback =>
    runSequence(
        cleanCss,
        [prepareAssets],
        callback)
);

gulp.task(cleanCss, callback =>
    del(paths.css, callback)
);

gulp.task(prepareAssets, [prepareAssetsSass]);

gulp.task(prepareAssetsSass, () =>
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