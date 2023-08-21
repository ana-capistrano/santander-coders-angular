const pessoas = [
    {
            name:"maria"
        idade: 18
    }
    {
        name:"João"
        idade: 33
    }
];
const arr=  pessoas,map (pessoa => ({
    ...pessoa,
    isGreaterThan: pessoa.idade >= 20,
}));

console.log(pessoas);
console.log(arr);