const produtos = [
    {
        name: 'carro',
        valor:'R$2.000,00'
    },
    {
        name: 'moto',
        valor:'R$1.000,00'
    },
    {
        name: 'Bicicleta',
        valor:'R$600,00'
    },
];

produtos.forEach(({name,valor}) => console.log(`${name}Tem valor de ${valor}`));