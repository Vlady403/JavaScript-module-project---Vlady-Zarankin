const projectPage = document.querySelector(".projPageCont");

const navBar = document.querySelector(".navBarDiv");

const menu = document.querySelector(".menu");

const projectPageContent = document.querySelector(".project");

const allProjBtns = document.querySelectorAll(".projectBtn");

const allBubbleElems = document.querySelectorAll(".bubble");

const btn1 = document.querySelector("#btn1");

// The html content of each project page
const proj1Content = `
<span class="myName"><p>Vlady.</p></span>
<div><h1>Snake Game</h1>
<p>
This project displays a snake game with increasing difficulty.
The snake moves slightly faster with every apple eaten.
There are obstacles and lives to be eaten as well.
</p>
<div class="projPageBtn">
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/project1-snakegame.zip">Download Project</a>
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/Projects-js-ts/Project 1 - snake game/snake.html" target="_blank">Live demo</a>
</div></div>
<span class="iconsProjPage">
<img src="./images/htmlIcon.png" alt="html icon" />
                <img src="./images/cssIcon.png" alt="css icon" />
                <img src="./images/jsIcon.png" alt="JavaScript icon" />
</span>
<img class="projImg" src="./images/snakeProject.png" alt="" />`;

const proj2Content = `
<span class="myName"><p>Vlady.</p></span>
<div><h1>Memory game</h1>
<p>
This project displays a memory game with user inputs for the
game setup.
The game detects the current turn, the number of attempts for each player and checks the winner </p>
<div class="projPageBtn">
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/project2-memorygame.zip">Download Project</a>
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/Projects-js-ts/Project 2 - Memory Game/memory.html" target="_blank">Live demo</a>
</div></div>
<span class="iconsProjPage">
<img src="./images/htmlIcon.png" alt="html icon" />
                <img src="./images/cssIcon.png" alt="css icon" />
                <img src="./images/jsIcon.png" alt="JavaScript icon" />
</span>
<img class="projImg" src="./images/memoryGameProject.png" alt="" />`;

const proj3Content = ` 
<span class="myName"><p>Vlady.</p></span>

<div><h1>To do list</h1>
<p>
This project displays a To Do List that appends the tasks to
both the screen and the local storage.
There is an ability to edit, delete the current task or delete all the tasks.
The is validation for the right input length.</p>
<div class="projPageBtn">
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/project3-todolist.zip">Download Project</a>
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/Projects-js-ts/Project 3 - To do list/todolist.html" target="_blank">Live demo</a>
</div></div>

<span class="iconsProjPage">
<img src="./images/htmlIcon.png" alt="html icon" />
                <img src="./images/cssIcon.png" alt="css icon" />
                <img src="./images/jsIcon.png" alt="JavaScript icon" />
</span>
<img class="projImg" src="./images/toDoListProject.png" alt="" />`;

const proj4Content = `
<span class="myName"><p>Vlady.</p></span>
<div><h1>Gallery</h1>
<p>
This project displays an image Gallery using OOP.
Changing images is done either via the buttons or the arrow keys.
The gallery can be displayed on full screen.
There is an auto slideshow mode present.</p>
</div>
<div class="projPageBtn">
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/project4-gallery.zip">Download Project</a>
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/Projects-js-ts/Project 4 - Gallery/gallery.html" target="_blank">Live demo</a>
</div>
<span class="iconsProjPage">
<img src="./images/htmlIcon.png" alt="html icon" />
                <img src="./images/cssIcon.png" alt="css icon" />
                <img src="./images/jsIcon.png" alt="JavaScript icon" />
<p class="oop" id="oopProj1">{ OOP }</p>
</span>
<img class="projImg" src="./images/gallery.png" alt="" />`;

