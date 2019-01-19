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

const createGame = () => {
    //Begins turnCounter at 1 each time a new game is created
    turnCounter = 1

    //Loop to create 9 squares for gameboard
    for (let i = 0; i < 9; i++) {
        const container = document.querySelector("#grid__container")
        container.innerHTML += `<div id="square${i}" class="square"></div>`
    }
}

const checkForWin = () => {
    
}

createGame();

// Create reference to the game spaces
let allSquares = document.getElementsByClassName("square")

// Add a click event listener to each square
for (const square of allSquares) {
    square.addEventListener(
        "click",
        (event) => {
            

            //even turns are player O, and square must be empty
            if (turnCounter % 2 === 0 && square.innerHTML === "") {
                //add letter to the square
                square.innerHTML = `<p class="o">O</p>`
                //add move to collection of moves
                oSquares.push(square)
                //increment to next turn
                turnCounter += 1
                console.log(oSquares)

            //odd turns are player X    
            } else if (turnCounter < 10 && square.innerHTML === "") {
                square.innerHTML = `<p class="x">X</p>`
                turnCounter += 1
            }
        }
    )
}

//Announce the end of the game
if (turnCounter === 9) {
    window.alert("It was a tie!")
}