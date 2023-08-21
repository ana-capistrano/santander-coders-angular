const listaFibonacci =[0,1];

const criar =(numero => {
    for(let i = 2; i <= numero; i++){
        let num = listaFibonacci [i-1] + listaFibonacci [i-2];
        listaFibonacci.push(num);
    }
     return listaFibonacci;
}

console.log(criarSequencia(12));