import React, { useState } from 'react';
import '../molecules/calculator.css';

const buttons = [
       { id: 'clear', value: 'C', class: 'symbol-key' },
       { id: 'factorial', value: '!', class: 'symbol-key' },
       { id: 'power', value: '^', class: 'symbol-key' },
       { id: 'delete', value: '←', class: 'symbol-key' },
       { id: 'ln', value: 'ln', class: 'symbol-key' },
       { id: 'percent', value: '%', class: 'symbol-key' },
       { id: 'sqrt', value: '√', class: 'symbol-key' },
       { id: 'divide', value: '/', class: 'operator-key' },
       { id: '7', value: '7', class: 'key' },
       { id: '8', value: '8', class: 'key' },
       { id: '9', value: '9', class: 'key' },
       { id: 'multiply', value: '*', class: 'operator-key' },
       { id: '4', value: '4', class: 'key' },
       { id: '5', value: '5', class: 'key' },
       { id: '6', value: '6', class: 'key' },
       { id: 'subtract', value: '-', class: 'operator-key' },
       { id: '1', value: '1', class: 'key' },
       { id: '2', value: '2', class: 'key' },
       { id: '3', value: '3', class: 'key' },
       { id: 'add', value: '+', class: 'operator-key' },
       { id: '0', value: '0', class: 'key' },
       { id: 'decimal', value: '.', class: 'key' },
       { id: 'equals', value: '=', class: 'key' },
       { id: 'open-parenthesis', value: '(', class: 'symbol-key' },
       { id: 'close-parenthesis', value: ')', class: 'symbol-key' },
       { id: 'extra1', class: 'symbol-key' },
       { id: 'extra2', class: 'symbol-key' },
       { id: 'extra3', class: 'symbol-key' },
];

const CalculatorButtons = ({ screenValue, setScreenValue, result, setResult }) => {
       const clickButtonHandler = (e) => {
              const value = e.target.textContent;
              const id = e.target.id;

              switch (id) {
                     case 'clear':
                            setScreenValue('');
                            setResult('');
                            break;
                     case 'delete':
                            setScreenValue(screenValue.slice(0, -1));
                            break;
                     case 'equals':
                            try {
                                   const calculationResult = calculate(screenValue);
                                   setResult(calculationResult.toString());
                                   setScreenValue('');
                            } catch (error) {
                                   setResult('Error');
                            }
                            break;
                     case 'factorial':
                            const fact = factorial(parseFloat(screenValue));
                            setResult(fact.toString());
                            setScreenValue('');
                            break;
                     case 'power':
                            setScreenValue(screenValue + '**'); // Use '**' for exponentiation
                            break;
                     case 'ln':
                            let resultLn = Math.log(parseFloat(screenValue));
                            setResult(resultLn.toString().slice(0, 4));
                            setScreenValue('');
                            break;
                     case 'percent':
                            setResult((parseFloat(screenValue) / 100).toString());
                            setScreenValue('');
                            break;
                     case 'sqrt':
                            setResult(Math.sqrt(parseFloat(screenValue)).toString().slice(0, 4));
                            setScreenValue('');
                            break;
                     default:
                            if (screenValue === '') {
                                   setScreenValue(value); // Start fresh if the screen is empty
                            } else {
                                   setScreenValue(screenValue + value); // Append the value to the screen
                            }
                            break;
              }
       };

       const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

       const calculate = (expression) => {
              const tokens = expression.match(/(\d+(\.\d*)?|\+|\-|\*|\/|\(|\)|\*\*)/g); // Include '**' explicitly

              const precedence = {
                     '+': 1,
                     '-': 1,
                     '*': 2,
                     '/': 2,
                     '**': 3, // Ensure exponentiation (**) has the correct precedence
              };

              const applyOperator = (operators, values) => {
                     const operator = operators.pop();
                     const right = values.pop();
                     const left = values.pop();

                     switch (operator) {
                            case '+':
                                   values.push(left + right);
                                   break;
                            case '-':
                                   values.push(left - right);
                                   break;
                            case '*':
                                   values.push(left * right);
                                   break;
                            case '/':
                                   if (right === 0) {
                                          throw new Error('Cannot divide by zero');
                                   }
                                   values.push(left / right);
                                   break;
                            case '**':
                                   values.push(Math.pow(left, right)); // Use Math.pow for exponentiation
                                   break;
                            default:
                                   break;
                     }
              };

              const evaluate = (tokens) => {
                     const operators = [];
                     const values = [];

                     for (let i = 0; i < tokens.length; i++) {
                            const token = tokens[i];

                            if (/\d+(\.\d*)?/.test(token)) {
                                   values.push(parseFloat(token)); // Push numbers to the values stack
                            } else if (token === '(') {
                                   operators.push(token); // Open parenthesis
                            } else if (token === ')') {
                                   while (operators[operators.length - 1] !== '(') {
                                          applyOperator(operators, values);
                                   }
                                   operators.pop(); // Pop '(' from operators
                            } else if (['+', '-', '*', '/', '**'].includes(token)) {
                                   while (
                                          operators.length > 0 &&
                                          precedence[operators[operators.length - 1]] >= precedence[token]
                                   ) {
                                          applyOperator(operators, values);
                                   }
                                   operators.push(token); // Push the operator to operators stack
                            }
                     }

                     // Process remaining operators
                     while (operators.length > 0) {
                            applyOperator(operators, values);
                     }

                     return values.pop(); // Final result
              };

              try {
                     return evaluate(tokens);
              } catch (error) {
                     return 'Error'; // Return 'Error' in case of invalid calculations
              }
       };

       return (
              <>
                     {buttons.map((button) => (
                            <button
                                   key={button.id}
                                   id={button.id}
                                   onClick={clickButtonHandler}
                                   className={button.class}
                            >
                                   {button.value}
                            </button>
                     ))}
              </>
       );
};

export default CalculatorButtons;
