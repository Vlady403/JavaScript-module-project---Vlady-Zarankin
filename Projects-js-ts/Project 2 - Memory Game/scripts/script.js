let amount;

const numbers = [];

let attempts1 = 0;

let attempts2 = 0;

let count = 0;

let timer = 0;

let flagTimer = false;

let flagStartGame = false;

let flagIsComplete = false;

const player1 = document.querySelector("#player1");

const player2 = document.querySelector("#player2");

const inp1 = document.querySelector("#in1");

const inp2 = document.querySelector("#in2");

const inp3 = document.querySelector("#in3");

const inp4 = document.querySelector("#in4");

const inp5 = document.querySelector("#in5");

const game = document.querySelector(".game");

const inpsContainer = document.querySelector("#inpsContainer");

const inps = document.querySelector("#inputs");

const timerDiv = document.querySelector("#timer");

const statsDiv = document.querySelector("#stats");

const restart = document.querySelector("#restart");

const btn = document.querySelector("button");

btn.innerHTML = "Start";

// Function to initiate the creation of the board, including it's appearance and checking the inputs
btn.addEventListener("click", () => {
  checkInput();
  if (flagStartGame) {
    createGame();
  }
});

// Setting the timer using the Date object
let timerInterval = setInterval(() => {
  if (flagTimer) {
    timer++;

    const date = new Date(timer * 1000);

    const m = date.getMinutes();

    const s = date.getSeconds();

    document.querySelector(".timer").innerHTML = `${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
  }
}, 1000);

const board = document.querySelector(".board");

// Creating the board
function createGame() {
  flagTimer = true;

  amount = inp1.value;

  // Assigning the user's input of the columns and the rows to it's respective layout in the board
  board.style.gridTemplateColumns = `repeat(${inp2.value}, 1fr)`;

  board.style.gridTemplateRows = `repeat(${inp3.value}, 1fr)`;

  player1.innerHTML = inp4.value;

  player2.innerHTML = inp5.value;

  // Filling the array with the numbers, twice each
  for (let i = 1; i <= amount; i++) {
    numbers.push(i, i);
  }

  for (let i = 1; i <= amount * 2; i++) {
    // Creating a random number to fill the board with numbers
    const rand = Math.floor(Math.random() * numbers.length);

    const div = document.createElement("div");

    // Filling the board
    div.innerHTML = `<span>${numbers[rand]}</span>`;

    board.appendChild(div);

    // Removing the number from the array to prevent duplication
    numbers.splice(rand, 1);

    // Initiating the display of the numbers by clicking on the squares of the board
    div.addEventListener("click", (ev) => {
      if (ev.target.classList.contains("hidden")) {
        return;
      }

      // Not allowing to show more than 2 numbers at a time
      if (board.querySelectorAll(".showing").length == 2) {
        return;
      }

      ev.target.classList.add("showing");

      check();
    });
  }
  // Right of the bat it's the first player's turn
  setTimeout(player1turn, 500);
}

function check() {
  const cards = board.querySelectorAll(".showing");

  // Code to execute if the two cards are shown
  if (cards.length == 2) {
    const first = cards[0];

    const last = cards[1];

    // Increase the counter that increases the attempts of each player
    count++;

    //If the numbers on the two cards shown are the same, hide them
    if (first.textContent == last.textContent) {
      setTimeout(() => {
        first.classList.remove("showing");

        last.classList.remove("showing");

        first.classList.add("hidden");

        last.classList.add("hidden");

        // If count is not even, mark the turn is the second's player
        if (!(count % 2 == 0)) {
          player2turn();
        } else {
          player1turn();
        }

        checkIsComplete();
      }, 1000);
    } else {
      // If the numbers are not the same, flip them back
      setTimeout(() => {
        first.classList.remove("showing");

        last.classList.remove("showing");

        // If the count is not even, increase the attempts count for first player
        // If they are even, increase for the second player
        if (!(count % 2 == 0)) {
          document.querySelector("#try1").innerHTML = ++attempts1;
          player2turn();
        } else {
          document.querySelector("#try2").innerHTML = ++attempts2;
          player1turn();
        }
      }, 1500);
    }
  }
}

function checkIsComplete() {
  // All the cards that are not hidden
  const cards = board.querySelectorAll("div:not(.hidden)");

  const winnerPop = document.querySelector("#winContainer");

  const winner = document.querySelector("#win");

  // If all the cards are hidden - stop the timer, initiate the fireworks effect if there is a winner, hide the stats
  if (!cards.length) {
    clearInterval(timerInterval);

    document.querySelectorAll(".firework").forEach((div) => {
      if (attempts1 === attempts2) {
        return;
      } else {
        div.style.display = "block";
      }
    });

    winnerPop.style.display = "flex";

    timerDiv.style.display = "none";

    statsDiv.style.display = "none";

    restart.innerHTML = "Restart";

    // The player with the least amount of attempts, wins, if the amount is the same it's a tie
    if (attempts1 < attempts2) {
      winner.innerHTML = `Congratulations ${inp4.value} ${`<br>`}  You won !`;
    } else if (attempts1 === attempts2) {
      winner.innerHTML = `It's a tie `;
    } else {
      winner.innerHTML = `Congratulations ${inp5.value} ${`<br>`} You won !`;
    }
  }
  startOver();
}

const dates = new Date();

function startOver() {
  restart.addEventListener("click", () => {
    location.reload();
  });
}
