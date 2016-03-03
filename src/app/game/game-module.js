import angular from 'angular';
import dataModule from '../data/data-module';

const dependencies = [
    dataModule.name
];

export default angular
    .module('app.game', dependencies);
