// Code your JavaScript / jQuery solution here
// current game id

let gameID = 0;
let gameState = ["","","","","","","","",""];
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

});

function attachListeners() {
  $( "#save" ).on( "click", function() {
    console.log( "save" );
  });
  $( "#previous" ).on( "click", function() {
    console.log( "previous" );
  });
  $( "#clear" ).on( "click", function() {
    console.log( "clear" );
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