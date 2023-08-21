//Exercicio
// Você é um professor, e tem uma lista com alguns alunos(sendo objetos),
// que contém nome, nota1 e nota2. Use o for para percorer esse array
// e calcular a média das duas notas de cada aluno
// Ao final, imprimir o nome do aluno e a sua média
//const listaDeAlunos = [
    //{ nome: 'João', nota1: 8, nota2: 7 },
    //{ nome: 'Maria', nota1: 9, nota2: 8 },
    //{ nome: 'Carlos', nota1: 6, nota2: 5 },
    //{ nome: 'Ana', nota1: 7, nota2: 6 },
    //{ nome: 'Pedro', nota1: 10, nota2: 9 },
    //{ nome: 'Lúcia', nota1: 8, nota2: 7 },
    //{ nome: 'Fernando', nota1: 7, nota2: 6 },
    //{ nome: 'Camila', nota1: 9, nota2: 8 },
    //{ nome: 'Rafael', nota1: 6, nota2: 5 },
    //{ nome: 'Juliana', nota1: 10, nota2: 9 }
  //];

//Resposta

function imprimirNotasMedias(alunos) {
    for (const aluno of alunos) {
        let somaNotas = 0;
        let numNotas = 0;
        for (const propriedade in aluno) {
            if (propriedade.startsWith("nota")) {
                somaNotas += aluno[propriedade];
                numNotas++;
            }
        }
        media = somaNotas / numNotas;
        console.log(`Nome: ${aluno.nome} Média: ${media}`)
    }
}

imprimirNotasMedias(alunos);

//Outra modo de responder

//const alunos = [
    //{ nome: "aluno 1", nota1: 9, nota2: 8 },
    //{ nome: "aluno 2", nota1: 8, nota2: 7 },
    //{ nome: "aluno 3", nota1: 7, nota2: 10 },
    //{ nome: "aluno 4", nota1: 9, nota2: 5 },
    //{ nome: "aluno 5", nota1: 3, nota2: 8 },
    //{ nome: "aluno 6", nota1: 5, nota2: 9 },
  //];
  
  //for (const { nome, nota1, nota2 } of alunos) {
    //const media = (nota1 + nota2) / 2;
  
    //console.log(`O aluno ${nome} tem uma média de ${media}.`);
  //}

  // outro modo de responder
  //function media(aluno) {
    //return (aluno.nota1 + aluno.nota2) / 2;
  //}
  
  //alunos.forEach((aluno) => { 
    //const mediaAlunos = media(aluno);
    //console.log(`${aluno.nome}: Média = ${mediaAlunos}`);
  //});


  // outro modo de responder

  //for (const aluno of alunos) {
    //const media = (aluno.nota1 + aluno.nota2) / 2
       // console.log(`A média das notas do(a) aluno(a)${aluno.nome} é ${media} `);
//}


// outro modo de responder
//for (const aluno of alunos) {
    //let media = (aluno.nota1 + aluno.nota2)/2
    //console.log(`Aluno: ${aluno.nome} | Média ${media}`)
  //}

//  outro modo de responder
//for (const aluno of listaDeAlunos) {
    //console.log(`${aluno.nome} teve média ${(aluno.nota1 + aluno.nota2) / 2}`);
  //}