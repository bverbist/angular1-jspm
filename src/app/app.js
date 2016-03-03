import angular from 'angular';
import 'bootstrap/css/bootstrap.css!';
import 'angular-bootstrap/ui-bootstrap-tpls.js';
import '../assets/css/app.css!';
import gameModule from './game/game-module';

const dependencies = [
    'ui.bootstrap',
    gameModule.name
];

export default angular
    .module('Ng1JspmApp', dependencies);
