function handleUserMessage(messText) {
  const message = document.querySelector("#userMessage");

  message.innerHTML = messText;
  message.className = "pop";

  setTimeout(function () {
    message.className = message.className.replace("pop", "");
  }, 3000);
}

const noEmptyFields = "All fields are required";
const invalidEmail = "Please enter a valid email address";
const sent =
  "Thank you! <br> I received your message and will get back to you as soon as possible!";

function formValidation() {
  const allInputs = document.querySelectorAll(".inpField");
  const emailInput = document.querySelector("#mail");
  const submitBtn = document.querySelector("#submitBtn");

  submitBtn.addEventListener("click", () => {
    let isValid = true;

    allInputs.forEach((inp) => {
      if (inp.value === "") {
        handleUserMessage(noEmptyFields);
        isValid = false;
        return;
      }
    });

    if (!isValid) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      handleUserMessage(invalidEmail);
      return;
    }

    handleUserMessage(sent);

    allInputs.forEach((inp) => {
      setTimeout(() => {
        inp.value = "";
      }, 2800);
    });
  });
}

formValidation();
