# Angular 1.x with jspm

Example project.

* All js written in es6
  * modules, classes, etc.
  * gulp and unit tests also in es6
* Angular 1.5 components (avoiding regular controllers)
* Jspm as package manager
* Other stuff used:
  * bootstrap
  * sass (css preprocessor) : node-sass used, so no Ruby install needed
  * angular-ui-router 
  * karma
  * jasmine
  * angular-ice ('iceUnit' test helper for angular code)
  * babel transpiling to es5
  * eslint
  * browser-sync
  * gulp tasks (but called from npm scripts)
  * lodash
  * ...

## Dev setup

* install NodeJs
* clone this git repo
* npm run setup

## Dev commands

* npm run prepare
  * executes tasks: clean, sass
* npm run test
  * executes tasks: 'prepare' tasks + eslint, karma
* npm run dev
  * executes tasks: 'test' tasks + watch, serve
* npm run build
  * executes tasks: 'test' tasks + bundle/minify js to dist folder

## To Do's

* ngAnnotate ?
* use ngForward ?
* typescript ?
* optional: refactor angular-ice so that iceUnit can be imported as a module

## example shim configuration

* reason
  * the package.json of bootstrap-bower was't properly configured for jspm
  * so that jspm doesn't know that it has to load its angular dependency first when doing the sfx bundle
  * resulted in error "Uncaught ReferenceError: angular is not defined"
  * also see https://github.com/jspm/jspm-cli/issues/1481
  * can be fixed for other simular dependency problems by doing an override like this ...

```shell
jspm install angular-bootstrap=github:angular-ui/bootstrap-bower@~1.2.4 -o "{ registry: 'jspm', main: 'ui-bootstrap-tpls', 'format': 'cjs', dependencies: { angular: '1.5.0' }, shim: { 'ui-bootstrap-tpls': { deps: ['angular'] } } }"
```

## unit tests

* either 'pure' js tests
  * not closely coupled with angular, but you'll have to provide all the dependencies yourselves
  * example: http-config-builder-service.spec.js
* or 'angular' unit tests
  * let angular give you the class you're going to test and all its dependencies
  * use iceUnit (angular-ice) to reduce the boiler-plate code to inject and mock services/promises/etc.
  * example: opencultuurdata-resource-service.spec.js

## public data api used in this example project

### opencultuurdata.nl

* [api - searching within a single collection](http://docs.opencultuurdata.nl/user/api.html#searching-within-a-single-collection)
* [api - rest search](http://docs.opencultuurdata.nl/user/api.html#rest-search)

### openbeelden rest call

* [http://api.opencultuurdata.nl/v0/openbeelden/search](http://api.opencultuurdata.nl/v0/openbeelden/search)
* POST
* Content-Type: application/x-www-form-urlencoded
* Payload:
```shell
{
  "query": "auto",
  "size": 20
}
```

## License

The MIT License
