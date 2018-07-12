var $ = require('jquery');

var MemoryGame = require('./../src/memgame.js')



function start(size) {
    var game = new MemoryGame(size);
    var grid = document.getElementById('game-grid');
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    for (var i = 0; i < size*size; i++) {

        var game_card = document.createElement('div');
        game_card.className = "game-card";
        game_card.style= "background-image: url(../img/" + game.board[i].value +".svg), none;"
        var card  = document.createElement('div');
        if (size == 3) {
            card.className = "five wide column"
            card.id = "game-card-" + i;
        }
        else if (size == 4) {
            card.className = "four wide column"
            card.id = "game-card-" + i;
        }
        

        game_card.innerHTML = game.board[i].value

        card.appendChild(game_card);
        grid.appendChild(card)
    }

}
