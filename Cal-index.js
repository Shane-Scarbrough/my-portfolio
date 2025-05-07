//Declaration for all variables used in the js code
const total = document.getElementById('total');
const test = document.getElementById('test');

let equationArr = [];
let equation;
let firstNum = [];
let secondNum = [];
let operator;
let firstString;
let secondString;
let mathTotal;
let mathString;

//Function to add the number clicked to the displayed number
function getNum (num) {
    if (operator) {
        if (num === '.' && secondNum.includes('.')) return;

        if (secondNum.length > 0) {
            equationArr.pop(); 
        }
        secondNum.push(num); 
        secondString = secondNum.join(''); 
        equationArr.push(secondString); 
        equation = equationArr.join('');
        total.innerHTML = equation;

    } else {
        if (num === '.' && firstNum.includes('.')) return;

        firstNum.push(num)
        firstString = firstNum.join('')
        total.innerHTML = firstString;
    }
}

//Function to add an operation once clicked and display the operation

function getOperator(operation) {
    // If a result already exists from a previous calculation and no new input has started
    if (mathString && !firstString) {
        firstString = mathString;
        firstNum = firstString.split('');
    }
    
    // If both numbers are present, complete the current operation first
    if (firstString && secondString) {
        equalAll(false); // This sets firstString = result and resets secondNum, etc.
    }
    
    // Set the new operator
    operator = operation;
    
    // Avoid adding operator twice if user clicks multiple operators in a row
    if (equationArr.length === 1) {
        equationArr.push(operator);
    } else if (equationArr.length === 3) {
        equationArr[1] = operator; // Replace operator
    } else if (equationArr.length === 0) {
        equationArr.push(firstString, operator);
    } else {
        equationArr = [firstString, operator]; // Clean start if it got funky
    }
    
    equation = equationArr.join('');
    total.innerHTML = equation;
    
    // Clear second num so we can start fresh on next input
    secondNum = [];
    secondString = null;

}
//Function to complete the entered math equation and return the result to the displayed number
function equalAll(shouldClear = true) {
    let a = parseFloat(firstString);
    let b = parseFloat(secondString);

    switch (operator) {
        case '+': mathTotal = a + b; break;
        case '-': mathTotal = a - b; break;
        case '*': mathTotal = a * b; break;
        case '/': mathTotal = b !== 0 ? a / b : 'Division by zero'; break;
        default: mathTotal = 'Unsupported operator'; break;
    }

    mathString = mathTotal.toString();
    total.innerHTML = mathTotal;

    if (shouldClear) {
        equationClear();
    } else {
        // Soft clear: prepare for chaining
        firstString = mathString;
        firstNum = mathString.split('');
        secondString = null;
        secondNum = [];
        equationArr = [];
    }
}


//Funcation to add the ability to clear everything that has been inputed
function allClear () {
    equationArr = [];
    equation = null;
    firstNum = [];
    secondNum = [];
    operator = null;
    firstString = null;
    secondString = null;
    mathTotal = null;
    mathString = null;
    total.innerHTML = 0;
    firstPercent = null;
    secondPercent = null;
}

//Adds the ability to include positive and negative numbers
function getInteger() {
    if (!operator) {
        // Toggling negative on the first number
        if (firstNum[0]) {
            
            if (!firstNum.includes('-')) {
                firstNum.unshift('-');
                firstString = firstNum.join('');
                total.innerHTML = firstString;
            } else {
                firstNum.shift();
                firstString = firstNum.join('');
                total.innerHTML = firstString;
            }
        }
    } else {
        // Optional: allow toggling negative on the second number
        if (secondNum[0]) { 
            if (!secondString.includes('-')) {
            equationArr.pop();
            secondNum.unshift('-');
            secondString = secondNum.join('');
            equationArr.push(secondString);
            equation = equationArr.join('');
            total.innerHTML = equation; 
            } else {
                equationArr.pop();
                secondNum.shift();
                secondString = secondNum.join('');
                equationArr.push(secondString);
                equation = equationArr.join('');
                total.innerHTML = equation; 
            }
        } 
    }
}
//Adds the ability to convert numbers to their percentage form
function getPercent () {
    if (!operator) {
        if (firstNum[0]) {
            let firstPercent = Number(firstString) / 100;
            firstString = firstPercent.toString();
            firstNum = firstString.split('');
            total.innerHTML = firstString;
        }
    } else {
        if (secondNum[0]) {
            if (secondNum.length > 0) {
                equationArr.pop(); 
            }
            let secondPercent = Number(secondString) / 100;
            secondString = secondPercent.toString();
            secondNum = secondString.split('');
            equationArr.push(secondString);
            equation = equationArr.join('');
            total.innerHTML = equation;
        }
    }
}
//Clears all variables once the math equation has completed to make smooth transition to next math equation
function equationClear () {
    equationArr = [];
    equation = null;
    firstNum = [];
    secondNum = [];
    operator = null;
    firstString = null;
    secondString = null;
}
