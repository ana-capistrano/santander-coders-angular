/* Obtendo o tbody para manipulação */
const tbody = document.querySelector('tbody');

/* Obtendo o modal para manipulação */
const modal = document.querySelector('#formModal');

/* Estoque */
let estoque;

/* Incializando a estoque apenas depois de finalizar o carregamento da página */
window.onload = function () {
  estoque = new GestaoEstoque();
}

/* Carregar na tabela os itens do estoque */
function carregarTabela() {
  /* Limpa a tabela antes de atualizar para não repetir os elementos anteriores */
  tbody.innerHTML = '';

  estoque.itens.forEach(item => {
    inserirItemTabela(item);
  });
}

/* Inserir item na tabela */
function inserirItemTabela(item) {
  /* Cria linha na tabela */
  let tr = document.createElement('tr')

  /* Adicionar o conteúdo da linha */
  tr.innerHTML = `
    <td>${item.codigo}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.valor}</td>
    <td>
      <div class="btn-group">
        <button class="btn btn-outline-dark" onclick="editarRoupaModal(${item.id})">Editar</button>
        <button class="btn btn-outline-dark" onclick="deletarRoupaModal(${item.id})">Excluir</button>
      </div>
    </td>
  `
  /* Adicionando a linha na tabela */
  tbody.appendChild(tr)
}

/* Limpar o modal */
function limparModal() {
  /* Deselecionar e habilitar os radio buttons */
  document.querySelectorAll('input[name="categoriaRadio"]').forEach(element => {
    element.checked = false;
    element.disabled = false;
  });

  /* Limpar o contéudo dos campos numéricos e textuais */
  document.querySelector('#id').value = '';
  document.querySelector('#codigo').value = '';
  document.querySelector('#descricao').value = '';
  document.querySelector('#valor').value = '';
  document.querySelector('#gola').value = '';
  document.querySelector('#manga').value = '';
  document.querySelector('#cintura').value = '';
  document.querySelector('#tipo').value = '';
}

/* Validar os campos do modal para cada categoria */
function validarModal(categoria, codigo, descricao, valor, gola, manga, cintura, tipo) {
  /* Verificar se a categoria foi preenchida */
  if (categoria == null) {
    return ['O preenchimento da categoria é obrigatório!'];
  }

  if (categoria.value !== 'roupa' && categoria.value !== 'camisa' && categoria.value !== 'calca') {
    return ['A categoria informada não existe'];
  }

  let validarCampos;

  /* Verificar se os campos obrigatórios da categoria roupa foram preenchidos */
  if (categoria.value === 'roupa') {
    validarCampos = Roupa.validarEntradas(codigo, descricao, valor);
  }

  /* Verificar se os campos obrigatórios da categoria camisa foram preenchidos */
  if (categoria.value === 'camisa') {
    validarCampos = Camisa.validarEntradas(codigo, descricao, valor, gola, manga);
  }

  /* Verificar se os campos obrigatórios da categoria calça foram preenchidos */
  if (categoria.value === 'calca') {
    validarCampos = Calca.validarEntradas(codigo, descricao, valor, cintura, tipo);
  }

  return validarCampos;
}

/* Salvando a roupa informada no modal  */
/* O mesmo método é utilizado para adicionar e para editar */
function salvarRoupaModal() {
  /* Obtendo as informações do modal */
  const id = document.querySelector('#id');
  const categoria = document.querySelector('input[name="categoriaRadio"]:checked');
  const codigo = document.querySelector('#codigo');
  const descricao = document.querySelector('#descricao');
  const valor = document.querySelector('#valor');
  const gola = document.querySelector('#gola');
  const manga = document.querySelector('#manga');
  const cintura = document.querySelector('#cintura');
  const tipo = document.querySelector('#tipo');

  /* Validando as informações recebidas */
  let messageArray = validarModal(categoria, codigo.value, descricao.value, valor.value, gola.value, manga.value, cintura.value, tipo.value);

  /* Se a validação retornar com alguma mensagem, esta será exibida para o usuário */
  if (messageArray.length !== 0) {
    alert('Favor verificar os seguintes campos:\n' + messageArray.join(', '));

    return;
  }

  /* Verifica se vai adicionar ou editar */
  if (id.value === '') {
    /* Criando uma nova instância e adicionando no estoque */
    estoque.adicionarItem(categoria.value, codigo.value, descricao.value, valor.value, gola.value, manga.value, cintura.value, tipo.value);
  } else {
    estoque.atualizarItem(id.value, codigo.value, descricao.value, valor.value, gola.value, manga.value, cintura.value, tipo.value);
  }

  /* Atualizar a tabela */
  carregarTabela();

  /* Ocultar o modal */
  bootstrap.Modal.getInstance(modal).hide();

  /* Limpar o modal */
  limparModal();
}

