
let currentGlobal
const form = document.querySelector('.start-form')
const startButton = document.querySelector('#start-game')
const gameOverDiv =  document.querySelector('.game-over')
const endMessageDiv =  document.querySelector('.end-message')
const restartButton = document.querySelector('#restart-game')


let endDiv = document.createElement('div')

const gameFlow = (() => {
  // Define some variables to track the game state
  let currentPlayer = "X";
  let gameOver = false;
  let player1
  let player2

  const restartGame = () => {
    
    location.reload(true);

  }

  //put currentPlayer into a global variable
  const getCurrentPlayer = () => {
    currentGlobal = currentPlayer
  }

  // Define a function to switch the current player
  const switchPlayer = () => {
    console.log(currentPlayer)
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    currentGlobal = currentPlayer
  };

  const handleClick = () => {
//select all cells
    let cells = document.querySelectorAll(".cell")

    cells.forEach(function(cell){

      cell.addEventListener('click', function listener(){

        cell.removeEventListener('click', listener)
        let row = cell.getAttribute('row')
        let col = cell.getAttribute('col')
        gameFlow.getCurrentPlayer()
        gameBoard.updateBoard(row,col,currentGlobal)
        displayController.updateDisplay(row, col)
        gameFlow.switchPlayer()
        gameFlow.checkGameOver()
        console.log(gameBoard.board)

      })
    })

  };

  const isBoardFull = (board) => {
    // Iterate through all the cells of the board
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        // If any of the cells is empty, return false
        if (board[i][j] === '') {
          return false;
        }
      }
    }
    // If all the cells are filled, return true
    return true;
  }
  


  // Define a function to check if the game is over
  const checkGameOver = () => {
    // Check if a player has won by checking the rows, columns, and diagonals

    let board = gameBoard.board
      // Check rows
    let endMessage = ""


    for (let i = 0; i < board.length; i++) {
      if (board[i][0] !== "" && board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
        // Call the function directly instead of using setTimeout()
        gameOver = true
        if (board[i][0] == "X"){            
          endMessage = player1.name + ' has won by getting three in a row';
          console.log(endMessage, gameOver)
        } else {
          endMessage = player2.name + ' has won by getting three in a row';
          console.log(endMessage, gameOver)
        }
      }
    }
  
    // Check columns
    for (let j = 0; j < board[0].length; j++) {
      if (board[0][j] !== "" && board[0][j] == board[1][j] && board[0][j] == board[2][j]) {
       {
          gameOver = true

          if (board[0][j] == "X"){
            endMessage = player1.name + ' has won by getting three in a column'
          } else {
            endMessage = player2.name + ' has won by getting three in a column'
          }

        };
      }
    }

        // Check diagonals
    if (board[0][0] !== "" && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
      
        gameOver = true

        if (board[0][0] == "X"){
          endMessage = player1.name + ' has won by getting three diagonally';
        } else {
          endMessage = player2.name + ' has won by getting three diagonally';
        }

      }

    if (board[0][2] !== "" && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
      
        gameOver = true
        if (board[0][2] == "X"){
          endMessage =  player1.name + ' has won by getting three diagonally';
        } else {
          endMessage =  player2.name + ' has won by getting three diagonally';
        }
      
    }

    console.log(gameOver)

    if(isBoardFull(board) && !gameOver){
      gameOver = true;
      endMessage = player1.name + " and " + player2.name + " have tied!" 
    }

    if (gameOver){

      gameOverDiv.classList.remove('form-off')
      console.log(endDiv)
      endDiv.innerText = endMessage
      endMessageDiv.append(endDiv)
      
    }

};
    
      
     // No winner
      //  alert("fail");
        
    // If a player has won, set the gameOver flag to true
  

  // Define a function to start a new game
  const startGame = () => {   

    const playerInput1 = document.querySelector('input[name="player1"]')
    const playerInput2 = document.querySelector('input[name="player2"]')

    let player1Name = playerInput1.value
    let player2Name = playerInput2.value

    player1 = gameFlow.createPlayer(player1Name, "X")
    player2 = gameFlow.createPlayer(player2Name, "O")

    if (!player1Name || !player2Name) alert('Names cant be empty');

    currentPlayer = "X";
    gameOver = false;
    // Clear the game board and update the display
    gameBoard.clearBoard()
    gameFlow.handleClick()
    form.classList.add('form-off')
  };

  const createPlayer = (name, symbol) => {
    return {
      name: name,
      symbol: symbol,
      score: 0,
    };
  }



  // Return an object containing the functions that should be accessible from outside the module
  return {
    switchPlayer,
    checkGameOver,
    startGame,
    getCurrentPlayer,
    handleClick,
    createPlayer,
    isBoardFull, 
    restartGame
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

    // Update the game board with the latest values

    let element
    
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < gameBoard.board[i].length; j++) {
        
        if (gameBoard.board[i][j] === "X"){
          element = document.querySelector('[col="' + col + '"][row="' + row + '"]');
          element.innerHTML = currentGlobal
        };

      }
    }

  };

  // Return an object containing the functions that should be accessible from outside the module
  return {
    updateDisplay,
  };



})()


//gameboard event listener

function listenGrid(){

  let cells = document.querySelectorAll(".cell")

    cells.forEach(function(cell){

      cell.addEventListener('click', function listener(){

        gameFlow.handleClick()
        
        

      })
    })

}

startButton.addEventListener('click', function(event){
  event.preventDefault()
  gameFlow.startGame()
})


restartButton.addEventListener('click', function(e){
  e.preventDefault()
  gameFlow.restartGame()
  
})