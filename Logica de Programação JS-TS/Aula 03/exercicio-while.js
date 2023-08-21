//Exercicio
// Você foi convidado para desenvolver um script para realizar os sorteios para uma casa
// de apostas (estilo mega sena). O sorteio consiste em 6 dezenas aleatórias, entre 1 e 60.
// Para gerar um número aleatório, pode-se utilizar o método random(), da biblioteca Math:
// Math.round(Math.random() * 10)

let numero = math.roud(math.randim() * 60)
let numeros = []
let i = 0
while(i<6) {
    numeros.push(math.round(math.ramdom() * 60))
    i++
}

console.log(`E os numeros da rote são!\n ${numeros.join(`,`)}`);


//ou modo de resolver - sem repitir numero

//function sorteiaDezenas(maximo){
  //  return math.round(math.random()* maximo);
//}

//function megaSena() {
    //const dezenas = [];
    //while (dezenas.length < 6) {
        //cont++;
        //const dezenaAleatoria = sorteioDezenas (60);

        //if (!dezenas.includes(dezenaAleatoria)) dezenas.pusj(dezenaAleatoria);
    //}
    //return dezenas;
//}

//outro modo
//function generateMegaSenaNumber() {
  //  const numver:set<any> = new Set();

    //while(Number.size < 6) {
      //  const randomNumber:number = math.floor(x:math.ramdom()* 61)
        //Number.add(randomNumber);
    //}

    //return [...number];
//}

//outro modo
    // let dezenas = []
    // while(dezenas.length < 6){
    //   let n = math.floor(math.ramdom() * 60) + 1
    // if (!dezenas.includes(n)) dezenas.push(n)
    //}
    //console.log(dezenas)