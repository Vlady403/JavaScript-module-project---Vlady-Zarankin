// Defining the size of the game board
const height = 29;
const width = 29;

// Defining the initial length of the snake
const snake = [5, 4, 3, 2, 1, 0];

// Defining the head of the snake
let head = snake[0];

let isGameOver = false;
let direction = "left";
let interval;
let apple;
let life;
let obstacle1;
let obstacle2;
let obstacle3;
let setLife;
let countScore = 0;
let countTimer = 0;
let flagTimer = false;
let flagLife = false;
let i = 1;

// Function to start the game/ go to the game board

function startGame() {
  const btn = document.querySelector("#startGame");

  const cont = document.querySelector(".container");

  const instructHeading = document.querySelector("#instContainer");

  const instructions = document.querySelector("#instructions");

  // Initializing the appearance and disappearance of the instructions content.
  instructHeading.addEventListener("click", () => {
    if (!(instructions.style.transform == "scale(0)")) {
      instructions.style.transform = "scale(0)";
    } else {
      instructions.style.transform = "scale(1)";
    }
  });

  const snk = document.querySelector("#snake");

  snk.style.display = "none";

  btn.addEventListener("click", gameStart);

  // Hiding the welcoming page, showing the page with the game itself, initializing the creation of the board and the other functions in it to get the game ready

  function gameStart() {
    cont.style.display = "none";

    snk.style.display = "flex";

    flagTimer = true;

    createBoard();
  }
}

startGame();

const board = document.querySelector(".board");
board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

// Defining the score of the player

function score() {
  const scoreNum = document.querySelector("#scoreNum");

  scoreNum.innerHTML = countScore;

  countScore++;
}

score();

// Defining the timer

