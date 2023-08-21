const number = [1, 2, 3, 4, 5];

const filterNumber = (numero, index) => {
    console.log({
        numero,
        index,
        condition: numero % 2 ===1 
    })
    return numero % 2 === 1
}

//const evenNumbers = number.filter(num => num % 2 === 0);
//console.log(evenNumbers);

//const words = ["apple", "banana", "cherry", "date"];
//const longWords = words.filter(word => word.length >= 6);
//console.log(longWords);

