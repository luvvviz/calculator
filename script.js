const btnNum = document.querySelectorAll('.number');
const btnOper = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const operationHistory = document.querySelector('#operation-history');
const btnEquals = document.querySelector('#equals');
const btnDel = document.querySelector('#delete');
const btnClear = document.querySelector('#clear');

let firstNum = '';
let secondNum = '';
let newOperation = false;
let oldOperator = '';
let currentOperator = '';
let hasDot = false;

btnNum.forEach(number => 
  number.addEventListener('click', () => {
    appendNumber(number.textContent);
  }));

function appendNumber(number) {
  if (number === '.' && hasDot === false) {
    display.textContent += number;
    hasDot = true;
    return;
  } else if (number === '.' && hasDot === true) {
    return;
  }
  display.textContent += number;
}

btnOper.forEach(operator => 
  operator.addEventListener('click', () => {
    appendOperator(operator.textContent);
  }));

function appendOperator(operator) {
  if (newOperation && display.textContent === '') {
    return;
  }
  if (newOperation) {
    secondNum = display.textContent;
    let result;
    result = operate(oldOperator, firstNum, secondNum);
    firstNum = Math.round(result * 1000) / 1000;
    moveToOperationHistory(operator);
  } else {
  firstNum = display.textContent;
  moveToOperationHistory(operator);
  newOperation = true;
  }
  hasDot = false;
}

function moveToOperationHistory(operator) {
  oldOperator = operator;
  operationHistory.textContent = firstNum + ' ' + operator + ' ';
  display.textContent = '';
}

btnEquals.addEventListener('click', () => {
  if (!newOperation) {
    return;
  }
  secondNum = display.textContent;
  operationHistory.textContent += secondNum;
  result = operate(oldOperator, firstNum, secondNum);
  firstNum = Math.round(result * 1000) / 1000;
  display.textContent = firstNum;
  newOperation = false;
  hasDot = false;
})

btnDel.addEventListener('click', () => {
  display.textContent = display.textContent.slice(0, -1); 
})

btnClear.addEventListener('click', () => {
  firstNum = '';
  secondNum = '';
  newOperation = false;
  oldOperator = '';
  currentOperator = '';
  hasDot = false;
  display.textContent = '';
  operationHistory.textContent = '';
})

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        return 'Error. Division by zero.';
      }
      return a / b;
    default:
      return 'Error';
  }
}