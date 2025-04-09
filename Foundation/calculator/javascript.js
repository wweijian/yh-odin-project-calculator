const numButtonList = document.querySelectorAll(".num-button");
const operatorButtonList = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector(".clear-button");
const signButton = document.querySelector(".sign-button");
const dotButton = document.querySelector(".dot-button");
const equalButton = document.querySelector(".equal-button");
const valueText = document.querySelector(".value-text");

let operator;
let operand1;
let operand2;
let startNewValue = true;

const MAX_CHAR_ALLOWED = 9;

function clear() {
  valueText.textContent = "0";
  operator = undefined;
  operand1 = undefined;
  operand2 = undefined;
  startNewValue = true;
}

function toggleSign() {
  if (valueText.textContent === "0") return;
  valueText.textContent = valueText.textContent.startsWith("-")
    ? valueText.textContent.slice(1)
    : `-${valueText.textContent}`;
}

function addDecimal() {
  if (!valueText.textContent.includes(".")) updateDisplay(".");
}

function updateDisplay(buttonText) {
  if (startNewValue || valueText.textContent === "0") {
    valueText.textContent = buttonText;
    startNewValue = false;
  } else if (valueText.textContent.length < MAX_CHAR_ALLOWED) {
    valueText.textContent += buttonText;
  }
}

function setOperator() {
  if (startNewValue || !operator) {
    operand1 = !valueText.textContent.includes(".")
      ? parseInt(valueText.textContent)
      : parseFloat(valueText.textContent);
  } else {
    calculate();
  }
  operator = this.textContent;
  startNewValue = true;
}

function add() {
  return operand1 + operand2;
}

function subtract() {
  return operand1 - operand2;
}

function multiply() {
  return operand1 * operand2;
}

function divide() {
  if (operand2 === 0) {
    return "Infinity";
  }
  return parseFloat((operand1 / operand2).toFixed(7));
}

function modulus() {
  return operand1 % operand2;
}

function calculate() {
  operand2 = !valueText.textContent.includes(".")
    ? parseInt(valueText.textContent)
    : parseFloat(valueText.textContent);
  switch (operator) {
    case "+":
      operand1 = add();
      break;
    case "-":
      operand1 = subtract();
      break;
    case "*":
      operand1 = multiply();
      break;
    case "/":
      operand1 = divide();
      break;
    case "%":
      operand1 = modulus();
      break;
    default:
      break;
  }
  valueText.textContent = operand1;
}

function showResult() {
  if (operator) calculate();
  operator = undefined;
  operand2 = undefined;
  startNewValue = true;
}

clearButton.addEventListener("click", clear);
signButton.addEventListener("click", toggleSign);
dotButton.addEventListener("click", addDecimal);
equalButton.addEventListener("click", showResult);
numButtonList.forEach((numButton) => {
  numButton.addEventListener("click", () =>
    updateDisplay(numButton.textContent)
  );
});
operatorButtonList.forEach((operatorButton) => {
  operatorButton.addEventListener("click", setOperator);
});
