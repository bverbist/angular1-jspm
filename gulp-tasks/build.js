import gulp from 'gulp';
import runSequence from 'run-sequence';
import del from 'del';
import plumber from 'gulp-plumber'; //Prevent pipe breaking caused by errors from gulp plugins
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

import {paths, files} from '../gulpfile-config';

export const build = 'build';
export const clean = 'clean';
export const buildAssets = 'build:assets';
export const buildAssetsSass = 'build:assets:sass';

gulp.task(build, callback =>
    runSequence(
        clean,
        [buildAssets],
        callback)
);

gulp.task(clean, callback =>
    del(paths.css, callback)
);

gulp.task(buildAssets, [buildAssetsSass]);

gulp.task(buildAssetsSass, () =>
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