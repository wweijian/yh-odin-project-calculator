const numButtonList = document.querySelectorAll(".num-button");
const operatorButtonList = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector(".clear-button");
const signButton = document.querySelector(".sign-button");
const dotButton = document.querySelector(".dot-button");
const equalButton = document.querySelector(".equal-button");
const valueText = document.querySelector(".value-text");

let operator;
let operand1 = 0;
let operand2 = 0;

function appendDisplayText(inputDigit) {
  if (valueText.textContent.length >= 10) return;
  if (valueText.textContent === "0") valueText.textContent = inputDigit;
  else valueText.textContent += inputDigit;
  // if (operatorCount >= 2) {
  //   const str =
  //     valueText.textContent.substring(0, valueText.textContent.length - 1) +
  //     inputDigit;
  //   valueText.textContent = str;
  //   return;
  // }
  // if (valueText.textContent === "0" || isResult) {
  //   valueText.textContent = inputDigit;
  //   isResult = false;
  // } else valueText.textContent += inputDigit;
}

function numButtonFunction() {
  appendDisplayText(this.textContent);
}

function operatorButtonFunction() {
  operator = this.textContent;
  if (!operand1) operand1 = parseInt(valueText.textContent);
}

function clearButtonFunction() {
  valueText.textContent = "0";
  operator = undefined;
  operand1 = 0;
  operand2 = 0;
}

function signButtonFunction() {
  if (valueText.textContent === "0") return;
  if (valueText.textContent.charAt(0) !== "-")
    valueText.textContent = "-" + valueText.textContent;
  else valueText.textContent = valueText.textContent.slice(1);
}

function dotButtonFunction() {
  if (valueText.textContent.indexOf(".") === -1) valueText.textContent += ".";
}

function add() {
  operand1 = operand1 + operand2;
}

function subtract() {
  operand1 = operand1 - operand2;
}

function multiply() {
  operand1 = operand1 * operand2;
}

function divide() {
  if (operand2 === 0) {
    valueText.textContent = "Infinity";
    return;
  }
  operand1 = parseFloat((operand1 / operand2).toFixed(7));
}

function modulus() {
  operand1 = operand1 % operand2;
}

function equalButtonFunction() {
  switch (operator) {
    case "+":
      add();
      break;
    case "-":
      subtract();
      break;
    case "*":
      multiply();
      break;
    case "/":
      divide();
      break;
    case "%":
      modulus();
      break;
    default:
      break;
  }
}

clearButton.addEventListener("click", clearButtonFunction);
signButton.addEventListener("click", signButtonFunction);
dotButton.addEventListener("click", dotButtonFunction);
equalButton.addEventListener("click", equalButtonFunction);
numButtonList.forEach((numButton) => {
  numButton.addEventListener("click", numButtonFunction);
});
operatorButtonList.forEach((operatorButton) => {
  operatorButton.addEventListener("click", operatorButtonFunction);
});

// let isResult = false;
// let operatorCount = 0;

// function changeDisplayText(text) {
//   valueText.textContent = text;
// }

// function showResult() {
//   const str = valueText.textContent;
//   let startIndex = 0;
//   const operandStack = [];
//   const operatorStack = [];
//   for (let i = 0; i < str.length; i++) {
//     if (!isNumber(str.charAt(i))) {
//       operandStack.push(str.substring(startIndex, i));
//       operatorStack.push(str.charAt(i));
//       startIndex = i + 1;
//     }
//   }
//   if (startIndex !== str.length)
//     operandStack.push(str.substring(startIndex, str.length));
//   if (operandStack.length <= operatorStack.length) return;
//   let total = parseInt(operandStack.shift());
//   while (!!operandStack.length && !!operatorStack.length) {
//     const operand2 = parseInt(operandStack.shift());
//     const operator = operatorStack.shift();
//     if (operand2 === 0 && operator === "/") {
//       valueText.textContent = "Infinity";
//       return;
//     }
//     total = operate(operator, total, operand2);
//   }
//   changeDisplayText(total);
//   isResult = true;
// }
