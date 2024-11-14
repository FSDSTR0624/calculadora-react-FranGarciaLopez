import React from 'react';
import '../molecules/calculator.css';

const CalculatorScreen = ({ screenValue, result }) => {
          return (
                    <div id="calculatorScreen" className="calculatorScreen">
                              <div className="input">{screenValue}</div>
                              <div className="output">{result}</div>
                    </div>
          );
};

export default CalculatorScreen;
