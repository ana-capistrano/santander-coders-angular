const URL = "https://crudcrud.com/api/498dcea4e03a42c08c0967ec95bd6ea4/product";

async function getProduct(id) {
    if (id) {
        const response = await fetch(URL + `/${id}`);
        const product = await response.json();

        nome.value = product.nome
        quantidade.value = product.quantidade
        unidade.value = product.unidade
        preco.value = product.preco
        categoria.value = product.categoria
    }
}

async function addProduct(productObj) {
    const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(productObj),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
}

async function updateProduct(id, productObj) {
    const response = await fetch(URL + `/${id}`, {
        method: "PUT",
        body: JSON.stringify(productObj),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
getProduct(id);

//Create
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const {
        nome: nome_product,
        quantidade,
        unidade,
        preco,
        categoria
    } = event.target;

    const newProduct = {
        nome: nome_product.value,
        quantidade: quantidade.value,
        unidade: unidade.value,
        preco: preco.value,
        categoria: categoria.value
    };

    nomeError.innerText = "";
    quantidadeError.innerText = "";
    unidadeError.innerText = "";
    precoError.innerText = "";
    categoriaError.innerText = "";

    if (newProduct.nome == "") {
        nomeError.innerText = "Nome do produto é obrigatório"
        return;
    }

    if (newProduct.quantidade == "") {
        quantidadeError.innerText = "A quantidade de produtos é obrigatória";
        return;
    }

    if (newProduct.unidade == "") {
        unidadeError.innerText = "Escolha entre UN ou KG é obrigatória";
        return;
    }

    if (newProduct.preco == "") {
        precoError.innerText = "O valor do produto é obrigatório";
        return;
    }

    if (newProduct.categoria == "") {
        categoriaError.innerText = "A categoria do seu produto é obrigatória";
        return;
    }

    if (id) {
        updateProduct(id, newProduct).then(console.log);
    } else {
        addProduct(newProduct).then((data) => console.log(data));
    }

    form.reset();

    var location = window.location.href;
    var directoryPath = location.substring(0, location.lastIndexOf("/") + 1);
    window.location = directoryPath;
});