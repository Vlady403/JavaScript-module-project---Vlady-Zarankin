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
