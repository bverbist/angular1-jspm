import angular from 'angular';
import 'bootstrap/css/bootstrap.css!';
import 'angular-bootstrap/ui-bootstrap-tpls.js';
import '../assets/css/app.css!';
import 'angular-ui-router';
import layoutModule from './layout/layout-module';
import gameModule from './game/game-module';
import configureRouter from './configure-router';

const dependencies = [
    'ui.bootstrap',
    'ui.router',
    layoutModule.name,
    gameModule.name
];

export default angular
    .module('Ng1JspmApp', dependencies)
    .config(configureRouter);
