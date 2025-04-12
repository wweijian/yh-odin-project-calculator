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
let enteredNewValue = false;

const MAX_CHAR_ALLOWED = 9;

function clear() {
  valueText.textContent = "0";
  operator = undefined;
  operand1 = undefined;
  operand2 = undefined;
  enteredNewValue = false;
}

function toggleSign() {
  if (valueText.textContent === "0") return;
  valueText.textContent = valueText.textContent.startsWith("-")
    ? valueText.textContent.slice(1)
    : `-${valueText.textContent}`;
}

function addDecimal() {
  if (!enteredNewValue || valueText.textContent === "0") updateDisplay("0.");
  else if (!valueText.textContent.includes(".")) updateDisplay(".");
}

function updateDisplay(buttonText) {
  if (!enteredNewValue || valueText.textContent === "0") {
    valueText.textContent = buttonText;
    enteredNewValue = true;
  } else if (valueText.textContent.length < MAX_CHAR_ALLOWED) {
    valueText.textContent += buttonText;
  }
}

function setOperator(inputOperator) {
  /*
  Prevent clicking on operator causing calculation to be executed when no value
  has been entered and set value for operand 1 when operator is undefined
  */
  if (!enteredNewValue || !operator) {
    operand1 = !valueText.textContent.includes(".")
      ? parseInt(valueText.textContent)
      : parseFloat(valueText.textContent);
  } else calculate();
  operator = inputOperator;
  enteredNewValue = false;
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
  enteredNewValue = false;
}

function clearLastDigit() {
  if (valueText.textContent.length === 1) valueText.textContent = "0";
  else valueText.textContent = valueText.textContent.slice(0, -1);
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
  operatorButton.addEventListener("click", () =>
    setOperator(operatorButton.textContent)
  );
});
window.addEventListener("keydown", (e) => {
  const enteredKey = e.key;
  if (enteredKey >= "0" && enteredKey <= "9") updateDisplay(enteredKey);
  else if (enteredKey === ".") addDecimal();
  else if (["+", "-", "*", "/", "%"].includes(enteredKey))
    setOperator(enteredKey);
  else if (enteredKey === "=") showResult();
  else if (enteredKey === "Backspace") clearLastDigit();
});
