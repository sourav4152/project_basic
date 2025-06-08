const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const backmove = document.querySelector(".wrapper");
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    newGameBtn.classList.remove("active");
    backmove.classList.remove("winner");

    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
        box.removeEventListener("click", handleClick);
        box.addEventListener("click", () => handleClick(index), { once: true });
    });
}

// Handle player click
function handleClick(index) {
    if (gameGrid[index] === "") {
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        checkGameOver();
        if (!checkGameOver()) {
            swapTurns();
        }
    }
}

// Swap turns
function swapTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Check game status
function checkGameOver() {
    for (let position of winningPositions) {
        const [a, b, c] = position;
        if (
            gameGrid[a] &&
            gameGrid[a] === gameGrid[b] &&
            gameGrid[a] === gameGrid[c]
        ) {
            // Winner found
            backmove.classList.add("winner");
            gameInfo.innerText = `Winner Player - ${gameGrid[a]}`;
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");

            boxes.forEach(box => (box.style.pointerEvents = "none"));
            newGameBtn.classList.add("active");
            return true;
        }
    }

    // Check for tie
    if (!gameGrid.includes("")) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
        return true;
    }

    return false;
}

// New Game
newGameBtn.addEventListener("click", initGame);

// Start
initGame();