/* Carregando o item que será editado e exibindo o modal */
function editarRoupaModal(id) {
  const mId = document.querySelector('#id');
  const mCodigo = document.querySelector('#codigo');
  const mDescricao = document.querySelector('#descricao');
  const mValor = document.querySelector('#valor');
  const mGola = document.querySelector('#gola');
  const mManga = document.querySelector('#manga');
  const mCintura = document.querySelector('#cintura');
  const mTipo = document.querySelector('#tipo');

  mId.value = id;

  let item = estoque.obterItemPorId(id);

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
  mCodigo.value = item.codigo;
  mDescricao.value = item.descricao;
  mValor.value = item.valor;

  /* Carregando apenas os itens específicos de cada categoria. */
  mGola.value = item.gola == null ? '' : item.gola;
  mManga.value = item.manga == null ? '' : item.manga;
  mCintura.value = item.cintura == null ? '' : item.cintura;
  mTipo.value = item.tipo == null ? '' : item.tipo;

  /* Exibindo o modal com os dados carregados */
  const myModal = new bootstrap.Modal(modal, {});
  myModal.show();
}

/* Deletar um item da tabela */
function deletarRoupaModal(id) {
  /* Deletando o item */
  estoque.removerItem(id);

  /* Atualizar a tabela */
  carregarTabela();
}

/* As classes estão no mesmo arquivo porque não consegui importar de outro arquivo */

/* Classe de Roupa */
class Roupa {
  #id
  #codigo;
  #descricao;
  #valor;

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  get codigo() {
    return this.#codigo;
  }

  get descricao() {
    return this.#descricao;
  }

  get valor() {
    return this.#valor;
  }

  constructor(codigo, descricao, valor) {
    this.#codigo = codigo;
    this.#descricao = descricao;
    this.#valor = valor;
  }

  static validarEntradas(codigo, descricao, valor) {
    let messageArray = [];

    if (codigo === '') {
      messageArray.push('Código');
    }

    if (descricao === '') {
      messageArray.push('Descrição');
    }

    if (valor === '') {
      messageArray.push('Valor');
    }

    return messageArray;
  }

  atualizar(codigo, descricao, valor, gola, manga, cintura, tipo) {
    this.#codigo = codigo;
    this.#descricao = descricao;
    this.#valor = valor;
  }
}

/* Classe de Camisa */
class Camisa extends Roupa {
  #gola;
  #manga;

  get gola() {
    return this.#gola;
  }

  get manga() {
    return this.#manga;
  }

  constructor(codigo, descricao, valor, gola, manga) {
    super(codigo, descricao, valor);

    this.#gola = gola;
    this.#manga = manga;
  }

  static validarEntradas(codigo, descricao, valor, gola, manga) {
    let messageArray = super.validarEntradas(codigo, descricao, valor);

    if (gola === '') {
      messageArray.push('Gola');
    }

    if (manga === '') {
      messageArray.push('Manga');
    }

    return messageArray;
  }

  atualizar(codigo, descricao, valor, gola, manga, cintura, tipo) {
    super.atualizar(codigo, descricao, valor, gola, manga, cintura, tipo);

    this.#gola = gola;
    this.#manga = manga;
  }
}

/* Classe de Calça */
class Calca extends Roupa {
  #cintura;
  #tipo;

  get cintura() {
    return this.#cintura;
  }

  get tipo() {
    return this.#tipo;
  }

  constructor(codigo, descricao, valor, cintura, tipo) {
    super(codigo, descricao, valor);

    this.#cintura = cintura;
    this.#tipo = tipo;
  }

  static validarEntradas(codigo, descricao, valor, cintura, tipo) {
    let messageArray = super.validarEntradas(codigo, descricao, valor);

    if (cintura === '') {
      messageArray.push('Cintura');
    }

    if (tipo === '') {
      messageArray.push('Tipo');
    }

    return messageArray;
  }

  atualizar(codigo, descricao, valor, gola, manga, cintura, tipo) {
    super.atualizar(codigo, descricao, valor, gola, manga, cintura, tipo);

    this.#cintura = cintura;
    this.#tipo = tipo;
  }
}

class GestaoEstoque {
  #itens;

  get itens() {
    return this.#itens;
  }

  constructor() {
    this.#itens = [];
  }

  obterItemPorId(id) {
    let item = null;

    this.#itens.forEach(element => {
      if (element.id == id) {
        item = element;
      }
    });

    return item;
  }

  adicionarItem(categoria, codigo, descricao, valor, gola, manga, cintura, tipo) {
    let item;

    if (categoria === 'camisa') {
      item = new Camisa(codigo, descricao, valor, gola, manga);
    } else if (categoria === 'calca') {
      item = new Calca(codigo, descricao, valor, cintura, tipo);
    } else {
      item = new Roupa(codigo, descricao, valor);
    }

    let arrayIds = this.#itens.map(item => item.id);
    let maxId = arrayIds.length !== 0 ? Math.max(...arrayIds) : 0;
    item.id = maxId + 1;
    this.#itens.push(item);
  }

  atualizarItem(id, codigo, descricao, valor, gola, manga, cintura, tipo) {
    this.#itens.forEach(element => {
      if (element.id == id) {
        element.atualizar(codigo, descricao, valor, gola, manga, cintura, tipo);
      }
    });
  }

  removerItem(id) {
    let item = this.obterItemPorId(id);
    let index = this.#itens.indexOf(item);
    this.#itens.splice(index, 1);
  }
}