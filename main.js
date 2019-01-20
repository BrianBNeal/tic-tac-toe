/* VARIABLES ======================================================================
=================================================================================== */

let turnCounter = 0
const headline = document.querySelector("h1")
let gameOver = false
const playerOne = players[0]
const playerTwo = players[1]
let whoseTurnIsIt = ""
let xPlayer = ""
let oPlayer = ""
let gameWinner = ""


/* FUNCTIONS ========================================================================
===================================================================================== */


//Ask for player names ==============================================================
const namePlayers = () => {
    let askForFirstPlayer = prompt("First Player's Name:", "Player One")
    let askForSecondPlayer = prompt("Second Player's Name:", "Player Two")
    playerOne.name = askForFirstPlayer
    playerTwo.name = askForSecondPlayer
}

//Function to generate the game board ===============================================
const createGame = () => {

    makeGrid()
    promptForLetter()
    showScore()
    turnCounter = 1
    showTurn()
    takeTurns()
}

// Loop to make the grid for the game ===================================================
const makeGrid = () => {
    const playArea = document.querySelector("#grid__container")
    for (let i = 0; i < 9; i++) {
        playArea.innerHTML += `<div id="square${i}" class="square"></div>`
    }
}

//Updates the score at top of screen ===============================================
const showScore = () => {
    const scoreDisplay = document.querySelector("#score__display")
    scoreDisplay.innerHTML = `${playerOne.name}: ${playerOne.score} - ${playerTwo.name}: ${playerTwo.score}`
}

//Assign letters to each player ====================================================
const promptForLetter = () => {
    let assignLetters = prompt(`${playerOne.name}, do you want to be X or O?`)
    if (assignLetters.toUpperCase() === "X") {
        playerOne.letter = "X"
        xPlayer = playerOne
        playerTwo.letter = "O"
        oPlayer = playerTwo
    } else if (assignLetters.toUpperCase() === "O") {
        playerOne.letter = "O"
        oPlayer = playerOne
        playerTwo.letter = "X"
        xPlayer = playerTwo
    } else {
        promptForLetter()
    }
    whoseTurnIsIt = xPlayer
}

//Updates the turn at top of screen ===============================================
const showTurn = () => {
    const turnDisplay = document.querySelector("#turn__display")
    turnDisplay.textContent = `${whoseTurnIsIt.name}'s Turn`
    turnDisplay.classList = `${whoseTurnIsIt.letter}`
}

// Take turns adding letters to the game board ========================================
const takeTurns = () => {


    // Create reference to the game squares and add event listener to each
    let allSquares = document.getElementsByClassName("square")
    for (let i = 0; i < allSquares.length; i++) {
        let square = allSquares[i]
        square.addEventListener(
            "click",
            event => {

                //if the game isn't over and you target an empty square a letter appears
                if (gameOver === false && square.innerHTML === "") {
                    square.innerHTML = `<p class=${whoseTurnIsIt.letter}>${whoseTurnIsIt.letter}</p>`
                    whoseTurnIsIt.moves.push(i)
                    checkForWin()
                    turnCounter += 1
                    if (turnCounter % 2 === 0) {
                        whoseTurnIsIt = oPlayer
                    } else {
                        whoseTurnIsIt = xPlayer
                    }
                    showTurn()
                }
            }
        )
    }
}

//function that checks to see if anyone won ==========================================
const checkForWin = () => {
    gameWinner = ""
    /* Loop through win conditions looking to see if anyone has a win */
    for (let i = 0; i < winConditions.length; i++) {
        let win = winConditions[i]
        if (whoseTurnIsIt.moves.includes(win[0]) && whoseTurnIsIt.moves.includes(win[1]) && whoseTurnIsIt.moves.includes(win[2])) {
            gameWinner = whoseTurnIsIt
            gameOver = true
            gameOverAnnouncement()
        } else if (turnCounter > 9) {
            gameWinner = null
            gameOver = true
            gameOverAnnouncement()
        } 
    }
}

// Changes score and announces winner ================================================
const gameOverAnnouncement = () => {
    if (gameWinner === null) {
        headline.textContent = "It was a tie!"
    } else {
        headline.textContent = `${gameWinner.name} won!`
        gameWinner.score += 1
        showScore()
    }
    playAgain()
}

//displays play again button in headline ==================================================
const playAgain = () => {
    const playAgainButton = document.createElement("button")
    playAgainButton.textContent = "Play Again"
    headline.appendChild(playAgainButton)

    //if they click, it will restart the game
    playAgainButton.addEventListener(
        "click",
        (event) => {
            refresh()
            createGame()
        }
    )
}

// resets variables so a new game will progress correctly =================
const refresh = () => {
    const clearGrid = document.querySelector("#grid__container")
    clearGrid.innerHTML = ""
    xPlayer.moves = []
    oPlayer.moves = []
    turnCounter = 0
    gameOver = false
    headline.textContent = "Let's play Tic-Tac-Toe!"
    headline.classList = ""
}


/* PLAY THE GAME ALREADY ================================================================
========================================================================================= */

namePlayers()
createGame()
