import angular from 'angular';
import resourceModule from '../resource/resource-module';
import RandomImage from './random-image-service';
import randomImageComponent from './random-image-component';

const dependencies = [
    resourceModule.name
];

export default angular
    .module('app.randomImage', dependencies)
    .service('randomImage', RandomImage)
    .component('randomImg', randomImageComponent);
