
document.addEventListener("DOMContentLoaded", function() {

    const keys = document.querySelector('.calculator__keys');
    const display = document.getElementById('display');
    const historyDisplay = document.getElementById('history-display');
    const historyButton = document.querySelector('.key--history');

    let firstValue = '';
    let operator = '';
    let waitingForSecondValue = false; 
    let calculationHistory = '';

    if (keys) {
        keys.addEventListener('click', e => {
            if (e.target.matches('button')) {
                const key = e.target;
                const action = key.dataset.action;
                const keyContent = key.textContent;
                const displayedNum = display.textContent;
                

                if (!action) {
                    // number key
                    if (displayedNum === '0' || waitingForSecondValue) {
                        display.textContent = keyContent;
                        waitingForSecondValue = false;
                    } else {
                        display.textContent = displayedNum + keyContent;
                    }
                }
                
                if ( action === 'decimal') {
                    if(!displayedNum.includes('.')){
                        display.textContent = displayedNum + '.';
                    } else if (waitingForSecondValue) {
                        display.textContent = '0.';
                        waitingForSecondValue = false;
                    }                            
                }

                if (action === 'delete') {
                    if (displayedNum > 1) {
                        display.textContent = displayedNum.slice(0, -1);
                    } else {
                        display.textContent = '0';
                    }
                }

                if (action === 'clear') {
                    // reset when clear is pressed
                    display.textContent = '0';
                    firstValue = '';
                    operator = '';
                    waitingForSecondValue = false;

                }

                if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                        if (firstValue && operator && !waitingForSecondValue) {
                            display.textContent = calculate(firstValue, operator, displayedNum);
                        }
                        firstValue = display.textContent;
                        operator = action;
                        waitingForSecondValue = true;

                        calculationHistory += firstValue + keyContent;
                    }

                if (action === 'calculate') {
                    if(firstValue) {
                        display.textContent = calculate(firstValue, operator, displayedNum);

                        calculationHistory += displayedNum;
                        calculationHistory += '=';
                        calculationHistory += display.textContent;


                        historyDisplay.textContent = calculationHistory;
                        
                        firstValue = display.textContent; // store result as first value
                        operator = ''; // reset the operator for next calculation
                        waitingForSecondValue = true; // waits for second value 
                    }
                }
            }
        });

        function calculate(n1, operator, n2) {
            let result = '';
            if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2);
            } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2);
            } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2);
            } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2);
            }
            return result.toString();
        }

        // toggle history button
        historyButton.addEventListener('click', function() {
            historyDisplay.classList.toggle('d-none')
        });
    } 
});