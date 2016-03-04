export default {
    bindings: {
        appTitle: '@',
        emphasysTitle: '@'
    },
    template: [
        '<h1 class="appTitle"><span>{{$ctrl.appTitle}}</span> - <span class="emphasys">{{$ctrl.emphasysTitle}}</span></h1>'
    ].join('')
};
