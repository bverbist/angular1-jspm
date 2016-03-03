/* global __dirname  */

export const dirs = {
    src: 'src',
    build: 'build'
};

export const paths = {
    stylesheets: `${dirs.src}/assets/stylesheets`,  //precessed to css
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
    karmaConf: `${__dirname}/karma.conf.js`
};

export const proxy = {
    context: '',
    options: {
        target: ''
    }
};

export default {
    dirs,
    paths,
    files,
    proxy
};