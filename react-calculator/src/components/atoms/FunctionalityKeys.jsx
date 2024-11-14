import React from 'react';
import '../molecules/calculator.css';

const functionalityKeys = [
          { id: 'shift', label: 'Shift', class: 'symbol-key' },
          { id: 'alpha', label: 'Alpha', class: 'symbol-key' },
          { id: 'mode', label: 'Mode', class: 'symbol-key' },
          { id: 'on', label: 'On', class: 'symbol-key' },
];

const FunctionalityKeys = ({ setScreenValue }) => {
          const handleFunctionalityClick = (e) => {
                    const value = e.target.textContent;
                    setScreenValue((prev) => prev + value);
          };

          return (
                    <>
                              {functionalityKeys.map((key) => (
                                        <button
                                                  key={key.id}
                                                  id={key.id}
                                                  className={`functionality-key ${key.class}`}
                                                  onClick={handleFunctionalityClick}
                                        >
                                        </button>
                              ))}
                    </>
          );
};

export default FunctionalityKeys;
