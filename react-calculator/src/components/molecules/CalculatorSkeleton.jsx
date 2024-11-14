import React, { useState } from 'react';
import CalculatorButtons from '../atoms/CalculatorButtons';
import FunctionalityKeys from '../atoms/FunctionalityKeys';
import CalculatorScreen from '../atoms/CalculatorScreen';
import './calculator.css';

const CalculatorSkeleton = () => {
       const [screenValue, setScreenValue] = useState('');
       const [result, setResult] = useState('');

       return (
              <div className="calculatorSkeleton">
                     <div className="logo">CASIO</div>
                     <CalculatorScreen screenValue={screenValue} result={result} />
                     <div className="functionalityKeys">
                            <FunctionalityKeys setScreenValue={setScreenValue} setResult={setResult} />
                     </div>
                     <div className="calculatorKeys">
                            <CalculatorButtons
                                   screenValue={screenValue}
                                   setScreenValue={setScreenValue}
                                   setResult={setResult}
                            />
                     </div>
              </div>
       );
};

export default CalculatorSkeleton;
