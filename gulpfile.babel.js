import gulp from 'gulp';

import {prepare} from './gulp-tasks/prepare.js';
import './gulp-tasks/test.js';
import './gulp-tasks/dev.js';
import './gulp-tasks/build.js';

gulp.task('default', [prepare]);
