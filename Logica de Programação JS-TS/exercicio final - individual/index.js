//Importar o arquivo enviar email
const enviarEmail = require ("./envia-email.js");

//Criando a lista de clientes
const clientes = [
    {
      "id": 1,
      "nome": "Ana Paula",
      "email": "anapaula@gmail.com",
      "subscribed": true
    },
    {
      "id": 2,
      "nome": "Ana Maria",
      "email": "anamaria@gmail.com",
      "subscribed": false
    },
    {
      "id": 3,
      "nome": "Ana Júlia",
      "email": "anajulia@gmail.com",
      "subscribed": false
    },
    {
      "id": 4,
      "nome": "Ana Carolina",
      "email": "anacarolina@gmail.com",
      "subscribed": false
    },
    {
      "id": 5,
      "nome": "Ana",
      "email": "soana@gmail.com",
      "subscribed": true
    }
  ]

//1. função para verificar se o dia da semana atual é o dia escolhido
  const diaSemana = (diaEscolhido)=>{
    const dia = new Date;
  
    if(dia.getDay() === diaEscolhido){
      return true;
    }

    console.log('Hoje não é dia escolhido!');
    return false;
  }

//2. funções para montar o assunto e o corpo do e-mail a ser enviado
const criarAssuntoEmail = (nome) => {
  return `${nome}! Dê uma olhadinha nos nossos lançamentos desse mês!!`;
}

const criarConteudoEmail = (nome) => {  
    return `Olá, ${nome}!

    Os nossos lançamentos desse mês estão imperdiveis!
    Venha em nossa loja física para ver de pertinho!
    Um gostinho dos nossos produtos, estão aqui:

        - Creta Limited 2023: Veiculo todo revisado, garantia de fabrica, bancos em couro. 
        FINANCINANCIAMOS SEM ENTRADA!!

        - T-CROSS: Veículo revisado com teto solar panorâmico, blindagem 3A, vidros em gel e garantia de 10 ANOS!!
        
        Não perca a chance de conhecer nossos carros pessoalmente!!

        Se você recebeu esse email, apresente ele para um vendedor e terá otimas oportunidades!

        Não perca tempo!`;
 }

 //3. função para enviar o e-mail para cada um dos clientes da lista
 const enviar = (destinatario,assunto,conteudoEmail)=>{
  console.log(enviarEmail(destinatario,assunto,conteudoEmail));
 }

if(diaSemana(1)){
    for(let cliente of clientes){
      if(cliente.subscribed){
        const destinatario = cliente.email;
        const assunto = criarAssuntoEmail(cliente.nome);
        const body = criarConteudoEmail(cliente.nome);

        enviar(destinatario,assunto,body);
      }
    }
}