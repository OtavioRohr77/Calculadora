let visor = document.getElementById('visor');
let currentInput = '';
let currentOperator = '';
let previousInput = '';

function updateVisor(value) {
    visor.textContent = value;
}

function clear() {
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    updateVisor('0');
}

function appendNumber(number) {

    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateVisor(currentInput);
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateVisor(currentInput);
}

function setOperator(operator) {
    if (previousInput !== '') {
        calculate();
    }
    currentOperator = operator;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'X':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    currentOperator = '';
    previousInput = '';
    updateVisor(currentInput);
}


document.querySelectorAll('.numero').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

document.querySelectorAll('.operador').forEach(button => {
    button.addEventListener('click', () => {
        let value = button.textContent;
        if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculate();
        } else {
            setOperator(value);
        }
    });
});
