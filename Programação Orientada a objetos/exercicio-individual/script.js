const tbody = document.querySelector('tbody');
const modal = document.querySelector('#formModal');

let itens;
let editIndex = null;

window.onload = function () {
  itens = new Array();
}

function carregarTabela() {
  tbody.innerHTML = '';

  index = 0;
  itens.forEach(item => {
    insertItem(item, index);
    index++;
  });
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.codigo}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.valor}</td>
    <td>
      <div class="btn-group">
        <button class="btn btn-outline-dark" onclick="editItem(${index})">Editar</button>
        <button class="btn btn-outline-dark" onclick="deleteItem(${index})">Excluir</button>
      </div>
    </td>
  `
  tbody.appendChild(tr)
}

function clearModal() {
  document.querySelectorAll('input[name="categoriaRadio"]').forEach(element => {
    element.checked = false;
    element.disabled = false;
  });
  document.querySelector('#codigo').value = '';
  document.querySelector('#descricao').value = '';
  document.querySelector('#valor').value = '';
  document.querySelector('#gola').value = '';
  document.querySelector('#manga').value = '';
  document.querySelector('#cintura').value = '';
  document.querySelector('#tipo').value = '';

  editIndex = null;
}

function validarModal(categoria, codigo, descricao, valor, gola, manga, cintura, tipo) {
  if (categoria == null) {
    return 'O preenchimento da categoria é obrigatório!';
  }

  if (codigo.value === '' || descricao.value === '' || valor.value === '') {
    return 'O preenchimento dos campos código, descrição e valor é obrigatório para todas as categorias!';
  }

  if (categoria.value === 'camisa' && (gola.value === '' || manga.value === '')) {
    return 'O preenchimento dos campos gola e manga é obrigatório para a categoria camisa!';
  }

  if (categoria.value === 'calca' && (cintura.value === '' || tipo.value === '')) {
    return 'O preenchimento dos campos cintura e tipo é obrigatório para a categoria calça!';
  }

  return '';
}

function salvarRoupa() {
  const categoria = document.querySelector('input[name="categoriaRadio"]:checked');
  const codigo = document.querySelector('#codigo');
  const descricao = document.querySelector('#descricao');
  const valor = document.querySelector('#valor');
  const gola = document.querySelector('#gola');
  const manga = document.querySelector('#manga');
  const cintura = document.querySelector('#cintura');
  const tipo = document.querySelector('#tipo');

  let valid = validarModal(categoria, codigo, descricao, valor, gola, manga, cintura, tipo);

  if (valid !== '') {
    alert(valid);
    return;
  }

  let editMode = false;
  document.querySelectorAll('input[name="categoriaRadio"]').forEach(element => {
    editMode = editMode || element.disabled;
  });

  if (editMode) {
    itens[editIndex].codigo = codigo.value;
    itens[editIndex].descricao = descricao.value;
    itens[editIndex].valor = valor.value;

    if (itens[editIndex] instanceof Camisa) {
      itens[editIndex].gola = gola.value;
      itens[editIndex].manga = manga.value;
    } else if (itens[editIndex] instanceof Calca) {
      itens[editIndex].cintura = cintura.value;
      itens[editIndex].tipo = tipo.value;
    }
  } else {
    if (categoria.value === 'camisa') {
      itens.push(new Camisa(codigo.value, descricao.value, valor.value, gola.value, manga.value));
    } else if (categoria.value === 'calca') {
      itens.push(new Calca(codigo.value, descricao.value, valor.value, cintura.value, tipo.value));
    } else {
      itens.push(new Roupa(codigo.value, descricao.value, valor.value));
    }
  }

  carregarTabela();

  bootstrap.Modal.getInstance(modal).hide();
  clearModal();
}

function editItem(index) {
  editIndex = index;
  let item = itens[index];

  if (item instanceof Camisa) {
    document.querySelector('#categoriaRadioCamisa').checked = true;
  } else if (item instanceof Calca) {
    document.querySelector('#categoriaRadioCalca').checked = true;
  } else {
    document.querySelector('#categoriaRadioRoupa').checked = true;
  }

  document.querySelectorAll('input[name="categoriaRadio"]').forEach(element => {
    element.disabled = true;
  });

  document.querySelector('#codigo').value = item.codigo;
  document.querySelector('#descricao').value = item.descricao;
  document.querySelector('#valor').value = item.valor;
  document.querySelector('#gola').value = item.gola == null ? '' : item.gola;
  document.querySelector('#manga').value = item.manga == null ? '' : item.manga;
  document.querySelector('#cintura').value = item.cintura == null ? '' : item.cintura;
  document.querySelector('#tipo').value = item.tipo == null ? '' : item.tipo;

  const myModal = new bootstrap.Modal(modal, {});
  myModal.show();
}

function deleteItem(index) {
  itens.splice(index, 1);
  carregarTabela();
}

class Roupa {
  codigo;
  descricao;
  valor;

  constructor(codigo, descricao, valor) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.valor = valor;
  }

  vestir() {
    console.log("Vestindo a roupa.");
  }

  passar() {
    console.log("Passando a roupa.");
  }

  lavar() {
    console.log("Lavando a roupa.");
  }

}

class Camisa extends Roupa {
  gola;
  manga;

  constructor(codigo, descricao, valor, gola, manga) {
    super(codigo, descricao, valor);
    this.gola = gola;
    this.manga = manga;
  }

  vestir() {
    console.log("Vestindo pela cabeça.")
  }
}

class Calca extends Roupa {
  cintura;
  tipo;

  constructor(codigo, descricao, valor, cintura, tipo) {
    super(codigo, descricao, valor);
    this.cintura = cintura;
    this.tipo = tipo;
  }

  colocarCinto() {
    console.log("Colocando o cinto.")
  }
}