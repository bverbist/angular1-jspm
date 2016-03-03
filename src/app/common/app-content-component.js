export default {
    bindings: {
        appTitle: '@',
        emphasysTitle: '@'
    },
    template: [
        '<div>',
        '<h1 class="appTitle"><span>{{$ctrl.appTitle}}</span> - <span class="emphasys">{{$ctrl.emphasysTitle}}</span></h1>',
        '<div class="content" ng-transclude></div>',
        '</div>'
    ].join(''),
    transclude: true
};
