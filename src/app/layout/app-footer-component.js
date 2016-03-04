class FooterController {
    constructor() {}

    getAuthor() {
        return 'bverbist';
    }
}

export default {
    bindings: {},
    controller: FooterController,
    controllerAs: 'footer',
    template: [
        '<div class="codedBy">',
        '--- coded by <span class="author">{{footer.getAuthor()}} ---</span>',
        '</div>'
    ].join('')
};