const timer = setInterval(() => {
  if (flagTimer) {
    countTimer++;
    const date = new Date(countTimer * 1000);

    const m = date.getMinutes();

    const s = date.getSeconds();

    document.querySelector("#timerNum").innerHTML = `${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
  }
}, 1000);

let remainingLives = 3;

// Setting the lives

function setLives() {
  const heartsArray = Array(remainingLives).fill("&#128156;");

  const lives = document.querySelector("#lives");

  lives.innerHTML = `${heartsArray.join("")} :Lives`;
}

const rightBoundaries = [];
const leftBoundaries = [];

//Right boundries for the snake to avoid

for (let i = 0; i < height; i++) {
  rightBoundaries.push(i * width - 1);
}

// Left boundries for the snake to avoid

for (let i = 1; i <= height; i++) {
  leftBoundaries.push(i * width);
}

// Setting the first obstacle

function bomb1() {
  obstacle1 = Math.floor(Math.random() * (width * height));

  if (snake.includes(obstacle1)) {
    bomb1();
  } else {
    const divs = board.querySelectorAll("div");

    divs.forEach((el) => el.classList.remove("bomb1"));

    divs[obstacle1].classList.add("bomb1");
  }
}

// Setting the second obstacle

function bomb2() {
  obstacle2 = Math.floor(Math.random() * (width * height));

  if (snake.includes(obstacle2)) {
    bomb1();
  } else {
    const divs = board.querySelectorAll("div");

    divs.forEach((el) => el.classList.remove("bomb2"));

    divs[obstacle2].classList.add("bomb2");
  }
}

// Setting the third obstacle

function block() {
  obstacle3 = Math.floor(Math.random() * (width * height));

  if (snake.includes(obstacle3)) {
    block();
  } else {
    const divs = board.querySelectorAll("div");

    divs.forEach((el) => el.classList.remove("block"));

    divs[obstacle3].classList.add("block");
  }
}

// Creating the game board itself
function createBoard() {
  for (let i = 0; i < width * height; i++) {
    const div = document.createElement("div");

    board.appendChild(div);
  }

  flagLife = true;

  color();
  setApple();
  bomb1();
  bomb2();
  block();
  setLives();
  setLife();
}

// Defining the snake and it's head in the board and rounding it's corners when it changes direction

function color() {
  const divs = board.querySelectorAll("div");

  divs.forEach((el) =>
    el.classList.remove(
      "snake",
      "head",
      "up",
      "right",
      "down",
      "left",
      "topRightRadius",
      "topLeftRadius",
      "bottomRightRadius",
      "bottomLeftRadius"
    )
  );

  snake.forEach((num) => divs[num].classList.add("snake"));

  divs[head].classList.add("head", direction);

  snake.forEach((num, i) => {
    const next = snake[i + 1];

    const prev = snake[i - 1];

    if (prev) {
      if (
        (next == num - 1 && prev == num + width) ||
        (next == num + width && prev == num - 1)
      ) {
        divs[num].classList.add("topLeftRadius");
      } else if (
        (next == num + width && prev == num + 1) ||
        (next == num + 1 && prev == num + width)
      ) {
        divs[num].classList.add("topRightRadius");
      } else if (
        (next == num + 1 && prev == num - width) ||
        (next == num - width && prev == num + 1)
      ) {
        divs[num].classList.add("bottomRightRadius");
      } else if (
        (next == num - 1 && prev == num - width) ||
        (next == num - width && prev == num - 1)
      ) {
        divs[num].classList.add("bottomLeftRadius");
      }
    }
  });
}

// Setting the Arrow keys for the associated direction of the snake
window.addEventListener("keydown", (ev) => {
  ev.preventDefault();

  switch (ev.key) {
    case "ArrowUp":
      move("up");
      break;
    case "ArrowRight":
      move("right");
      break;
    case "ArrowDown":
      move("down");
      break;
    case "ArrowLeft":
      move("left");
      break;
    case "Escape":
      clearInterval(interval);
      break;
  }
});

// Setting the movement of the snake and handling the different scenarios.
function move(dir) {
  if (isGameOver) {
    return;
  }

  console.log(isGameOver);

  const divs = board.querySelectorAll("div");

  if (dir == "up") {
    // Don't allow the snake to go down when it's moving up
    if (direction == "down") {
      return;
    }

    head -= width;

    // If the head is not present in one of the divs of the board/gone off the board - game over
    if (!divs[head]) {
      snake.forEach((div) => divs[div].classList.add("shaking"));
      gameOver();
      return;
    }
  } else if (dir == "right") {
    // Don't allow the snake to go left when it's moving to the right
    if (direction == "left") {
      return;
    }

    head--;

    // If the snake hits the right border - game over
    if (rightBoundaries.includes(head)) {
      snake.forEach((div) => divs[div].classList.add("shaking"));
      gameOver();
      return;
    }
  } else if (dir == "down") {
    // Don't allow the snake to go up when it's moving down
    if (direction == "up") {
      return;
    }

    head += width;

    // If the head is not present in one of the divs of the board/gone off the board - game over
    if (!divs[head]) {
      snake.forEach((div) => divs[div].classList.add("shaking"));
      gameOver();
      return;
    }
  } else if (dir == "left") {
    // Don't allow the snake to go right when it's moving to the left
    if (direction == "right") {
      return;
    }

    head++;

    // If the snake hits the left border - game over

    if (leftBoundaries.includes(head)) {
      snake.forEach((div) => divs[div].classList.add("shaking"));
      gameOver();
      return;
    }
  }

  // If the snake hits itself - Add a shaking effect and end the game
  if (snake.includes(head)) {
    snake.forEach((div) => divs[div].classList.add("shaking"));
    gameOver();
    return;
  }

  direction = dir;
  snake.unshift(head);

  // When the snake eats an apple:
  //A. Increase the score.
  // B. Move the snake a bit faster.
  // C. Add a sound effect.
  // D. Make the apple appear in a new random location on the board
  // E. Increase it's length.

  if (apple == head) {
    score();
    speed -= 3;

    const audio = document.createElement("audio");

    audio.src = "./soundEffects/Pebble (1).ogg";

    audio.volume = 0.2;

    audio.play();

    setApple();
  } else {
    snake.pop();
  }

  // If the apple happenes to appear in either one of the obstacles or the life element, reset it to a new random position
  if (
    apple == obstacle1 ||
    apple == obstacle2 ||
    apple == obstacle3 ||
    apple == life
  ) {
    setApple();
  }

  // Set the lives again to connect them to their related behavior when hitting the obstacles or the life element

  const lives = document.querySelector("#lives");

  const heartsArray = Array(remainingLives).fill("&#128156;");

  lives.innerHTML = `${heartsArray.join("")} :Lives`;

  // When the snake hits one of the obstacles:
  // A. Add a shaking effect to the snake.
  // B. Remove one life.
  // C. Attach a sound effect.

  if (head === obstacle1 || head === obstacle2 || head === obstacle3) {
    snake.forEach((div) => divs[div].classList.add("shaking"));

    remainingLives--;

    const audio = document.createElement("audio");

    if (!(head === obstacle3)) {
      audio.src = "./soundEffects/explosionSound.mp3";

      audio.volume = 0.05;
    } else {
      audio.src = "./soundEffects/block.mp3";

      audio.volume = 0.1;
    }

    audio.play();
  }

  // If the there are no lives left, initiate the gameOver function

  if (remainingLives === 0) {
    gameOver();
    return;
  }

  //removing the obstacle from the current position and calling the function that sets it in a new random one

  if (head === obstacle1) {
    divs[obstacle1].classList.remove("bomb1");
    bomb1();
  }
  if (head === obstacle2) {
    divs[obstacle2].classList.remove("bomb2");
    bomb2();
  }
  if (head === obstacle3) {
    divs[obstacle3].classList.remove("block");
    block();
  }

  //When the snake hits a life element it disappears, a sound effect is initiated, one life is added to the lives count.
  if (head == life) {
    if (divs[life].classList.contains("life")) {
      divs.forEach((el) => el.classList.remove("life"));

      const audio = document.createElement("audio");

      audio.src = "./soundEffects/lifeUp.mp3";

      audio.volume = 0.1;

      audio.play();
    }

    // If there are already 3 lives, don't add another one.
    if (remainingLives >= 3) {
      return;
    }
    remainingLives++;

    // Reseting the lives count accordingly
    lives.innerHTML = `${heartsArray.join("")} :Lives`;

    console.log(heartsArray);

    console.log(life);
  }

  color();
  startAuto();
}

let speed = 180;

// Initializing the automatic movement of the snake, once one of the Arrow keys is pressed.
function startAuto() {
  clearInterval(interval);
  interval = setInterval(() => move(direction), speed);
}

// Setting the apple for the snake to eat, in a random position
function setApple() {
  apple = Math.floor(Math.random() * (width * height));

  // If the apple appears inside the snake, change it's location to a new, random one
  if (snake.includes(apple)) {
    setApple();
  } else {
    const divs = board.querySelectorAll("div");

    divs.forEach((el) => el.classList.remove("apple"));

    divs[apple].classList.add("apple");
  }
}

// Setting the life element inside the game board to appear every 40 seconds
setLife = () => {
  setInterval(() => {
    if (flagLife == true) {
      life = Math.floor(Math.random() * (width * height));

      if (snake.includes(life)) {
        setLife();
      } else {
        const divs = board.querySelectorAll("div");

        divs.forEach((el) => el.classList.remove("life"));

        divs[life].classList.add("life");
      }
    }
  }, 40000);
};

// Setting the function to handle the end of the game
function gameOver() {
  isGameOver = true;
  clearInterval(interval);

  // Removing the lives when it's game over
  const lives = document.querySelector("#lives");

  lives.innerHTML = " :Lives";

  //  Setting up the sound effect assiciated with the end of the game
  const audio = document.createElement("audio");
  audio.src = "./soundEffects/impact.wav";
  audio.volume = 0.1;
  audio.play();

  // Setting a timeout for the appearance of the window displaying the stats when the game ends
  setTimeout(() => {
    const gaOv = document.querySelector(".gameOverWin");

    const cont = document.querySelector(".container");

    gaOv.style.transform = "scale(1)";

    gaOv.style.visibility = "visible";

    document.querySelector(
      ".gameOverWin p"
    ).innerHTML = `Game over ${"<br>"}${"<br>"} score: ${
      scoreNum.innerHTML
    }${"<br>"}${"<br>"} Time: ${timerNum.innerHTML}`;

    const restartGame = document.querySelector("#restart");

    restartGame.innerHTML = "Restart";

    board.style.filter = "blur(3px)";

    // Stopping the timer
    clearInterval(timer);

    //reloading the page to restart the game
    restartGame.addEventListener("click", () => {
      location.reload();
    });
  }, 700);
}
