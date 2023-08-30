const navBar = document.querySelector(".navBarDiv");

const menu = document.querySelector(".menu");

// Toggling between the appearance of the menu icon and the appearance of the menu
navBar.addEventListener("click", () => {
  menu.classList.toggle("showMenu");
  if (navBar.classList.contains("changeNavBarX")) {
    navBar.classList.toggle("changeNavBarBack");
  } else {
    navBar.classList.toggle("changeNavBarX");
  }
});

window.addEventListener("scroll", slide);

function slide() {
  const topImages = document.querySelectorAll(".top3");

  const bottomImages = document.querySelectorAll(".bottom3");

  const scrHeight = window.innerHeight;

  const scrWidth = screen.width;

  for (let i = 0; i < topImages.length; i++) {
    const topImgScrPos = topImages[i].getBoundingClientRect().top;

    if (topImgScrPos < scrHeight) {
      topImages[i].style.transform = "translateY(0)";
      topImages[i].style.opacity = "1";
    }
  }

  for (let i = 0; i < bottomImages.length; i++) {
    const bottomImgScrPos = bottomImages[i].getBoundingClientRect().top;

    if (bottomImgScrPos < scrHeight) {
      bottomImages[i].style.transform = "translateY(0)";
      bottomImages[i].style.opacity = "1";
    }
  }
}

function appear() {
  const aboutText = document.querySelector("#aboutText");

  const myImage = document.querySelector("#mainImgDiv");

  const myImage2 = document.querySelector("#mainImgDiv2");

  aboutText.style.transform = "translateX(0)";

  myImage.style.transform = "translateX(0)";

  myImage2.style.transform = "translateX(0)";
}

window.addEventListener("load", appear);
