// #1 and #2 are repeated until a row of 3 of the same character is created
// When a win happens:
// Alert the players who won
// Disallow any further clicks on the game board
// Display a Play Again button that resets the game
// For a tie:
// Alert players that game has ended in a tie
// Display a Play Again button that resets the game

//Turn Counter to determine which letter to place
let turnCounter = 1

// Create reference to the game spaces
let allSquares = document.getElementsByClassName("square")

// Add a click event listener to each square
for (const square of allSquares) {
    square.addEventListener(
        "click",
        (event) => {
            

            //add a div with a letter inside to the chosen square
            if (turnCounter % 2 === 0 && turnCounter < 10) {
                square.innerHTML = `<p class="o">O</p>`
                turnCounter += 1
            } else if (turnCounter < 10) {
                square.innerHTML = `<p class="x">X</p>`
                turnCounter += 1
            }
        }
    )
}

//Announce the end of the game
if (turnCounter === 10) {
    window.alert("It was a tie!")
}