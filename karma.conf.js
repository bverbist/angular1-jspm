'use strict';

module.exports = function (config) {
    config.set({
        basePath: '.',

        autoWatch: false,
        colors: true,
        logLevel: config.LOG_INFO,

        frameworks: ['jspm', 'jasmine'],

        files: [
            'node_modules/babel-polyfill/dist/polyfill.js'
            //'node_modules/jasmine-async-sugar/jasmine-async-sugar.js'
        ],

        exclude: [],

        plugins: [
            'karma-jspm',
            //'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-babel-preprocessor'
        ],

        jspm: {
            config: 'src/jspm.conf.js',
            loadFiles: [
                'src/jspm_packages/github/angular/bower-angular-mocks@1.5.0/angular-mocks.js',
                'src/jspm_packages/github/bverbist/bower-angular-ice@0.8.0/angular-ice.unitTester.js',
                'src/app/app.js',
                'src/app/**/*.spec.js'
                //'src/app/**/*.js'
            ],
            serveFiles: [
                'src/**/!(*.spec).js',
                'src/**/*.css',
                'src/**/*.json'
            ],
            // Ben: paths override and proxies were necessary to get karma-jspm to work (otherwise 404 errors when gettings src or jspm_packages files)
            //      see also https://github.com/Workiva/karma-jspm/issues/91
            paths: {
                'github:*': '/src/jspm_packages/github/*',
                'npm:*': '/src/jspm_packages/npm/*'
            }
        },

        proxies: {
            '/src/': '/base/src/',
            '/jspm_packages/': '/src/jspm_packages/'
        },

        preprocessors: {
            'src/app/**/*.js': ['babel']
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            }
        },

        reporters: ['dots'],

        //Ben: PhantomJs did not show the correct stacktrace for failing tests
        //browsers: ['PhantomJS']
        browsers: ['Chrome']
    });
};