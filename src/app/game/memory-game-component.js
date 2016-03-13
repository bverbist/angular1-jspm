import memoryGameTemplate from './memory-game-template.html!text';
import MemoryGame from './memory-game';

const NO_ERROR_MESSAGE = '';

class MemoryGameController {
    constructor(settings, randomImage, $timeout, $interval, $window) {
        this.settings = settings;
        this.randomImage = randomImage;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.localStorage = $window.localStorage;

        this.errorMessage = NO_ERROR_MESSAGE;

        this.queryPossibilities = settings.MEMORY_QUERY_POSSIBILITIES;
        this.query = this.queryPossibilities[0];
        this.nrOfMemoryPairs = settings.DEFAULT_NR_OF_MEMORY_PAIRS;
        this.nrOfMemoryPairsPossibilities = settings.NR_OF_MEMORY_PAIRS_POSSIBILITIES;
        this.nrOfMemorycardDuplicates = settings.DEFAULT_NR_OF_MEMORYCARD_DUPLICATES;
        this.nrOfMemorycardDuplicatesPossibilities = settings.NR_OF_MEMORYCARD_DUPLICATES_POSSIBILITIES;

        this.cardWidth = 200;
        this.cardHeight = 162;

        this.initMemoryGame();
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

    initMemoryGame() {
        let _this = this;
        this.randomImage.getRandomImages(this.query, this.nrOfMemoryPairs)
            .then(images => {
                _this.clearErrorMessage();

                _this.memoryGame = new MemoryGame(
                    images,
                    _this.nrOfMemorycardDuplicates,
                    _this.$timeout,
                    _this.settings.TIMEOUT_WRONGLY_MATCHED_CARDS_SHOWN_IN_MILLIS,
                    _this.$interval,
                    _this.localStorage
                );
            })
            .catch(response => {
                _this.errorMessage = 'Unexpected error: ' + response.statusText + ' [' + response.status + ']';
            });
    }

    restartGame() {
        this.initMemoryGame();
    }
}

MemoryGameController.$inject = ['settings', 'randomImage', '$timeout', '$interval', '$window'];

export default {
    bindings: {},
    controller: MemoryGameController,
    template: memoryGameTemplate
};
