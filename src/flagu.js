
var $ = require('jquery');

var MemoryGame = require('./../src/memgame.js')

var game = new MemoryGame(4);

$(document).ready(function() {
    var grid = document.getElementById('game-grid')
    for (var i = 0; i < 16; i++) {

        var game_card = document.createElement('div');
        game_card.className = "game-card";
        game_card.style= "background-image: url(../img/" + game.board[i].value +".svg), none;"
        var card  = document.createElement('div');
        card.className = "four wide column"
        card.id = "game-card-" + i;

        game_card.innerHTML = game.board[i].value

        card.appendChild(game_card);
        grid.appendChild(card)
    }

});
