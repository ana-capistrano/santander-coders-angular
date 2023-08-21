//Exemplo
function soma(n1, n2){
    return n1 + n2;
}

console.log(soma(2,false));


//THROW

function soma(n1,n2) {
    if(n1 < 0 || n2 < 0) {
        throw RangeErrorError("Numeros informados precisam ser maiores ou iguais a zero");
    }

    return n1 + n2;
}

console.log(soma(2,-10));