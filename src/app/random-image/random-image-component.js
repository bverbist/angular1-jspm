import randomImageTemplate from './random-image.html!text';

const NO_ERROR_MESSAGE = '';
const DEFAULT_QUERY = 'auto';

class RandomImageController {
    constructor(settings, randomImage, $scope) {
        this.settings = settings;
        this.randomImage = randomImage;
        this.$scope = $scope;

        this.query = DEFAULT_QUERY;
        this.image;
        this.errorMessage = NO_ERROR_MESSAGE;

        this.getRandomImage();
    }

    isErrorMessage() {
        return this.errorMessage !== NO_ERROR_MESSAGE;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    clearErrorMessage() {
        this.errorMessage = NO_ERROR_MESSAGE;
    }

    getRandomImage() {
        let _this = this;
        this.randomImage.getRandomImage(this.query)
            .then(image => {
                _this.image = image;

                _this.clearErrorMessage();

                _this.$scope.$apply();
            })
            .catch(response => {
                _this.errorMessage = 'Unexpected error: ' + response.statusText + ' [' + response.status + ']';
                _this.$scope.$apply();
            });
    }

    refreshImage() {
        this.getRandomImage();
    }
}

RandomImageController.$inject = ['settings', 'randomImage', '$scope'];

export default {
    bindings: {},
    controller: RandomImageController,
    controllerAs: 'randonImg',
    template: randomImageTemplate
};
