
let currentGlobal


const gameFlow = (() => {
  // Define some variables to track the game state
  let currentPlayer = "X";
  let gameOver = false;

  //put currentPlayer into a global variable
  const getCurrentPlayer = () => {
    currentGlobal = currentPlayer
  }

  // Define a function to switch the current player
  const switchPlayer = () => {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
  };

  // Define a function to check if the game is over
  const checkGameOver = () => {
    // Check if a player has won by checking the rows, columns, and diagonals
    // If a player has won, set the gameOver flag to true
  };

  // Define a function to start a new game
  const startGame = () => {
    currentPlayer = "X";
    gameOver = false;
    // Clear the game board and update the display
    gameBoard.clearBoard()
  };


  // Return an object containing the functions that should be accessible from outside the module
  return {
    switchPlayer,
    checkGameOver,
    startGame,
    getCurrentPlayer
  };
})();


const gameBoard = (() => {
  // Define an array to represent the game board
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  // Define a function to update the game board
  const updateBoard = (row, col, value) => {
    board[row][col] = value;
  };

  // Define a function to clear the game board
  const clearBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
  };

  // Return an object containing the functions that should be accessible from outside the module
  return {
    updateBoard,
    clearBoard,
    board
  };
})();



const displayController = (()=>{

  // Define a function to update the display with the current game state
  const updateDisplay = (row, col) => {
    // Clear the game board
    gameBoard.clearBoard();
    
    // Update the game board with the latest values
    let element
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < gameBoard.board[i].length; j++) {
        if (gameBoard.board[i][j] = "X"){
          element = document.querySelector('[col="' + col + '"][row="' + row + '"]');
          element.innerHTML = "X"
        };
      }
    }

    // Loop through the rows, columns, and cells and update the display
    // with the current player's symbol (X or O)

    // Check if the game is over, and if so, display a message
    // indicating which player has won or if it's a tie
  };

  // Return an object containing the functions that should be accessible from outside the module
  return {
    updateDisplay
  };



})()







function createPlayer(name, symbol) {
    return {
      name: name,
      symbol: symbol,
      score: 0,
    };
  }

const player1 = createPlayer("Alice", "X");
const player2 = createPlayer("Bob", "O");





//gameboard event listener

function listenGrid(){

  let cells = document.querySelectorAll(".cell")

    cells.forEach(function(cell){
      cell.addEventListener('click', function(){

        let row = cell.getAttribute('row')
        let col = cell.getAttribute('col')

        console.log(row, col)
        gameFlow.getCurrentPlayer()
        gameBoard.updateBoard(row,col,currentGlobal)
        gameFlow.switchPlayer()
        displayController.updateDisplay(row, col)
        console.log(gameBoard.board)

      })
    })

}

gameFlow.startGame()

listenGrid()