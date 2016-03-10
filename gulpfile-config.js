/* global __dirname  */

export const dirs = {
    src: 'src',
    dist: 'dist'
};

export const paths = {
    stylesheets: `${dirs.src}/assets/stylesheets`,
    css: `${dirs.src}/assets/css`
};

export const files = {
    js: `${dirs.src}/app/**/*.js`,
    jsApp: `${dirs.src}/app/**/!(*.spec).js`,
    jsSpecs: `${dirs.src}/app/**/*.spec.js`,
    sass: `${paths.stylesheets}/*.scss`,
    css: `${paths.css}/*.css`,
    html: `${dirs.src}/**/*.html`,
    gulp: 'gulpfile.babel.js',
    karmaConf: `${__dirname}/karma.conf.js`,
    jsModuleToBundle: `${dirs.src}/app/app.js`,
    jsBundled: 'app.bundle.js',
    indexHtml: `${dirs.src}/index.html`
};

export const proxy = {
    context: '',
    options: {
        target: ''
    }
};
