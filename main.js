let turnCounter = 0
let whoseTurnIsIt = null
const headline = document.querySelector("h1")
let gameOver = false

//declare function to generate the game board
const createGame = () => {

    //reset turnCounter, content of squares, and headline, show the score and turn number at top
    turnCounter = 1
    headline.textContent = "Let's play Tic-Tac-Toe!"
    headline.classList = ""
    showScore()
    
    //Loop to create 9 squares for gameboard
    const playArea = document.querySelector("#grid__container")
    for (let i = 0; i < 9; i++) {
        playArea.innerHTML += `<div id="square${i}" class="square"></div>`
    }
    promptForLetter()
    showTurn()
}

//function that updates the turn at top of screen
const showTurn = () => {
    const turnDisplay = document.querySelector("#turn__display")
    turnDisplay.textContent = `${whoseTurnIsIt.name}'s Turn`
}

//function that updates the score at top of screen
const showScore = () => {
    const scoreDisplay = document.querySelector("#score__display")
    scoreDisplay.innerHTML = `Score: ${playerOne.score} - ${playerTwo.score}`
}

//Ask for player names
const namePlayers = () => {
    let askForFirstPlayer = prompt("First player's name:", "Player One")
    let askForSecondPlayer = prompt("Second player's name:", "Player Two")
    playerOne.name = askForFirstPlayer
    playerTwo.name = askForSecondPlayer
    
}

//Assign letters to each player
const promptForLetter = () => {
    let assignLetters = prompt(`${playerOne.name}, do you want to be X or O?`)
    if (assignLetters.toUpperCase() === "X") {
        playerOne.letter = "X"
        playerTwo.letter = "O"
        whoseTurnIsIt = playerOne
    } else if (assignLetters.toUpperCase() === "O") {
        playerOne.letter = "O"
        playerTwo.letter = "X"
        whoseTurnIsIt = playerTwo
    } else {
        promptForLetter()
    }
}

//function that checks to see if anyone won
const checkForWin = () => {
    let gameResult = null

    /* Loop through win conditions looking to see if anyone has a win */
    for (let i = 0; i < winConditions.length; i++) {
        let condition = winConditions[i]
        if (whoseTurnIsIt.moves.includes(condition[0]) && whoseTurnIsIt.moves.includes(condition[1]) && whoseTurnIsIt.moves.includes(condition[2])) {
            gameWinner = whoseTurnIsIt
            gameOver = true
            gameOverAnnouncement()
        } else if (turnCounter > 9) {
            gameWinner = null
            gameOver = true
            turnCounter = 9 /* so that the turn counter will show the last turn number */
            gameOverAnnouncement()

        }
    }

    // when the game is over it asks if you'd like to play again
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
    playAgainButton.textContent = "Play Again"
    headline.appendChild(playAgainButton)

    //if they click it will restart the game
    playAgainButton.addEventListener(
        "click",
        (event) => {
            //reset squares to have no content
            let squaresToReset = document.querySelectorAll(".square")
            squaresToReset.forEach(square => {
                square.innerHTML = ""
            });

            gameOver = false

            //refresh grid and moves
            xSquares = []
            oSquares = []
            createGame()
        }
    )
}

namePlayers()
createGame()

// Create reference to the game squares and add event listener
let allSquares = document.getElementsByClassName("square")
for (let i = 0; i < allSquares.length; i++) {
    let square = allSquares[i]
    square.addEventListener(
        "click",
        (event) => {

            //if gameOver is true letters can't be added
            if (gameOver === false) {
                //odd turns are X, even turns are O
                if (turnCounter % 2 === 0) {
                    whoseTurnIsIt = "O"
                } else {
                    whoseTurnIsIt = "X"
                }

                //a square can only be targeted if it's empty
                if (square.innerHTML === "") {
                    square.innerHTML = `<p class=${whoseTurnIsIt}>${whoseTurnIsIt}</p>`
                    pushChoice(i)
                    turnCounter += 1
                    showTurn()
                    checkForWin()
                    console.log(xSquares)
                }
            }
        }
    )
}

//Announce the end of the game
if (turnCounter === 9) {
    window.alert("It was a tie!")
}