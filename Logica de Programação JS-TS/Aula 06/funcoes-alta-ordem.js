const statusLogado = (nome) => {
    return `${nome} logo com sucesso no sistema!`;
};

const usuarioLogin = (email, senha) => {
    //implementação do login, de fato
    const nome = "José";
    return statusLogado(nome);
};

const login = usuarioLogin("ana@gmail.com", "senha123!");
console.log(login);