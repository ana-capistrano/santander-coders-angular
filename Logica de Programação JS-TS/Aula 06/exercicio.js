/*
  Faça um programa com uma função chamada somaImposto.
  A função possui dois parâmetros formais: taxaImposto, que é a quantia de imposto sobre vendas expressa em porcentagem e custo, que é o custo de um item antes do imposto. 
  A função calcula o valor com o imposto aobre vendas e retorna o valor de custo e o novo valor.
*/

function somaImposto(taxaImposto,custo){
    
    const porcentagem = taxaImposto/100;
    
    const imposto = custo * porcentagem;
    
    const valorFinal = imposto + custo;
    
    return{
        custo: custo,
        imposto:`${imposto}%`,
        valor:`${valorFinal} reais`,
    }
}
     
/* outro modo
function somarImposto (custoProduto, taxaImposto){
    const novoCusto = custoProduto * (taxaImposto/100) + custoProduto;
    return{
        novoCusto,
        custoProduto
    }
    }
console.log (somarImposto(10, 20)); */
    


