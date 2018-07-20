var MemoryGame = require('./../src/memgame.js')


function start(size) {
    const game = new MemoryGame(size);

    game.flip_callback = id => {
        document.getElementById('game-card-' + id)
            .style = "background-image : none; background-color : green;";
    };
    game.unflip_callback = id => {
        document.getElementById('game-card-' + id)
            .style = "background-image: url(../img/" + game.board[id].value + ".svg), background-color  : none;"
    };


    var grid = document.getElementById('game-grid');
    var nav = document.getElementById('nav');
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
    }
    for (var i = 0; i < size * size; i++) {

        var game_card = document.createElement('div');
        game_card.className = "game-card";
        game_card.id = "game-card-" + i;
        game_card.style = "background-image: url(../img/" + game.board[i].value + ".svg);"
        game_card.addEventListener('click', function (event) {

            var regex = /game-card-(\d+)/g;

            var card_id = regex.exec(this.id)[1];

            console.log("tentando flippar " + card_id);

            if (game.flip_card(card_id)) {
                console.log("Flippou!!");
            } else {
                console.log("deu ruim!");
            }

            console.log("ganhou? " + game.won());
        })

        var card = document.createElement('div');
        if (size == 3) {
            card.className = "five wide column"
            card.id = "game-card-" + i;
        } else if (size == 4) {
            card.className = "four wide column"
            card.id = "game-card-" + i;
        }


        game_game_card.id = "game-card-" + i;
        card.innerHTML = game.board[i].value

        card.appendChild(game_card);
        grid.appendChild(card)
    }


}