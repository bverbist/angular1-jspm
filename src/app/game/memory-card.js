class MemoryCard {
    constructor(id, image) {
        this.id = id;
        this.imageUrl = image.url;
        this.imageTitle = image.title;
        this.imageDescription = image.description;

        this.turned = false;
        this.matched = false;
    }

    isTurned() {
        return this.turned;
    }

    isMatched() {
        return this.matched;
    }

    isTurnedAndNotMatched() {
        return this.isTurned() && !this.isMatched();
    }

    setMatched() {
        this.matched = true;
    }

    turn() {
        if (this.isTurned()) {
            return;
        }

        this.turned = true;
    }

    turnBack() {
        this.turned = false;
    }
}

export default MemoryCard;
