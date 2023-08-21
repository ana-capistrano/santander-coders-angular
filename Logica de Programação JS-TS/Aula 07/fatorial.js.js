/* faça uma rotina com e sem recursão em JavaScript para encontrar o fatorial de um numero.
n!= n.(n-1).(n-2).(n-3) ... 2,1*/

//sem recursividade
const calculafatorial = (numero) =>{
    let num =1;
    for(i = 1; i <= numero; i++){
        num *=i;
    }
    console.log(num);
}
calcularFatorial(10);

//com recursividade

const calculaFatorialRecursivo = (numero) => {
    if (numero < 0) {
        return null;
    }

    numero <= 1 ? 1 : calculaFatorialRecursivo(--numero) 
}

console.log(calculaFatorialRecursivo(5));

//outro modo de responder

function fatorialRecursivo( n, acc = 1) {
    console.log(n)         //5, 4, 3, 2, 1
    console.log(acc)       //1, 5, 20, 60, 120
    console.log( n* acc)   //5, 20, 60, 120, 120

    if(n < 0) return NaN;
    if(n < 2) return acc;

    return fatorialRecursivo(n - 1, n * acc)
}

