module.exports = class MemoryGame {
    constructor(size) {
        this.size = size;

        this.total_cards = this.size * this.size / 2;
        this.board = new Array(this.size * this.size);

        for (var i = 0; i < this.board.length; i++) {
            this.board[i] = {
                value: Math.floor(i / 2) + 1,
                flipped: false
            };
        }
        this.board.sort(() => Math.random() - 0.5);
        this.board.forEach((card, pos) => card.id = pos);
        this.points = 0;
    }

    flip_card(x) {
        var card = this.board[x];
        var succeeded = true;

        if (this.last_card == null) {
            //There is no card flipped, flip it and save it.
            this.last_card = card;
            card.flipped = true;
        } else {
            if (card.flipped == true) {
                //The same card was flipped, unflip it.
                succeeded = false;
            } else if (this.last_card.value == card.value) {
                //The flipped card and the last one has the same value, yay.
                card.flipped = true;
                this.points++;
            } else {
                //The flipped card and the last one has different values, buu.
                card.flipped = false;
                this.last_card.flipped = false;
                succeeded = false;
            }
            this.last_card = null;
        }
        return succeeded;
    }

    won() {
        return this.total_cards == this.points;
    }
}
