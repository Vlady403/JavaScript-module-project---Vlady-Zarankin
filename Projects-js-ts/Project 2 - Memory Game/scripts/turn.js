function player1turn() {
  // create a border around the first player, a quarter with each timeout
  // remove the second player's border
  setTimeout(() => {
    player1.style.borderLeft = "3px solid #fff";
    player1.style.borderRadius = "50%";
  }, 200);
  setTimeout(() => {
    player1.style.borderTop = "3px solid #fff";
    player1.style.borderRadius = "50%";
  }, 270);
  setTimeout(() => {
    player1.style.borderRight = "3px solid #fff";
    player1.style.borderRadius = "50%";
  }, 340);
  setTimeout(() => {
    player1.style.borderBottom = "3px solid #fff";
    player1.style.borderRadius = "50%";
  }, 410);
  player2.style.border = "none";
}

function player2turn() {
  // create a border around the second player, a quarter with each timeout
  // remove the first player's border
  setTimeout(() => {
    player2.style.borderLeft = "3px solid #fff";
    player2.style.borderRadius = "50%";
  }, 200);
  setTimeout(() => {
    player2.style.borderTop = "3px solid #fff";
    player2.style.borderRadius = "50%";
  }, 270);
  setTimeout(() => {
    player2.style.borderRight = "3px solid #fff";
    player2.style.borderRadius = "50%";
  }, 340);
  setTimeout(() => {
    player2.style.borderBottom = "3px solid #fff";
    player2.style.borderRadius = "50%";
  }, 410);
  player1.style.border = "none";
}
