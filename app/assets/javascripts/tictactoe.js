// Code your JavaScript / jQuery solution here
// current game id

let gameID = 0;
let gameState = ["X","","","","X","O","","",""];
let loadGameState = ["X","","","","X","O","","",""];
let turn = 0;

const WIN_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

$(document).ready(function() {
  // code to be executed goes here
  
  //basic listeners
  attachListeners();
  
  //
  //loadGame();

});

function loadGame() {
    turn = 0;
    $( "td" ).each( function(index) {
        let token = loadGameState[index];
        $( this ).text(token);
        if (token !== "") {
            $( this ).addClass("disabled");
            turn++;
        }
    }) 
}

function attachListeners() {
  $( "#save" ).on( "click", function() {
    console.log( "save" );
    saveGame();
  });
  $( "#previous" ).on( "click", function() {
    console.log( "previous" );
    showPreviousGames();
  });
  $( "#clear" ).on( "click", function() {
    //reset global var
    turn = 0;
    gameID = 0;
    $( "td" ).each( function(index) {
        $( this ).text("");
        $( this ).removeClass("disabled");
    })
  });
  
  // add class disable then remove them all when we start the game
  
  $( "td" ).on( "click", function(e) {
    console.log( $(this).attr("data-x") );
    const token = player();
    
        if($(this).hasClass('disabled'))
        {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            $(this).text(token);
            $(this).addClass("disabled");
            turn++;
        }

    //make unclickable
  }); 
}

function player() {
    //return X or O
    if (turn % 2 == 0) {
        return "X"
    }
    else {
        return "O"
    }
}

function updateState() {
    //player
    //insert X or O to board
    //save state?
}

function setMessage(msg) {
    //update #message
}

function checkWinner() {
    //setMessage
    //return true or false
}

function doTurn() {
    //turn++
    //updateState
    //checkWinner
}

function saveGame() {
  const gameData = { 
      state: gameState,
    }
    console.log(gameState);
    console.log(gameData);
    
    //if (currentGame) {
    //$.ajax({
    //  type: 'PATCH',
    //  url: `/games/${currentGame}`,
    //  data: gameData
    //});
    
    
    $.post('/games', gameData, function(game) {
      currentGame = game.data.id;
      //$('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`);
      //$("#gameid-" + game.data.id).on('click', () => reloadGame(game.data.id));
    });

}

function showPreviousGames() {
   let list="";
   $.get('/games', function(game) {
       game.data.forEach( function(e) {
           $('#games').append(`<button id="gameid-${e.id}">${e.id}</button><br>`);
           $("#gameid-" + e.id).on('click', () => reloadGame(e.id));
       })
   })
}

function reloadGame(id) {
    turn = 0;
    $.get('/games/'+id, function(game) {
        console.log(game.data.attributes.state);
        $( "td" ).each( function(index) {
            let token = game.data.attributes.state[index];
            $( this ).text(token);
            if (token !== "") {
                $( this ).addClass("disabled");
                turn++;
            }
        }) 
    })
}

/*
player()
Returns the token of the player whose turn it is, 'X' when the turn variable is even and 'O' when it is odd.
updateState()
Invokes player() and adds the returned string ('X' or 'O') to the clicked square on the game board.
setMessage()
Accepts a string and adds it to the div#message element in the DOM.
checkWinner()
Returns true if the current board contains any winning combinations (three X or O tokens in a row, vertically, horizontally, or diagonally). Otherwise, returns false.
If there is a winning combination on the board, checkWinner() should invoke setMessage(), passing in the appropriate string based on who won: 'Player X Won!' or 'Player O Won!'
doTurn()
Increments the turn variable by 1.
Invokes the updateState() function, passing it the element that was clicked.
Invokes checkWinner() to determine whether the move results in a winning play.
*/