const proj5Content = `
<span class="myName"><p>Vlady.</p></span>
<div><h1>Calculator</h1>
<p>
The project displays a calculator app using OOP in TypeScript.
The calculator has two rows - one for the current number, the second for the first number and the desired math operation
</p></div>
<div class="projPageBtn">
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/project5-calculator.zip">Download Project</a>
<a href="file:///C:/Full stack web 13.10.22/calculator files/index.html" target="_blank">Live demo</a>
</div>
<span class="iconsProjPage">
<img src="./images/htmlIcon.png" alt="html icon" />
                <img src="./images/cssIcon.png" alt="css icon" />
<img src="./images/tsIcon.png" alt="TypeScript icon" />
<p class="oop" id="oopProj2" >{ OOP }</p>
</span>
<img class="projImg" src="./images/calculator.png" alt="" />`;

const proj6Content = `
<span class="myName"><p>Vlady.</p></span>

<div><h1>Tic Tac Toe</h1>
<p>
This project displays a fun Tic tac Toe game.
There is a hover effect that indicates whose turn it is.
The game checks for the winner.</p>
<div class="projPageBtn">
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/project6-tictactoe.zip">Download Project</a>
<a href="file:///C:/Full stack web 13.10.22/JavaScript Project/Projects-js-ts/Project 6 - Tic Tac Toe/tictactoe.html" target="_blank">Live demo</a>
</div></div>

<span class="iconsProjPage">
<img src="./images/htmlIcon.png" alt="html icon" />
                <img src="./images/cssIcon.png" alt="css icon" />
                <img src="./images/jsIcon.png" alt="JavaScript icon" />
</span>
<img class="projImg" src="./images/ticTacToe.png" alt="" />`;

const btn2 = document.querySelector("#btn2");

const btn3 = document.querySelector("#btn3");

const btn4 = document.querySelector("#btn4");

const btn5 = document.querySelector("#btn5");

const btn6 = document.querySelector("#btn6");

const galleryContainer = document.querySelector(".gallery");

projectPage.classList.remove("showProject");

galleryContainer.classList.remove("hideGallery");

projectPage.classList.remove("showProject");

const allCards = document.querySelectorAll(".card");

// Toggling between the appearance of the menu icon and the appearance of the menu
navBar.addEventListener("click", () => {
  menu.classList.toggle("showMenu");
  if (navBar.classList.contains("changeNavBarX")) {
    navBar.classList.toggle("changeNavBarBack");
  } else {
    navBar.classList.toggle("changeNavBarX");
  }
});

// by clicking on each button inside each project's card, the content of the project page is relevant for the project, tracked by the buttonId variable
allProjBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonId = button.getAttribute("data-content");
    projPageContent(buttonId);
  });
});

// handling the appearance and removal of the project page and the fade of the cards and the bubbles when it appears
function projPageContent(buttonId) {
  projectPage.classList.remove("showProject");
  projectPage.classList.remove("flyBack");
  galleryContainer.classList.remove("brightness");
  allBubbleElems.forEach((bubble) => {
    bubble.classList.remove("brightness");
  });

  // The content of the project page changes based on which button that is
  if (buttonId == "btn1") {
    projectPageContent.innerHTML = proj1Content;
  }

  if (buttonId == "btn2") {
    projectPageContent.innerHTML = proj2Content;
  }

  if (buttonId == "btn3") {
    projectPageContent.innerHTML = proj3Content;
  }

  if (buttonId == "btn4") {
    projectPageContent.innerHTML = proj4Content;
  }

  if (buttonId == "btn5") {
    projectPageContent.innerHTML = proj5Content;
  }

  if (buttonId == "btn6") {
    projectPageContent.innerHTML = proj6Content;
  }

  projectPage.classList.add("showProject");
  galleryContainer.classList.add("brightness");
  allBubbleElems.forEach((bubble) => {
    bubble.classList.add("brightness");
  });

  const myName = document.querySelector(".myName");

  // The project page dissappears when clicking on my name on the top left
  myName.addEventListener("click", () => {
    projectPage.classList.add("flyBack");
    galleryContainer.classList.remove("brightness");
    allBubbleElems.forEach((bubble) => {
      bubble.classList.remove("brightness");
    });

    // Timing the fade out dissappearance of the project page
    setTimeout(() => {
      projectPage.classList.remove("showProject");
    }, 550);
  });
}
