// Reference to the class that will append the X to the screen when needed
const xClass = "x";

// Reference to the class that will append the O to the screen when needed
const circleClass = "circle";

const allWinCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const allCells = document.querySelectorAll("[data-cell]");

const board = document.querySelector("#board");

const winMessageTextDiv = document.querySelector("#winMessage");

const winMessageText = document.querySelector("[data-winMessageText]");

const restartBtn = document.querySelector("#restartBtn");

// Flag variable
let isCircleTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
  isCircleTurn = false;
  allCells.forEach((cell) => {
    // Removing the classes at the start
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener("click", handleClick);

    // Adding the click event once for each cell
    cell.addEventListener("click", handleClick, { once: true });
  });
  setHoverEffect();
  winMessageTextDiv.classList.remove("show");
}

function handleClick(ev) {
  const cell = ev.target;

  // Tracking whose turn it is
  const currentClass = isCircleTurn ? circleClass : xClass;

  displayMark(cell, currentClass);

  if (checkWin(currentClass)) {
    //If one of the classes is present in any of the winning combinations of cells, it's a win for it
    endGame(false); // The draw parameter is false
  } else if (isDraw()) {
    endGame(true);
  } else {
    // If it's not a win nor a draw, switch the turn to the other player and initiate the hover effect
    switchTurns();
    setHoverEffect();
  }
}

// Set a message for a draw or a win of either side
function endGame(draw) {
  if (draw) {
    winMessageText.innerText = "It's a Draw";
  } else {
    winMessageText.innerText = `${isCircleTurn ? "O's" : "X's"} Wins!`;
  }
  // Display the message of the result
  winMessageTextDiv.classList.add("show");
}

// If every cell has either an X or an O it's a draw
function isDraw() {
  return [...allCells].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    );
  });
}

// Display the current turn's element
function displayMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Reverse the value of the flag when the turn is changed
function switchTurns() {
  isCircleTurn = !isCircleTurn;
}

function setHoverEffect() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);

  // If the flag is true, add the circle
  if (isCircleTurn) {
    board.classList.add(circleClass);
  } else {
    // Otherwise add the X
    board.classList.add(xClass);
  }
}

// If some of the winning combinations has all three cells filled by the same class, it's a win for it
function checkWin(currentClass) {
  return allWinCombinations.some((combo) => {
    return combo.every((index) => {
      return allCells[index].classList.contains(currentClass);
    });
  });
}
