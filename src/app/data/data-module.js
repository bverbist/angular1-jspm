import angular from 'angular';
import 'angular-resource';
import commonModule from '../common/common-module';
import OpencultuurdataResource from './opencultuurdata-resource-service';

const dependencies = [
    'ngResource',
    commonModule.name
];

export default angular
    .module('app.data', dependencies)
    .service('opencultuurdataResource', OpencultuurdataResource);
