import memoryGameTemplate from './memory-game-template.html!text';
import _ from 'lodash';

const NO_ERROR_MESSAGE = '';

const toMemoryCard = image => {
    return {
        url: image.url
    };
};

const getMemoryCards = images => {
    let memCards = [];
    for (let image of images) {
        memCards.push(toMemoryCard(image));
        memCards.push(toMemoryCard(image));
    }
    return _.shuffle(memCards);
};

class MemoryGameController {
    constructor(settings, randomImage) {
        this.settings = settings;
        this.randomImage = randomImage;

        this.queryPossibilities = settings.MEMORY_QUERY_POSSIBILITIES;
        this.query = this.queryPossibilities[0];
        this.nrOfMemoryPairs = settings.DEFAULT_NR_OF_MEMORY_PAIRS;
        this.nrOfMemoryPairsPossibilities = settings.NR_OF_MEMORY_PAIRS_POSSIBILITIES;
        this.images;
        this.memoryCards;
        this.errorMessage = NO_ERROR_MESSAGE;

        this.getRandomImages();
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

    getRandomImages() {
        let _this = this;
        this.randomImage.getRandomImages(this.query, this.nrOfMemoryPairs)
            .then(images => {
                _this.images = images;

                _this.clearErrorMessage();

                _this.memoryCards = getMemoryCards(_this.images);
            })
            .catch(response => {
                _this.errorMessage = 'Unexpected error: ' + response.statusText + ' [' + response.status + ']';
            });
    }

    restartGame() {
        this.getRandomImages();
    }
}

MemoryGameController.$inject = ['settings', 'randomImage'];

export default {
    bindings: {},
    controller: MemoryGameController,
    template: memoryGameTemplate
};
