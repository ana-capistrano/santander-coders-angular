const minhaFuncao = (nome, sobrenome, callback) => {
    const nomeCompleto = nome.concat(" ", sobrenome); // `${nome} ${sobrenome}`;
   console.log(callback);
   return callback (nomecompl)
};

const saudar = (nomeCompleto) => `Ola, $(nomeCompleto)`;
const despedir = (nomeCompleto) => `Adeus, $(nomeCompleto`;

console.log("1", minhaFuncao("Ana", "Capistrano", "despedir"));
console.log("2", minhaFuncao("Alvaro", "Ayres", "saudar"));
minhaFuncao("Ana", "Emilia" , console.log);