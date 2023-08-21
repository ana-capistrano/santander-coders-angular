const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => {
    console.log({
        accumulator,
        currentValue
    })
    const result = accumulator * currentValue
    console.log({result})
    return result 
}, 0);

console.log(sum);