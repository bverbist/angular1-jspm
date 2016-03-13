import MemoryCard from './memory-card';
import _ from 'lodash';

const INTERVAL_SECOND_IN_MILLIS = 1000;
const NO_LAST_TURNED_CARD_INFO = {};
let cardId = 0;

const toMemoryCard = image => {
    cardId++;
    return new MemoryCard(cardId, image);
};

const getCardDuplicatesOf = (image, duplicationNr) => {
    let cardDuplicatesOfImage = [];
    for (let i = 0; i < duplicationNr; i++) {
        cardDuplicatesOfImage.push(toMemoryCard(image));
    }
    return cardDuplicatesOfImage;
};

const getMemoryCards = (images, duplicationNr) => {
    let memCards = [];
    for (let image of images) {
        memCards = _.concat(memCards, getCardDuplicatesOf(image, duplicationNr));
    }
    return _.shuffle(memCards);
};

const isTurnedAndNotMatched = card => card.isTurnedAndNotMatched();
const isMatched = card => card.isMatched();

class MemoryGame {
    constructor(images, duplicationNr, $timeout, timeoutWronglyMatchedCardsShownInMillis, $interval) {
        this.memoryCards = getMemoryCards(images, duplicationNr);
        this.duplicationNr = duplicationNr;
        this.$timeout = $timeout;
        this.timeoutWronglyMatchedCardsShownInMillis = timeoutWronglyMatchedCardsShownInMillis;
        this.$interval = $interval;

        this.lastTurnedCardInfo = NO_LAST_TURNED_CARD_INFO;

        this.started = false;
    }

    startGameIfNotStartedYet() {
        if (this.started) {
            return;
        }

        this.started = true;

        this.duration = 0;

        this.timerPromise = this.$interval(() => this.duration++, INTERVAL_SECOND_IN_MILLIS);
    }

    getTurnedCards() {
        return _.filter(this.memoryCards, isTurnedAndNotMatched);
    }

    getMatchedCards() {
        return _.filter(this.memoryCards, isMatched);
    }

    getNrOfMatchedPairs() {
        return this.getMatchedCards().length / this.duplicationNr;
    }

    getNrOfTotalPairs() {
        return this.memoryCards.length / this.duplicationNr;
    }

    isMaxNrOfCardsTurned() {
        return this.getTurnedCards().length === this.duplicationNr;
    }

    isSolved() {
        return this.getNrOfMatchedPairs() === this.getNrOfTotalPairs();
    }

    matchTurnedCards() {
        if (!this.isMaxNrOfCardsTurned()) {
            return;
        }

        let turnedCards = this.getTurnedCards();

        if (_.uniqBy(turnedCards, 'imageUrl').length > 1) {
            this.$timeout(() => {
                turnedCards.forEach(card => card.turnBack());
                this.lastTurnedCardInfo = NO_LAST_TURNED_CARD_INFO;
            }, this.timeoutWronglyMatchedCardsShownInMillis);
        } else {
            turnedCards.forEach(card => card.setMatched());

            if (this.isSolved()) {
                this.$interval.cancel(this.timerPromise);
            }
        }
    }

    turnCard(cardIndex) {
        this.startGameIfNotStartedYet();

        if (this.isMaxNrOfCardsTurned()) {
            return;
        }

        this.memoryCards[cardIndex].turn();

        this.lastTurnedCardInfo = this.memoryCards[cardIndex];

        this.matchTurnedCards();
    }

    getProgress() {
        return this.getNrOfMatchedPairs() + ' / ' + this.getNrOfTotalPairs();
    }
}

export default MemoryGame;
