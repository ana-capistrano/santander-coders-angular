/* Obtendo o tbody para manipulação */
const tbody = document.querySelector('tbody');

/* Obtendo o modal para manipulação */
const modal = document.querySelector('#formModal');

/* Lista de roupas */
let itens;

/* Armazenando o index da roupa que iremos editar */
/* Inicializado com null para ser setado apenas quando for editar um item */
/* Utilizado para saber se estamos adicionando uma nova roupa ou editando uma existente */
let editIndex = null;

/* Incializando a lista apenas depois de finalizar o carregamento da página */
window.onload = function () {
  itens = new Array();
}

/* Carregar na tabela os itens da lista de roupas */
function carregarTabela() {
  /* Limpa a tabela antes de atualizar para não repetir os elementos anteriores */
  tbody.innerHTML = '';

  index = 0;
  itens.forEach(item => {
    insertItem(item, index);
    index++;
  });
}

/* Inserir item na tabela */
function insertItem(item, index) {
  /* Cria linha na tabela */
  let tr = document.createElement('tr')

  /* Adicionar o conteúdo da linha */
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
  /* Adicionando a linha na tabela */
  tbody.appendChild(tr)
}

/* Limpar o modal */
function clearModal() {
  /* Deselecionar e habilitar os radio buttons */
  document.querySelectorAll('input[name="categoriaRadio"]').forEach(element => {
    element.checked = false;
    element.disabled = false;
  });

  /* Limpar o contéudo dos campos numéricos e textuais */
  document.querySelector('#codigo').value = '';
  document.querySelector('#descricao').value = '';
  document.querySelector('#valor').value = '';
  document.querySelector('#gola').value = '';
  document.querySelector('#manga').value = '';
  document.querySelector('#cintura').value = '';
  document.querySelector('#tipo').value = '';

  /* Remover o index da roupa que estiver sendo editada (se for o caso) */
  editIndex = null;
}

/* Validar os campos do modal para cada categoria */
function validarModal(categoria, codigo, descricao, valor, gola, manga, cintura, tipo) {
  /* Verificar se a categoria foi preenchida */
  if (categoria == null) {
    return 'O preenchimento da categoria é obrigatório!';
  }

  /* Verificar se os campos obrigatórios para todas as categorias foram preenchidos */
  if (codigo.value === '' || descricao.value === '' || valor.value === '') {
    return 'O preenchimento dos campos código, descrição e valor é obrigatório para todas as categorias!';
  }

  /* Verificar se os campos obrigatórios da categoria camisa foram preenchidos */
  if (categoria.value === 'camisa' && (gola.value === '' || manga.value === '')) {
    return 'O preenchimento dos campos gola e manga é obrigatório para a categoria camisa!';
  }

  /* Verificar se os campos obrigatórios da categoria calça foram preenchidos */
  if (categoria.value === 'calca' && (cintura.value === '' || tipo.value === '')) {
    return 'O preenchimento dos campos cintura e tipo é obrigatório para a categoria calça!';
  }

  /* Retornando vazio se todas as validações tiverem sido atendidas */
  return '';
}

/* Salvando a roupa informada no modal  */
/* O mesmo método é utilizado para adicionar e para editar */
/* A diferenciação será feita pela variável editIndex */
function salvarRoupa() {
  /* Obtendo as informações do modal */
  const categoria = document.querySelector('input[name="categoriaRadio"]:checked');
  const codigo = document.querySelector('#codigo');
  const descricao = document.querySelector('#descricao');
  const valor = document.querySelector('#valor');
  const gola = document.querySelector('#gola');
  const manga = document.querySelector('#manga');
  const cintura = document.querySelector('#cintura');
  const tipo = document.querySelector('#tipo');

  /* Validando as informações recebidas */
  let valid = validarModal(categoria, codigo, descricao, valor, gola, manga, cintura, tipo);

  /* Se a validação retornar com alguma mensagem, esta será exibida para o usuário */
  if (valid !== '') {
    alert(valid);
    return;
  }

  /* Setando o modo de edição para false */
  let editMode = false;

  /* Verificando se algum radio button está desabilitado */
  /* Os radios buttins são desabilitados apenas no modo edição porque não é permitido alterar a categoria de uma peça de roupa */
  document.querySelectorAll('input[name="categoriaRadio"]').forEach(element => {
    editMode = editMode || element.disabled;
  });

  /* Verifica se o modo de edição está habilitado */
  if (editMode) {
    /* Atualizando os campos obrigatórios para todas as categorias */
    itens[editIndex].codigo = codigo.value;
    itens[editIndex].descricao = descricao.value;
    itens[editIndex].valor = valor.value;

    /* Se o item for uma instância de Camisa ou de Calça, atualiza os campos pertinentes */
    if (itens[editIndex] instanceof Camisa) {
      itens[editIndex].gola = gola.value;
      itens[editIndex].manga = manga.value;
    } else if (itens[editIndex] instanceof Calca) {
      itens[editIndex].cintura = cintura.value;
      itens[editIndex].tipo = tipo.value;
    }
  } else {
    /* Criando uma nova instância de acordo com a categoria */
    if (categoria.value === 'camisa') {
      itens.push(new Camisa(codigo.value, descricao.value, valor.value, gola.value, manga.value));
    } else if (categoria.value === 'calca') {
      itens.push(new Calca(codigo.value, descricao.value, valor.value, cintura.value, tipo.value));
    } else {
      itens.push(new Roupa(codigo.value, descricao.value, valor.value));
    }
  }

  /* Atualizar a tabela */
  carregarTabela();

  /* Ocultar o modal */
  bootstrap.Modal.getInstance(modal).hide();

  /* Limpar o modal */
  clearModal();
}

/* Carregando o item que será editado e carregando no modal */
function editItem(index) {
  editIndex = index;
  let item = itens[index];

  /* Verificando a instância do item para carregar o radio button correto */
  if (item instanceof Camisa) {
    document.querySelector('#categoriaRadioCamisa').checked = true;
  } else if (item instanceof Calca) {
    document.querySelector('#categoriaRadioCalca').checked = true;
  } else {
    document.querySelector('#categoriaRadioRoupa').checked = true;
  }

  /* Desabilitando os radio buttons */
  /* Não é permitido alterar a categoria da roupa */
  document.querySelectorAll('input[name="categoriaRadio"]').forEach(element => {
    element.disabled = true;
  });

  /* Carregando os campos obrigatórios para todas as categorias */
  document.querySelector('#codigo').value = item.codigo;
  document.querySelector('#descricao').value = item.descricao;
  document.querySelector('#valor').value = item.valor;

  /* Carregando apenas os itens específicos de cada categoria. */
  document.querySelector('#gola').value = item.gola == null ? '' : item.gola;
  document.querySelector('#manga').value = item.manga == null ? '' : item.manga;
  document.querySelector('#cintura').value = item.cintura == null ? '' : item.cintura;
  document.querySelector('#tipo').value = item.tipo == null ? '' : item.tipo;

  /* Exibindo o modal com os dados carregados */
  const myModal = new bootstrap.Modal(modal, {});
  myModal.show();
}

/* Deletar um item da tabela */
function deleteItem(index) {
  /* Deletando o item */
  itens.splice(index, 1);

  /* Atualizar a tabela */
  carregarTabela();
}

/* Classe de Roupa */
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

/* As classes estão no mesmo arquivo porque não consegui importar de outro arquivo */

/* Classe de Camisa */
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

/* Classe de Calça */
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