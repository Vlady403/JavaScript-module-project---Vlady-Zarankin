import "./style.css";

class Calculator {
  // Reference to the div containing the upper row of the calculator's screen
  prevOpTextElem: HTMLElement;

  // Reference to the div containing the lower row of the calculator's screen
  currentOpTextElem: HTMLElement;

  // The content of the lower row
  currentOp: string = "";

  // The content of the upper row
  prevOp: string = "";

  // Reference to the math operation being used
  operation: string | undefined;

  constructor(prevOpTextElem: HTMLElement, currentOpTextElem: HTMLElement) {
    this.prevOpTextElem = prevOpTextElem;

    this.currentOpTextElem = currentOpTextElem;
    this.clear();
  }

  // Clearing the entire content of the screen by setting the text content of both rows to an empty string and clearing the operation value
  clear(): void {
    this.currentOp = "";
    this.prevOp = "";
    this.operation = undefined;
  }

  delete(): void {
    // Turning the input to a string and deleting one element from the end
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  displayNumber(number: string | number): void {
    //If the user has already clicked on the dot digit once, return
    if (number === "." && this.currentOp.includes(".")) return;

    // The content of the lower row is the digits entered
    this.currentOp = this.currentOp.toString() + number.toString();
  }

  selectOperation(operation: string): void {
    // If the lower row is empty return
    if (this.currentOp === "") return;

    // If the upper row is not empty
    if (this.prevOp !== "") {
      this.compute();
    }

    // Setting the operation value to the conamed parameter for the calculator to know what operation to use
    this.operation = operation;

    // After the input to the lower(current) row is complete and an operation is entered, move it's value to the upper row
    this.prevOp = this.currentOp;

    // Clear the lower row
    this.currentOp = "";
  }

  compute(): void {
    // Variable to hold the different math operation results
    let computation: number;

    // Getting the number value of the rows, considering float numbers
    const prev = parseFloat(this.prevOp);

    const current = parseFloat(this.currentOp);

    // If the input value in either one of the rows is not a number, return
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
      default: //If any other operation is passed, return
        return;
    }

    // Displaying the result of the computation on the lower row
    this.currentOp = computation.toString();

    // After the current computation is done, clear the operation value for the next one
    this.operation = undefined;

    // Clearing the upper row
    this.prevOp = "";
  }

  // Seperating big numbers with commas and allowing to start an input with a dot for a shortened decimal number
  hanldeNumbers(number: string | number): string {
    // Getting the number that was entered, converting it to a stringed array, to break it to two parts, one before the decimal place and one after
    const stringNum = number.toString();

    // The digits before the decimal place
    const intDigits = parseFloat(stringNum.split(".")[0]);

    // The digits after the decimal place
    const decDigits = stringNum.split(".")[1];

    let intDisplay: string;

    // If the input value before the dot is not a number, leave the screen empty
    if (isNaN(intDigits)) {
      intDisplay = "";
    } else {
      // Otherwise set the value of the numbers entered before the decimal place
      intDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    // If numbers where entered after the decimal place, display the numbers before and after the decimal place
    if (decDigits != null) {
      return `${intDisplay}.${decDigits}`;
    } else {
      // Otherwise display just the numbers before
      return intDisplay;
    }
  }

  updateDisplay(): void {
    this.currentOpTextElem.innerText = this.hanldeNumbers(this.currentOp);

    // If the operation defined, set the upper row's content to the numbers and the operation that where entered
    if (this.operation != null) {
      this.prevOpTextElem.innerText = `${this.hanldeNumbers(this.prevOp)} ${
        this.operation
      }`;
    } else {
      // Otherwise clear the upper row
      this.prevOpTextElem.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-num]");

const operationButtons = document.querySelectorAll("[data-opera]");

const equalsButton: HTMLButtonElement | null =
  document.querySelector("[data-equ]");

const delButton: HTMLButtonElement | null =
  document.querySelector("[data-del]");

const allClrButton: HTMLButtonElement | null =
  document.querySelector("[data-allClr]");

const prevOpTextElem = document.querySelector(
  "[data-previousOp]"
) as HTMLElement;

const currentOpTextElem = document.querySelector(
  "[data-currentOp]"
) as HTMLElement;

const calculator = new Calculator(prevOpTextElem, currentOpTextElem);

numberButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.target as HTMLButtonElement;

    calculator.displayNumber(target.innerHTML);

    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const target = event.target as HTMLButtonElement;

    calculator.selectOperation(target.innerHTML);

    calculator.updateDisplay();
  });
});

if (allClrButton) {
  allClrButton.addEventListener("click", () => {
    calculator.clear();

    calculator.updateDisplay();
  });
}

if (equalsButton) {
  equalsButton.addEventListener("click", () => {
    calculator.compute();

    calculator.updateDisplay();
  });
}

if (delButton) {
  delButton.addEventListener("click", () => {
    calculator.delete();

    calculator.updateDisplay();
  });
}
