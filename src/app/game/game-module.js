import angular from 'angular';
import randomImageModule from '../random-image/random-image-module';
import memoryGameComponent from './memory-game-component';

const dependencies = [
    randomImageModule.name
];

export default angular
    .module('app.game', dependencies)
    .component('memoryGame', memoryGameComponent);
