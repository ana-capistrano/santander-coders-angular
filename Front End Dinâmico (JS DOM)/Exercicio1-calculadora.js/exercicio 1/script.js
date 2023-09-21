const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // adicionar numero na tela
    addDigit(digit) {
        // Verificar se o numero tem ponto 
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Fazer todas as operações 
    processOperation(operation) {
        // Verificar se o valor é vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // Mudar a operação
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // apresentar o valor e o resultado da operação numerica
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    // Mudança dos valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            
            if (previous === 0) {
                operationValue = current;
            }
          
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // Mudança da operação matematica
    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // uso do botão DEL
    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }

    // Limpar a atual operação matematica
    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    // Limpar todas as operações matematicas
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
        document.getElementById("previous-operation").classList = [];
    }

    // Resultado da operação matematica
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);

        let result = this.previousOperationText.innerText.split(" ")[0];
        let divPreviousOperation = document.getElementById("previous-operation");

        if (result > 20) {
            divPreviousOperation.classList.add("maiorDoQue20");
            divPreviousOperation.classList.remove("menorOuIgualA20");
        } else {
            divPreviousOperation.classList.add("menorOuIgualA20");
            divPreviousOperation.classList.remove("maiorDoQue20");
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (value >= 0 || value === ".") {
            // console.log(value);
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});

