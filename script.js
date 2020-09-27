class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.readyToReset = false;
    }

    delete() {
        if (this.currentOperand === "Введены неверные параметры"||this.currentOperand ==="Деление на ноль невозможно") {
            this.currentOperand = "";
            return
        }
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        debugger
        if(number ==="."&& this.currentOperand==="") return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "" && operation === "-") {
            this.currentOperand = "-";
            this.updateDisplay();
            return;
        }
        if (this.currentOperand === "-" && operation === "-") return;
        if (this.currentOperand === '') return;
        if (operation === "sqrt") {
            this.operation = operation;
            this.compute();
            return;
        }
        if (this.previousOperand !== '' && this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            if (this.operation !== "sqrt") {
                return;
            }

        function isFloat(n) {
            return Number(n) === n && n % 1 !== 0;
        }

        switch (this.operation) {
            case '+':
                if (isFloat(prev) && isFloat(current)) {
                    let prevInt = prev.toString().split(".")[0]
                    let currentInt = current.toString().split(".")[0]
                    let prevFloat = prev.toString().split(".")[1]
                    let currentFloat = current.toString().split(".")[1];
                    let koef = 10 ** Math.max(currentFloat.length, prevFloat.length);
                    while (currentFloat.length !== prevFloat.length) {
                        if (currentFloat.length > prevFloat.length) {
                            prevFloat += "0"
                        } else {
                            currentFloat += "0"
                        }
                    }
                    let prevFull = prevInt + prevFloat;
                    let currFull = currentInt + currentFloat;
                    computation = (+prevFull + +currFull) / koef;

                } else {
                    computation = prev + current;
                }

                break;
            case '-':
                if (isFloat(prev) && isFloat(current)) {
                    let prevInt = prev.toString().split(".")[0]
                    let currentInt = current.toString().split(".")[0]
                    let prevFloat = prev.toString().split(".")[1]
                    let currentFloat = current.toString().split(".")[1];
                    let koef = 10 ** Math.max(currentFloat.length, prevFloat.length)
                    while (currentFloat.length !== prevFloat.length) {
                        if (currentFloat.length > prevFloat.length) {
                            prevFloat += "0"
                        } else {
                            currentFloat += "0"
                        }
                    }
                    let prevFull = prevInt + prevFloat;
                    let currFull = currentInt + currentFloat;
                    computation = (prevFull - currFull) / koef;

                } else {
                    computation = prev - current;
                }
                break;
            case '*':
                if (isFloat(prev) && isFloat(current)) {
                    let prevInt = prev.toString().split(".")[0]
                    let currentInt = current.toString().split(".")[0]
                    let prevFloat = prev.toString().split(".")[1]
                    let currentFloat = current.toString().split(".")[1];
                    while (currentFloat.length !== prevFloat.length) {
                        if (currentFloat.length > prevFloat.length) {
                            prevFloat += "0"
                        } else {
                            currentFloat += "0"
                        }
                    }
                    let koef = 10 ** (currentFloat.length + prevFloat.length)
                    let prevFull = prevInt + prevFloat;
                    let currFull = currentInt + currentFloat;
                    computation = (prevFull * currFull) / koef;

                } else {
                    computation = prev * current;
                }
                break;
            case '÷':
                if(current===0){
                    computation = "Деление на ноль невозможно";
                    break
                }
                if (isFloat(prev) && isFloat(current)) {
                    let prevInt = prev.toString().split(".")[0];
                    let currentInt = current.toString().split(".")[0];
                    let prevFloat = prev.toString().split(".")[1];
                    let currentFloat = current.toString().split(".")[1];

                    while (currentFloat.length !== prevFloat.length) {
                        if (currentFloat.length > prevFloat.length) {
                            prevFloat += "0"
                        } else {
                            currentFloat += "0"
                        }
                    }
                    let koef = 10 ** (prevFloat.length-currentFloat.length  )
                    let prevFull = prevInt + prevFloat;
                    let currFull = currentInt + currentFloat;
                    computation = (prevFull / currFull) / koef;

                } else {
                    computation = prev / current;
                }
                break;
            case "**":
                computation = prev ** current;
                break;
            case "sqrt":
                if (current > 0) {
                    computation = Math.sqrt(current);
                } else {
                    computation = "Введены неверные параметры"
                }
                break;
            default:
                return;
        }
        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (number === "-") {
            return integerDisplay = "-"
        }
        if (number === "Введены неверные параметры") {
            return integerDisplay = "Введены неверные параметры"

        }
        if(number ==="Деление на ноль невозможно"){
            return integerDisplay = "Деление на ноль невозможно"
        }
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        if (this.previousOperand === "Введены неверные параметры"||this.previousOperand === "Деление на ноль невозможно") {
            this.previousOperand = "";
            this.currentOperand = undefined;

        }
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperandTextElement.textContent === "Введены неверные параметры" ||currentOperandTextElement.textContent ==="Деление на ноль невозможно") {
            currentOperandTextElement.textContent = ""
        }
        if (calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperandTextElement.textContent === "Введены неверные параметры"||currentOperandTextElement.textContent === "Деление на ноль невозможно") {
            currentOperandTextElement.textContent = "";
            calculator.clear()
        } else {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        }

    })
})
equalsButton.addEventListener('click', button => {
    if (currentOperandTextElement.textContent === "Введены неверные параметры"||currentOperandTextElement.textContent === "Деление на ноль невозможно") {
        currentOperandTextElement.textContent = "";
        calculator.clear()
    } else {
        calculator.compute();
        calculator.updateDisplay();
    }

})

allClearButton.addEventListener('click', button => {
    if (currentOperandTextElement.textContent === "Введены неверные параметры"||currentOperandTextElement.textContent ==="Деление на ноль невозможно") {
        currentOperandTextElement.textContent = ""
    }
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    if (currentOperandTextElement.textContent === "Введены неверные параметры"||currentOperandTextElement.textContent ==="Деление на ноль невозможно") {
        currentOperandTextElement.textContent = ""
    }
    calculator.delete();
    calculator.updateDisplay();
})
