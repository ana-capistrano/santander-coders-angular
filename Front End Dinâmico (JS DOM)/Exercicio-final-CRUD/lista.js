const URL = "https://crudcrud.com/api/498dcea4e03a42c08c0967ec95bd6ea4/product";

//Request function
async function getProduct() {
  const response = await fetch(URL);
  return await response.json();
}

async function deleteProduct(id) {
  const response = await fetch(URL + `/${id}`, {
    method: "DELETE"
  });

  if (response.status == 200) return "Produto excluído com sucesso!";
  return "Produto mantido na lista!";
}

//Dom manipulations functions
function createProductElement(product, index) {
  const containerBody = document.querySelector(".containerBody");
  const id = `product-${product._id}`;

  let elem = document.querySelector(`div#${id}`);

  if (elem) return;

  elem = document.createElement("div");
  elem.id = id;
  elem.className = "elem";

  const img = document.createElement("img");
  img.src = `images/product_${index}.jpeg`;
  img.width = "50";

  var location = window.location.href;
  var directoryPath = location.substring(0, location.lastIndexOf("/") + 1);
  const name = document.createElement("a");
  name.innerText = product.nome;
  name.href = `${directoryPath}registro.html?id=${product._id}`;

  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Remover";
  btnDelete.id = "delete";

  btnDelete.addEventListener("click", () => {
    if (confirm(" Tem certeza que deseja excluir este produto?")) {
      elem.remove();
      deleteProduct(product._id).then((msg) => alert(msg));
    }
  });

  elem.appendChild(img);
  elem.appendChild(name);
  elem.appendChild(btnDelete);

  containerBody.appendChild(elem);
}


const interval = setInterval(() => {
  getProduct().then((arrayProducts) => {
    arrayProducts.forEach(createProductElement);
  });
}, 5000);

setTimeout(() => {
  clearInterval(interval);
}, 5000);