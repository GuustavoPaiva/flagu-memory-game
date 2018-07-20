module.exports = function MemoryGame(size) {

    this.size = size;
    this.total_cards = this.size * this.size / 2;
    this.board = new Array(this.size * this.size);

    for (var i = 0; i < this.board.length; i++) {
        this.board[i] = {
            value: Math.floor(i / 2) + 1,
            flipped: false,
        };
    }
    this.board.sort(() => Math.random() - 0.5);
    this.board.forEach((card, pos) => card.id = pos);
    this.points = 0;


    this.flip_card = function (x) {
        var card = this.board[x];
        var succeeded = true;

        if (this.last_card == null) {
            //There is no card flipped, flip it and save it.
            this.last_card = card;
            this.flip(card);
        } else {
            if (card.flipped == true) {
                //The same card was flipped, unflip it.
                succeeded = false;
            } else if (this.last_card.value == card.value) {
                //The flipped card and the last one has the same value, yay.
                this.flip(card);
                this.points++;
            } else {
                //The flipped card and the last one has different values, buu.
                this.unflip(card);
                this.unflip(this.last_card);
                succeeded = false;
            }
            this.last_card = null;
        }
        return succeeded;
    }

    this.flip = function (card) {
        card.flipped = true;
        this.flip_callback(card.id);
    }

    this.unflip = function (card) {
        card.flipped = false;
        this.unflip_callback(card.id);
    }

    this.flip_callback = function (id) {
        console.log("flipped " + id);
    }

    this.unflip_callback = function (id) {
        console.log("unflipped " + id);
    }

    this.won = function () {
        return this.total_cards == this.points;
    }
}