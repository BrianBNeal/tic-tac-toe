// #1 and #2 are repeated until a row of 3 of the same character is created
/* Array of all win conditions. Array of all O moves.  Array of all X moves.  Loop at end of each turn to compare moves with win conditions.  Length of X moves array is 5 and there is no win, then it's a draw. */

// When a win happens:
// Alert the players who won
// Disallow any further clicks on the game board
// Display a Play Again button that resets the game
// For a tie:
// Alert players that game has ended in a tie
// Display a Play Again button that resets the game

let turnCounter = 0
let xScore = 0
let oScore = 0
//declare function to generate the game board
const createGame = () => {
    //Begins turnCounter at 1 each time a new game is created
    turnCounter = 1

    //define where the play area, turn, and score are each displayed
    const playArea = document.querySelector("#grid__container")
    
    //show score and turn number
    showScore()
    showTurn()
    //Loop to create 9 squares for gameboard
    for (let i = 0; i < 9; i++) {
        playArea.innerHTML += `<div id="square${i}" class="square"></div>`
    }
}

const showTurn = () => {
    let turnDisplay = document.querySelector("#turn__display")
    turnDisplay.textContent = `Turn ${turnCounter}`
}

const showScore = () => {
    let scoreDisplay = document.querySelector("#score__display")
    scoreDisplay.innerHTML = `Score: ${xScore} - ${oScore}`
}


const checkForWin = () => {
    let whoWon = null
    oSquares.sort()
    xSquares.sort()
    for (const condition of winConditions) {
        if (condition.join() === oSquares.join()) {
            whoWon = "O Wins!"
            oScore += 1
        } else if (condition.join() === xSquares.join()) {
            whoWon = "X wins!";
            xScore += 1
        } else if (turnCounter === 9 && whoWon === null) {
            whoWon = "It was tie!"
        }
    }
    if (whoWon !== null) {
    window.alert(whoWon)
    }
}

//generate the game board
createGame();

// Create reference to the game squares
let allSquares = document.getElementsByClassName("square")


// Add a click event listener to each square
for (let i = 0; i < allSquares.length; i++) {
    let square = allSquares[i]
    square.addEventListener(
        "click",
        (event) => {
            
    
            //even turns are player O, and square must be empty
            if (turnCounter % 2 === 0 && square.innerHTML === "") {
                //add letter to the square
                square.innerHTML = `<p class="o">O</p>`
                //add move to collection of moves
                oSquares.push(i)
                //increment to next turn
                turnCounter += 1
                showTurn()
                checkForWin()
    
            //odd turns are player X    
            } else if (turnCounter < 10 && square.innerHTML === "") {
                square.innerHTML = `<p class="x">X</p>`
                turnCounter += 1
                showTurn()
                checkForWin()
            }
        }
    )
}

//Announce the end of the game
if (turnCounter === 9) {
    window.alert("It was a tie!")
}