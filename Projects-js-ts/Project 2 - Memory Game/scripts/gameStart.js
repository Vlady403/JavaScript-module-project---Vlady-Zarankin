// Starting the game
function startGame() {
  // Hide the input fields
  setTimeout(() => {
    inps.style.transform = "scale(4)";

    inps.style.opacity = "0";
  }, 50);

  // Remove the the input fields, showing the game section and setting it's layout
  setTimeout(() => {
    inps.style.display = "none";

    inpsContainer.style.display = "none";
    game.classList.add("gameStart");
  }, 500);
}
