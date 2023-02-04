function calculate(num1, num2, operator) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    let result

    if (operator === '+') {
        result = num1 + num2
    } else if (operator === '-') {
        result = num1 - num2
    } else if (operator === '*') {
        result = num1 * num2
    } else if (operator === '/') {
        result = num1 / num2
    }

    return result;
}

export function setValuesAndCalculate(result){
    if (result) {
        let num1 = result[1]
        let num2 = result[3]
        let operator = result[2]

        return calculate(num1, num2, operator)
    }
}

export function parseInput(input) {
    const regExp = /(\d+)\s*(.)\s*(\d+)/;
    let result = input.toString().match(regExp)
    if (result[3] !== '') {
        return result
    }
}
