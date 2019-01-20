let turnCounter = 0
let whoseTurnIsIt = ""
let xScore = 0
let oScore = 0
const headline = document.querySelector("h1")
let gameOver = false

//declare function to generate the game board
const createGame = () => {
    
    //reset turnCounter and headline, show the score and turn number at top
    turnCounter = 1
    headline.textContent = "Let's play Tic-Tac-Toe!"
    headline.classList = ""
    showScore()
    showTurn()
    
    //Loop to create 9 squares for gameboard
    const playArea = document.querySelector("#grid__container")
    for (let i = 0; i < 9; i++) {
        playArea.innerHTML += `<div id="square${i}" class="square"></div>`
    }
}

//function that updates the turn at top of screen
const showTurn = () => {
    const turnDisplay = document.querySelector("#turn__display")
    turnDisplay.textContent = `Turn ${turnCounter}`
}

//function that updates the score at top of screen
const showScore = () => {
    const scoreDisplay = document.querySelector("#score__display")
    scoreDisplay.innerHTML = `Score: ${xScore} - ${oScore}`
}

//function that checks to see if anyone won
const checkForWin = () => {
    let gameResult = null
    oSquares.sort()
    xSquares.sort()
    for (const condition of winConditions) {
        if (oSquares.join().includes(condition.join())) {
            gameResult = "O Wins!"
            gameOver = true
            oScore += 1
        } else if (xSquares.join().includes(condition.join())) {
            gameResult = "X wins!";
            gameOver = true
            xScore += 1
        } else if (turnCounter > 9) {
            gameResult = "It was tie!"
            gameOver = true
            turnCounter = 9 /* so that the turn counter will show the last turn number */
            showTurn()
        }
    }
    if (gameOver === true) {
        headline.textContent = gameResult
        playAgain()
        showScore()
    }
}

const pushChoice = (idx) => {
    if (whoseTurnIsIt === "X") {
        xSquares.push(idx)
    } else if (whoseTurnIsIt === "O") {
        oSquares.push(idx)
    }
}

//displays play again button in headline
const playAgain = () => {
    const playAgainButton = document.createElement("button")
}

createGame();

// Create reference to the game squares
let allSquares = document.getElementsByClassName("square")

// Add a click event listener to each square
for (let i = 0; i < allSquares.length; i++) {
    let square = allSquares[i]
    square.addEventListener(
        "click",
        (event) => {

            if (gameOver === false) {
                //odd turns are X, even turns are O
                if (turnCounter % 2 === 0) {
                    whoseTurnIsIt = "O"
                } else {
                    whoseTurnIsIt = "X"
                }

                //a square can only be targeted if it's empty, game end detected after 9 turns
                if (square.innerHTML === "") {
                    square.innerHTML = `<p class=${whoseTurnIsIt}>${whoseTurnIsIt}</p>`
                    turnCounter += 1
                    pushChoice(i)
                    showTurn()
                    checkForWin()
                }
            }
        }
    )
}

//Announce the end of the game
if (turnCounter === 9) {
    window.alert("It was a tie!")
}