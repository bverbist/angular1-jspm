import mainLayoutTemplate from './layout/main-layout.html!text';
import gameTemplate from './game/game.html!text';

function configureRouter($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/game');

    $stateProvider
        .state('main', {
            abstract: true,
            template: mainLayoutTemplate
        })

        .state('main.game', {
            url: '/game',
            template: gameTemplate
        })

        .state('main.randomImage', {
            url: '/randomImage',
            template: '<random-img></random-img>'
        });
}

configureRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

export default configureRouter;
