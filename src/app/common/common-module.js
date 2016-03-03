import angular from 'angular';
import configModule from '../config/config-module';
import HttpConfigBuilder from './http-config-builder-service';
import appContentComponent from './app-content-component';

const dependencies = [
    configModule.name
];

export default angular
    .module('app.common', dependencies)
    .service('httpConfigBuilder', HttpConfigBuilder)
    .component('appContent', appContentComponent);
