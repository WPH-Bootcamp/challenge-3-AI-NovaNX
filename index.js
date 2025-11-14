
//`'use strict'` mode should be enabled at the beginning of the file.
"use strict";
const prompt = require("prompt-sync")({ sigint: true }); //using prompt-sync that has been imported for user input

const validOperators = ["+", "-", "*", "/", "%", "**"];
let calculationCount = 0; // tracks how many calculations have been completed

//Create a function `getValidNumberInput(promptMessage)` that takes a string as a prompt. Implement a `while` loop to repeatedly ask for input until a valid number is entered.
function getValidNumberInput(promptMessage) {
  while (true) {
    const rawInput = prompt(promptMessage);
    const numericValue = Number(rawInput);

    if (!Number.isNaN(numericValue)) {
      return numericValue;
    }

    console.log(`"${rawInput}" is not a valid number. Please try again.`);
  }
}

//Similarly, create a function `getValidOperatorInput(promptMessage)` that asks for an operator (`+`, `-`, `*`, `/`, `%`, `**`). Use a `while` loop to ensure the input is one of these valid operators.
function getValidOperatorInput(promptMessage) {
  while (true) {
    const operatorInput = prompt(promptMessage).trim();

    for (let i = 0; i < validOperators.length; i += 1) {
      if (operatorInput === validOperators[i]) {
        return operatorInput;
      }
    }

    console.log(
      `Invalid operator. Choose one of the following: ${validOperators.join(
        " "
      )}`
    );
  }
}


//Create separate function declarations for each basic arithmetic operation:
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? "Error: Division by zero!" : a / b;
}

function modulo(a, b) {
  return a % b;
}

function power(a, b) {
  return a ** b;
}

const describeParity = (numberValue) =>
  numberValue % 2 === 0 ? "Even" : "Odd";

//Exit Mechanism (Loops & Conditionals)
//Create a function `askToContinue()` that prompts the user to decide whether to perform another calculation. Acceptable inputs are "yes", "y", "no", or "n" (case-insensitive). Use a `while` loop to validate the input. Use a `while(true)` loop to allow the calculator to run continuously until the user decides to exit.

const askToContinue = function () {
  while (true) {
    const decision = prompt(
      "Do you want to perform another calculation? (yes/no): "
    )
      .trim()
      .toLowerCase();

    if (decision === "yes" || decision === "y") {
      return true;
    }

    if (decision === "no" || decision === "n") {
      return false;
    }

    console.log('Please respond with "yes" or "no".');
  }
};


//Data Type Analysis & Conditional Output
function analyzeResult(result) {
  const safeResult =
    result ?? "Result is undefined or null, something went wrong!"; //Nullish coalescing to handle undefined or null results

  if (safeResult !== result) {
    console.log(safeResult);
    return;
  }

  //Use `typeof` to determine the data type of the result.
  const resultType = typeof result;
  console.log(`Type of result: ${resultType}`);

  //If the result is a number:
  if (resultType === "number") {
    if (result > 0) {
      console.log("The result is positive.");
    } else if (result < 0) {
      console.log("The result is negative.");
    } else {
      console.log("The result is zero.");
    }

    //Use operators `&&` (AND) and `||` (OR) in your conditional checks where appropriate for more complex conditions (e.g., `"Positive and even"`).
    if (Number.isInteger(result)) {
      console.log("The result is an integer.");
      console.log(`Parity: ${describeParity(result)}`);
      if (result > 0 && Number.isInteger(result)) {
        console.log("It is a positive integer.");
      }
    } else {
      console.log("The result is a floating-point number.");
      console.log("Parity: Not applicable for non-integers.");
    }

    if ((result > 100 && result % 5 === 0) || result === 0) {
      console.log(
        "Result meets the special condition (greater than 100 and divisible by 5, or zero)."
      );
    }


    //If the result is a string :
  } else if (resultType === "string") {
    console.log(`Message: ${result}`);
  } else {
    console.log("Unexpected result type encountered.");
  }
}

function runCalculator() {
  console.log("Welcome to the Interactive Calculator & Data Analyzer!");

  while (true) {
    const firstNumber = getValidNumberInput("Enter the first number: ");
    const operator = getValidOperatorInput(
      "Enter an operator (+, -, *, /, %, **): "
    );
    const secondNumber = getValidNumberInput("Enter the second number: ");

    let calculationResult;

    switch (operator) {
      case "+":
        calculationResult = add(firstNumber, secondNumber);
        break;
      case "-":
        calculationResult = subtract(firstNumber, secondNumber);
        break;
      case "*":
        calculationResult = multiply(firstNumber, secondNumber);
        break;
      case "/":
        calculationResult = divide(firstNumber, secondNumber);
        break;
      case "%":
        calculationResult = modulo(firstNumber, secondNumber);
        break;
      case "**":
        calculationResult = power(firstNumber, secondNumber);
        break;
      default:
        calculationResult = "Error: Unknown operator encountered!";
    }

    calculationCount += 1;
    console.log(`\nCalculation #${calculationCount}`);
    console.log(`Result: ${calculationResult}`);
    analyzeResult(calculationResult);

    if (!askToContinue()) {
      console.log("Thanks for using the calculator. Goodbye!");
      break;
    }

    console.log("---");
  }
}

runCalculator();
