# Angular 1.x with jspm

Other stuff used:
* sass (css preprocessor) : node-sass used, so no Ruby install needed 
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

* npm run build (tasks: clean, sass)
* npm run test (tasks: 'build' tasks + eslint, karma)
* npm run dev (tasks: 'test' tasks + watch, serve)

## To Do's

* jspm bundle build (for production)
* ui-router
* use ngForward ?
* optional: refactor angular-ice so that iceUnit can be imported as a module

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