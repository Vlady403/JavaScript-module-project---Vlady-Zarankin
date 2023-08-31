class Calculator {
  prevOpTextElem: HTMLElement;
  currentOpTextElem: HTMLElement;
  currentOp: string;
  prevOp: string;
  operation: string | undefined;

  constructor(prevOpTextElem: HTMLElement, currentOpTextElem: HTMLElement) {
    this.prevOpTextElem = prevOpTextElem;
    this.currentOpTextElem = currentOpTextElem;
    this.clear();
  }

  clear(): void {
    this.currentOp = "";
    this.prevOp = "";
    this.operation = undefined;
  }

  delete(): void {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  displayNumber(number: string | number): void {
    if (number === "." && this.currentOp.includes(".")) return;
    this.currentOp = this.currentOp.toString() + number.toString();
  }

  selectOperation(operation: string): void {
    if (this.currentOp === "") return;
    if (this.prevOp !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOp = this.currentOp;
    this.currentOp = "";
  }

  compute(): void {
    let computation: number;

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
      default:
        return;
    }
    this.currentOp = computation.toString();
    this.operation = undefined;
    this.prevOp = "";
  }

  hanldeNumbers(number: string | number): string {
    const stringNum = number.toString();
    const intDigits = parseFloat(stringNum.split(".")[0]);
    const decDigits = stringNum.split(".")[1];
    let IntDisplay: string;
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

  updateDisplay(): void {
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
    calculator.selectOperation(button.innerHTML);
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
