var assert = require('assert');

var MemoryGame = require('./../src/memgame.js')

describe('Flip a card', function() {
    it('should return true of the flipped card', function() {
        var game = new MemoryGame(16);
        assert.ok(game.flip_card(1));
        assert.ok(game.board[1].flipped);
        assert.equal(false, game.won());
    });
});

describe('Flip two cards with same value', function() {
    it('should return true of the flipped card and both cards flipped', function() {
        var game = new MemoryGame(16);

        var cards_with_value_three = game.board.filter(card => card.value == 3);
        cards_with_value_three.forEach(card =>
            assert.ok(game.flip_card(card.id)));

        cards_with_value_three.forEach(card =>
            assert.ok(game.board[card.id].flipped));
        assert.equal(false, game.won());

    });
});

describe('Flip two cards with different value', function() {
    it('should return true of the flipped card and both cards flipped', function() {
        var game = new MemoryGame(16);

        var card_three = game.board.filter(card => card.value == 3)[1];
        var card_four = game.board.filter(card => card.value == 4)[1];
        assert.ok(game.flip_card(card_three.id));
        assert.equal(false, game.flip_card(card_four.id));

        assert.equal(false, game.board[card_three.id].flipped);
        assert.equal(false, game.board[card_four.id].flipped);
        assert.equal(false, game.won());

    });
});

describe('Flip the same  cards twice', function() {
    it('should return true for the first time, false for the second and remain flipped', function() {
        var game = new MemoryGame(16);

        assert.ok(game.flip_card(17));
        assert.equal(false, game.flip_card(17))

        assert.ok(game.board[17].flipped);
        assert.equal(false, game.won());

    });
});


describe('Win the game!', function() {
    it('should return true always and every card should be flipped.', function() {
        var game = new MemoryGame(16);

        grouped_cards = game.board.reduce(function(result, card) {
            result[card.value] = result[card.value] || [];
            result[card.value].push(card);
            return result;
        }, {});

        assert.equal(false, game.won());

        for (var idx in grouped_cards) {
            grouped_cards[idx].forEach(card => {
                assert.ok(game.flip_card(card.id));
            });
        }
        assert.ok(game.won());

        game.board.forEach(card => assert.ok(card.flipped))
    });
});
