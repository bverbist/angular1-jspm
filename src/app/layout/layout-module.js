import angular from 'angular';
import appContentComponent from './app-content-component';
import appHeaderComponent from './app-header-component';
import appFooterComponent from './app-footer-component';

const dependencies = [];

export default angular
    .module('app.layout', dependencies)
    .component('appContent', appContentComponent)
    .component('appHeader', appHeaderComponent)
    .component('appFooter', appFooterComponent);
