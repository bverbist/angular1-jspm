import appFooterTemplate from './app-footer.html!text';

class FooterController {
    constructor() {}

    getCurrentDate() {
        return new Date();
    }

    getYear() {
        return this.getCurrentDate().getFullYear();
    }

    getCompany() {
        return 'bverbist';
    }
}

export default {
    bindings: {},
    controller: FooterController,
    controllerAs: 'footer',
    template: appFooterTemplate
};
