console.clear();

function soma(n1, n2){
    return n1 + n2 + n3;
}



try{
    console.log(soma(35,87));
} catch (error){

    //console.log("Error/n", error);
    console.log("Tipo do erro:", error.name);
    console.log("Mensagem de erro:", error.mensage);
    console.log("Stack de erro:", error.stack)
}