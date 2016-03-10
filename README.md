# Angular 1.x with jspm

Other stuff used:
* bootstrap
* sass (css preprocessor) : node-sass used, so no Ruby install needed
* anguler-ui-router 
* karma
* jasmine
* angular-ice ('iceUnit' test helper for angular code)
* babel transpiling to es5
* eslint
* browser-sync
* gulp tasks (but called from npm scripts)
* ...

## Dev setup

* install NodeJs
* clone this git repo
* npm run setup

## Dev commands

* npm run prepare (tasks: clean, sass)
* npm run test (tasks: 'prepare' tasks + eslint, karma)
* npm run dev (tasks: 'test' tasks + watch, serve)
* npm run build (tasks: 'test' tasks + bundle/minify js to dist folder)

## To Do's

* use ngForward ?
* typescript ?
* optional: refactor angular-ice so that iceUnit can be imported as a module

## example shim configuration

* reason
  * the package.json of bootstrap-bower was't properly configured for jspm
  * so that jspm doesn't know that it has to load its angular dependency first when doing the sfx bundle
  * can be fixed for your own project by doing an override like this ...

```shell
jspm install angular-bootstrap=github:angular-ui/bootstrap-bower@~1.2.4 -o "{ registry: 'jspm', main: 'ui-bootstrap-tpls', 'format': 'cjs', dependencies: { angular: '1.5.0' }, shim: { 'ui-bootstrap-tpls': { deps: ['angular'] } } }"
```

## public data api being used

### opencultuurdata.nl

* [api - searching within a single collection](http://docs.opencultuurdata.nl/user/api.html#searching-within-a-single-collection)
* [api - rest search](http://docs.opencultuurdata.nl/user/api.html#rest-search)

### example

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