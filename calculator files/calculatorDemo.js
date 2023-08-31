class Calculator {
  constructor(prevOpTextElem, currentOpTextElem) {
    this.prevOpTextElem = prevOpTextElem;
    this.currentOpTextElem = currentOpTextElem;
    this.clear();
  }

  clear() {
    this.currentOp = "";
    this.prevOp = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  displayNumber(number) {
    if (number === "." && this.currentOp.includes(".")) return;
    this.currentOp = this.currentOp.toString() + number.toString();
  }

  selectOperation(operation) {
    if (this.currentOp === "") return;
    if (this.prevOp !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOp = this.currentOp;
    this.currentOp = "";
  }

  compute() {
    let computation;

    const prev = parseFloat(this.prevOp);

    const current = parseFloat(this.currentOp);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
        if (current === "");
      default:
        return;
    }
    this.currentOp = computation;
    this.operation = undefined;
    this.prevOp = "";
  }

  hanldeNumbers(number) {
    const stringNum = number.toString();
    const intDigits = parseFloat(stringNum.split(".")[0]);
    const decDigits = stringNum.split(".")[1];
    let IntDisplay;
    if (isNaN(intDigits)) {
      IntDisplay = "";
    } else {
      IntDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decDigits != null) {
      return `${IntDisplay}.${decDigits}`;
    } else {
      return IntDisplay;
    }
  }

  updateDisplay() {
    this.currentOpTextElem.innerText = this.hanldeNumbers(this.currentOp);
    if (this.operation != null) {
      this.prevOpTextElem.innerText = `${this.hanldeNumbers(this.prevOp)} ${
        this.operation
      }`;
    } else {
      this.prevOpTextElem.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-num]");

const operationButtons = document.querySelectorAll("[data-opera]");

const equalsButton = document.querySelector("[data-equ]");

const delButton = document.querySelector("[data-del");

const allClrButton = document.querySelector("[data-allClr]");

const prevOpTextElem = document.querySelector("[data-previousOp]");

const currentOpTextElem = document.querySelector("[data-currentOp]");

const calculator = new Calculator(prevOpTextElem, currentOpTextElem);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.displayNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.selectOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClrButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

delButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
