function checkNumericInput() {
  // Addressing only the inputs that need to have numeric value by putting them in an array
  const inputs = [inp1, inp2, inp3];

  // Replacing the option for inputing non-numeric characters with numeric only, for all the inputs in the array
  inputs.forEach((input) => {
    input.addEventListener("input", (ev) => {
      ev.target.value = ev.target.value.replace(/[^0-9]/g, "");
    });
  });
}

checkNumericInput();

const req = "Can't leave empty fields";

const Min2LetName = "At least 2 letters required for each player";

function handleUserMessage(messText) {
  const message = document.querySelector("#userMessage");

  message.innerHTML = messText;

  message.className = "pop";

  // remove the message after 3 seconds
  setTimeout(function () {
    message.className = message.className.replace("pop", "");
  }, 3000);
}

function checkInput() {
  const allInputs = [inp1, inp2, inp3, inp4, inp5];

  if (inp1.value > 15) {
    handleUserMessage("Maximum amount of pairs is 15");
    return false;
  }

  if (parseInt(inp1.value) < 4) {
    handleUserMessage("Minimum 4 pairs are required");
    return false;
  }

  if (parseInt(inp2.value) > 10) {
    handleUserMessage("Maximum amount of columns is 10");
    return false;
  }
  if (parseInt(inp3.value) > 8) {
    handleUserMessage("Maximum amount of rows is 8");
    return false;
  }

  if (parseInt(inp2.value) > parseInt(inp1.value)) {
    handleUserMessage("The Amount of columns cannot be bigger than the pairs");
    return false;
  }

  if (parseInt(inp3.value) > parseInt(inp1.value)) {
    handleUserMessage("The Amount of rows cannot be bigger than the pairs");
    return false;
  }

  if (parseInt(inp1.value) > 8) {
    if (parseInt(inp2.value) < 3) {
      handleUserMessage("Minimum amount of columns is 3");
      return false;
    }
  } else {
    if (parseInt(inp2.value) < 2) {
      handleUserMessage("Minimum amount of columns is 2");
      return false;
    }
  }

  if (parseInt(inp1.value) > 8) {
    if (parseInt(inp3.value) < 3) {
      handleUserMessage("Minimum amount of rows is 3");
      return false;
    }
  } else {
    if (parseInt(inp3.value) < 2) {
      handleUserMessage("Minimum amount of rows is 2");
      return false;
    }
  }

  if (parseInt(inp1.value) > 9) {
    if (parseInt(inp2.value) > parseInt(inp1.value) / 2) {
      if (parseInt(inp3.value) > parseInt(inp2.value) / 2) {
        handleUserMessage(`cannot have more than 
        ${Math.floor(inp2.value / 2)} rows here`);
        return false;
      }
    }

    if (parseInt(inp3.value) > parseInt(inp1.value) / 2) {
      if (parseInt(inp2.value) > parseInt(inp3.value) / 2) {
        handleUserMessage(
          `cannot have more than ${Math.floor(inp3.value / 2)} columns here`
        );
        return false;
      }
    }

    if (window.screen.width < 600) {
      if (parseInt(inp2.value) > 5) {
        handleUserMessage("Maximum amount of columns is 5");
        return false;
      }
    }
  }

  if (
    inp1.value === "" ||
    inp2.value === "" ||
    inp3.value === "" ||
    inp4.value.trim() === "" ||
    inp5.value.trim() === ""
  ) {
    handleUserMessage(req);
    return false;
  } else if (inp4.value.length < 2 || inp5.value.length < 2) {
    handleUserMessage(Min2LetName);
    return false;
  }

  // Initialize the start of the game if the input fields are filled
  allInputs.forEach((input) => {
    if (input.value.length === 0) {
      return;
    } else {
      startGame();
      flagStartGame = true;
    }
  });
}
