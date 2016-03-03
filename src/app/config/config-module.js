import angular from 'angular';
import settings from './settings';

const dependencies = [];

export default angular
    .module('app.config', dependencies)
    .constant('settings', settings);
