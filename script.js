//TODO FAZER QUE A INCLUSÃO DAS FLS SEJA AO LADO DOS CAMPOS DELITOS, APREENSÃO, RESULTADO DA ORIGEM, PEDIDOS, LIMINAR, PARECER DO MP, 1º E 2º GRAU
// JÁ nas teses fazer que a inclusão do fls apareça ao lado da tese no texto


// Exemplo de função para gerar uma chave única (UUID)
function gerarChaveUnica() {
  return URL.createObjectURL(new Blob()).slice(-36);
}

class Classe {
  constructor(nomeExtenso, verbo, agente, dispositivoFavoravel, dispositivoDesfavoravel, sinonimo) {
    this.nomeExtenso = nomeExtenso;
    this.verbo = verbo;
    this.agente = agente;
    this.dispositivoFavoravel = dispositivoFavoravel;
    this.dispositivoDesfavoravel = dispositivoDesfavoravel;
    this.sinonimo = sinonimo;
  }

  selecionadoClasse() {
    registrarEstado();
    if (document.getElementById('classe')) {
      document.getElementById('classe').innerHTML = this.nomeExtenso;
    }
    if (document.getElementById('classe2')) {
      document.getElementById('classe2').innerHTML = this.sinonimo;
    }
    if (document.getElementById('reu')) {
      document.getElementById('reu').innerHTML = this.agente;
    }
    if (document.getElementById('VERBO')) {
      document.getElementById('VERBO').innerHTML = this.verbo;
    }
  }
}

const HC = new Classe("<i>habeas corpus</i>", "impetrado em favor de", "paciente", "<b>concedo a ordem.</b>", "<b>denego a ordem.</b>", "<i>writ</i>");
const RHC = new Classe("recurso ordinário em <i>habeas corpus</i>", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso ordinário");
const REsp = new Classe("recurso especial", "interposto por", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso especial");
const AREsp = new Classe("agravo em recurso especial", "interposto por", "agravante", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo em recurso especial");
const agrg = new Classe("agravo regimental", "interposto por", "agravante", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo regimental");
const edcl = new Classe("embargos de declaração", "opostos por", "embargante", "<b>acolho os embargos.</b>", "<b>rejeito os embargos.</b>", "embargos de declaração");

// Função para salvar o estado no arquivo temporário, agora aceitando uma chave de sessão
async function salvarEstado(chaveSessao, estado) {
  try {
    const response = await fetch('/saveState', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chaveSessao, estado }),
    });
    if (!response.ok) throw new Error('Erro ao salvar o estado');
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para obter o estado do arquivo temporário
async function obterEstado() {
  try {
    const response = await fetch('/getState');
    if (!response.ok) throw new Error('Erro ao obter o estado');
    const estado = await response.json();
    return estado;
  } catch (error) {
    console.error('Erro:', error);
    throw error; // Rejeita a promessa com o erro

  }
}

// Controle de estados em memória para desfazer/refazer
let estados = [];
let estadosRefazer = [];

// Função para registrar o estado atual dos elementos
async function registrarEstado() {
  const elements = {
    classe: document.getElementById('classe'),
    classe2: document.getElementById('classe2'),
    reu: document.getElementById('reu'),
    VERBO: document.getElementById('VERBO'),
    se_liminar: document.getElementById('se_liminar'),
    se_liminar2: document.getElementById('se_liminar2'),
    pedidoLiminar: document.getElementById('pedidoLiminar'),
    resultadoQuo: document.getElementById('resultadoQuo'),
    DELITO: document.getElementById('DELITO'),
    dosDelitos: document.getElementById('dosDelitos'),
    tesesSelecionadas: document.getElementById('tesesSelecionadas'),
    informacoes: document.getElementById('informacoes'),
    pedidoPrincipal1: document.getElementById('pedidoPrincipal1'),
    resultadoTese: document.getElementById('resultadoTese'),
    dispositivo: document.getElementById('dispositivo'),
    primeiroGrau: document.getElementById('primeiroGrauTexto'),
  };

  const estadoAtual = {};
  for (let key in elements) {
    if (elements[key]) {
      estadoAtual[key] = elements[key].innerHTML;
    }
  }

  const estadoAtualCopy = Object.assign({}, estadoAtual);

  // Adicionar a cópia do estado atual às arrays
  estados.push(estadoAtualCopy);
  estadosRefazer = []; // Limpar estadosRefazer ao registrar um novo estado
  
  await salvarEstado(estados);
}

// Função para desfazer a última ação
async function desfazer() {
  if (estados.length > 1) {
    const estadoAnterior = estados.pop(); // Remove o último estado
    estadosRefazer.push(estadoAnterior); // Adiciona o estado removido à lista de refazer
    const estado = estados[estados.length - 1]; // Pega o novo estado atual

    for (let key in estado) {
      if (document.getElementById(key)) {
        document.getElementById(key).innerHTML = estado[key];
      }
    }

    

    await salvarEstado(estados); // Salva o estado atual após desfazer
  }
}


window.check = check;
// Definição da função check
function check() {
  
  registrarEstado();

  const classes = {
    'HC': HC,
    'RHC': RHC,
    'RESP': REsp,
    'ARESP': AREsp,
    'agrg': agrg,
    'edcl': edcl
  };

  for (let id in classes) {
    if (document.getElementById(id) && document.getElementById(id).checked) {
      classes[id].selecionadoClasse();
      return classes[id];
    }
  }

  if (document.getElementById('analise_liminar') && document.getElementById('analise_liminar').checked) {
    document.getElementById("se_liminar").innerHTML = "com pedido liminar";
    document.getElementById('se_liminar2').innerHTML = "";
    document.getElementById('pedidoLiminar').innerHTML = ', liminarmente e no mérito,';
  } else if (document.getElementById('analise_merito') && document.getElementById('analise_merito').checked) {
    document.getElementById('se_liminar').innerHTML = "";
  } else if (document.getElementById('sem_liminar') && document.getElementById('sem_liminar').checked) {
    document.getElementById('se_liminar').innerHTML = "";
    document.getElementById('se_liminar2').innerHTML = "Não houve pedido liminar.";
  }
}

function selecionaResultado(id) {
  registrarEstado();

  const resultadoQuo = document.getElementById('resultadoQuo');
  if (resultadoQuo) {
    if (id === 'concedeu') {
      resultadoQuo.innerHTML = 'concedeu o <i>habeas corpus</i>.';
    } else if (id === 'denegou') {
      resultadoQuo.innerHTML = 'denegou o <i>habeas corpus</i>.';
    } else if (id === 'concedeuParcial') {
      resultadoQuo.innerHTML = 'concedeu parcialmente o <i>habeas corpus</i>.';
    } else if (id === 'naoConheceu') {
      resultadoQuo.innerHTML = 'não conheceu do <i>habeas corpus</i>.';
    } else if (id === 'semResultado') {
      resultadoQuo.innerHTML = 'não se manifestou.';
    } else if (id === 'negouProvimento') {
      resultadoQuo.innerHTML = 'negou provimento ao recurso.';
    } else if (id === 'deuProvimento') {
      resultadoQuo.innerHTML = 'deu provimento ao recurso.';
    } else if (id === 'deuParcialProvimento') {
      resultadoQuo.innerHTML = 'deu parcial provimento ao recurso.';
    }
  }
}

var contadorDelito = [];
var contadorPedidos = [];
var contadorTeses = [];

/*function digitaFls() {
  registrarEstado();

  var x = document.getElementById("eSTJfls");
  if (x) {
    var node = document.createElement("span");
    var textnode = document.createTextNode('(e-STJ fls. ' + x.value + ')');
    node.appendChild(textnode);
    document.getElementById("folhasSTJ").appendChild(node);
  }
}

*/


document.addEventListener('DOMContentLoaded', function () {
    registrarEstado();
    const inputs = document.querySelectorAll('input[type="text"]');

    inputs.forEach(input => {
        // Verificar se o ID do input corresponde ao padrão 'input1', 'input2', etc.
        if (/^input\d+$/.test(input.id)) {
            input.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9/]/g, ''); // Permitir apenas números e '/'
            });

            input.addEventListener('keypress', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    formatInput(this);
                }
            });
        }
    });
});

function formatInput(input) {
    registrarEstado();
    const value = input.value;
    if (!value) return;

    const parts = value.split('/');
    if (parts.length > 2) {
        alert('Formato inválido. Use apenas um "/" para separar dois números.');
        return;
    }

    const formattedParts = parts.map(part => {
        return parseInt(part, 10).toLocaleString('pt-BR');
    });

    const formattedValue = formattedParts.join('/');
    const prefix = formattedParts.length > 1 ? '(e-STJ fls. ' : '(e-STJ fl. ';
    const finalText = prefix + formattedValue + ').';

    const node = document.createElement("span");
    const textnode = document.createTextNode(finalText);
    node.appendChild(textnode);

    // Substituir o campo de entrada pelo texto formatado
    input.parentNode.replaceChild(node, input);
}



const faseLiminar = {
  liminarComLiminar: 'com pedido liminar',
  meritoComLiminar: 'com pedido liminar',
  semLiminar: ''
};

function selecionaFase(argumento5) {
  registrarEstado();

  const seLiminar = document.getElementById('se_liminar');
  const informacoes = document.getElementById('informacoes');
  if (seLiminar && informacoes) {
    seLiminar.innerHTML = faseLiminar[argumento5];
    if (argumento5 != 'liminarComLiminar') {
      informacoes.innerHTML = 'Informações prestadas';
    }
  }
}

const delito = {
  trafico: ' tráfico de drogas',
  assocTrafico: ' associação para o tráfico',
  roubo: ' roubo',
  furto: ' furto',
  homicidio: ' homicídio',
  estuproVuln: ' estupro de vulnerável',
  orcrim: ' organização criminosa',
  estelionato: ' estelionato',
  lavagemDinheiro: ' lavagem de dinheiro',
  corrupcao: ' corrupção',
  tortura: ' tortura',
  contrabando: ' contrabando',
  descaminho: ' descaminho',
  armas: ' porte ilegal de armas',
  sequestro: ' sequestro',
  estupro: ' estupro',
  receptacao: ' receptação',
};

var contadorDelito = [];

function searchTipoPenal() {
    var input, filter, results, i;
    input = document.getElementById('tipoPenal');
    if (!input) return;
    input.setAttribute('autocomplete', 'off');

    filter = input.value.toUpperCase();
    results = document.getElementById('searchTipoPenal');
    if (!results) return;
    results.innerHTML = '';

    for (i in delito) {
        if (delito[i].toUpperCase().includes(filter)) {
            var option = document.createElement('option');
            option.value = delito[i];
            option.text = delito[i];
            results.appendChild(option);
        }
    }
    results.size = results.length;

    results.addEventListener('click', function (event) {
        registrarEstado();

        if (event.target.tagName === 'OPTION') {
            var selectedDelitoText = event.target.value;

            // Verifica se o delito já foi adicionado
            if (!contadorDelito.includes(selectedDelitoText)) {
                contadorDelito.push(selectedDelitoText);
                atualizarVisualizacaoDelitos();
            }
            // Remove o alerta e mantém a funcionalidade de esconder a lista e limpar o campo de entrada
            results.style.display = 'none'; // Esconde a lista de resultados
            input.value = ''; // Limpa o campo de entrada
        }
    });

    // Adiciona evento de clique ao campo de entrada para selecionar a única opção
    input.addEventListener('click', function () {
        if (results.options.length === 1) {
            var selectedDelitoText = results.options[0].value;

            // Verifica se o delito já foi adicionado
            if (!contadorDelito.includes(selectedDelitoText)) {
                contadorDelito.push(selectedDelitoText);
                atualizarVisualizacaoDelitos();
            }
            // Remove o alerta e mantém a funcionalidade de esconder a lista e limpar o campo de entrada
            results.style.display = 'none'; // Esconde a lista de resultados
            input.value = ''; // Limpa o campo de entrada
        }
    });

    if (input.value.trim() === '') {
        results.style.display = 'none';
    } else {
        results.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var tipoPenalInput = document.getElementById('tipoPenal');
    if (tipoPenalInput) {
        tipoPenalInput.addEventListener('click', function () {
            searchTipoPenal();
        });

        tipoPenalInput.addEventListener('keyup', function () {
            searchTipoPenal();
        });
    } else {
        console.error('Elemento com ID "tipoPenal" não encontrado.');
    }
});

function atualizarVisualizacaoDelitos() {
    registrarEstado();

    var pDelitosSelecionados = document.getElementById('DELITO');
    var textoDosDelitos = document.getElementById('dosDelitos');

    
               if (contadorDelito.length > 1) {
            var delitosTexto = contadorDelito.join(', ').replace(/, ([^,]*)$/, ' e $1');
            textoDosDelitos.innerHTML = "dos delitos de " + delitosTexto;
            pDelitosSelecionados.style.display = 'block';
        } else if (contadorDelito.length === 1) {
            textoDosDelitos.innerHTML = "do delito de " + contadorDelito[0];
            pDelitosSelecionados.style.display = 'block';
        } else {
            textoDosDelitos.innerHTML = "";
            pDelitosSelecionados.style.display = 'none';
        }
    }


document.addEventListener('DOMContentLoaded', function() {
  var inputTexto = document.getElementById('inputTexto');
  if (inputTexto) {
    inputTexto.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        registrarEstado();

        var texto = inputTexto.value;
        var paragrafoTexto = document.getElementById('paragrafoTexto');
        if (paragrafoTexto) {
          // Cria um novo nó de texto com o valor do input
          var textoNode = document.createTextNode(texto);
          // Insere o texto no lugar do input
          paragrafoTexto.insertBefore(textoNode, inputTexto);
          // Remove o input do parágrafo
          paragrafoTexto.removeChild(inputTexto);
        }
        event.preventDefault();
      }
    });
  }
});

// Variável global para rastrear o índice do marcador de letras
var letterIndex = 0;

// Variável global para rastrear se o evento de clique já foi adicionado
var clickEventAdded = false;



document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('conversaoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var maconha = document.getElementById('maconha').value ? document.getElementById('maconha').value : null;
    var cocaina = document.getElementById('cocaina').value ? document.getElementById('cocaina').value : null;
    var crack = document.getElementById('crack').value ? document.getElementById('crack').value : null;
    var outros = document.getElementById('outros').value ? document.getElementById('outros').value : null;
    var armas = document.getElementById('armas').value ? document.getElementById('armas').value : null;

    var resultadoApreensao = document.getElementById('resultadoApreensao');
    resultadoApreensao.innerHTML = ''; // Limpa o conteúdo do elemento 'resultadoApreensao'

    var apreensoes = [];

    if (maconha) {
      var texto = '';
      if (maconha >= 1000000) {
        texto = '<b>Maconha</b>: ' + (maconha / 1000000).toLocaleString('pt-BR') + ' toneladas';
      } else if (maconha >= 1000) {
        texto = '<b>Maconha</b>: ' + (maconha / 1000).toLocaleString('pt-BR') + ' quilogramas';
      } else {
        texto = '<b>Maconha</b>: ' + maconha.toLocaleString('pt-BR') + ' gramas';
      }
      apreensoes.push(texto);
    }
    if (cocaina) {
      var texto = '';
      if (cocaina >= 1000000) {
        texto = '<b>Cocaína</b>: ' + (cocaina / 1000000).toLocaleString('pt-BR') + ' toneladas';
      } else if (cocaina >= 1000) {
        texto = '<b>Cocaína</b>: ' + (cocaina / 1000).toLocaleString('pt-BR') + ' quilogramas';
      } else {
        texto = '<b>Cocaína</b>: ' + cocaina.toLocaleString('pt-BR') + ' gramas';
      }
      apreensoes.push(texto);
    }
    if (crack) {
      var texto = '';
      if (crack >= 1000000) {
        texto = '<b><i>Crack</i></b>: ' + (crack / 1000000).toLocaleString('pt-BR') + ' toneladas';
      } else if (crack >= 1000) {
        texto = '<b><i>Crack</i></b>: ' + (crack / 1000).toLocaleString('pt-BR') + ' quilogramas';
      } else {
        texto = '<b><i>Crack</i></b>: ' + crack.toLocaleString('pt-BR') + ' gramas';
      }
      apreensoes.push(texto);
    }
    if (outros) {
      var texto = '<b>Outros</b>: ' + outros.toLocaleString('pt-BR');
      apreensoes.push(texto);
    }
    if (armas) {
      var texto = '<b>Armas</b>: ' + armas;
      apreensoes.push(texto);
    }

    if (apreensoes.length > 0) {
      var paragrafoIntro = document.createElement('p');
      paragrafoIntro.innerHTML = 'Foram apreendidas:';
      resultadoApreensao.appendChild(paragrafoIntro);

      for (var i = 0; i < apreensoes.length; i++) {
        var novoParagrafo = document.createElement('p');
        novoParagrafo.innerHTML = apreensoes[i] + (i === apreensoes.length - 1 ? '.' : ';');
        resultadoApreensao.appendChild(novoParagrafo);
      }
    }


  })
});


function searchTese() {
  var input, filter, results, i, tese, tags, count = 0;
  input = document.getElementById('search');
  if (!input) return;
  input.setAttribute('autocomplete', 'off');

  filter = input.value.toUpperCase();
  results = document.getElementById('searchResults');
  if (!results) return;
  results.innerHTML = '';

  fetch('teses.json')
    .then(response => response.json())
    .then(data => {
      for (i = 0; i < data.teses.length; i++) {
        tese = data.teses[i];
        tags = tese.tags || '';
        if ((tese.tese && tese.tese.toUpperCase().indexOf(filter) > -1) || (tags && tags.toUpperCase().indexOf(filter) > -1) || tese.id.toString() === input.value) {
          var option = document.createElement('option');
          option.value = tese.tese;
          option.text = tese.id + " - " + tese.tese; // Inclui o id da tese no texto
          results.appendChild(option);
          count++;
        }
      }
      results.size = results.length; // Define o tamanho do select para o número de opções
    });

  // Adiciona o evento de clique apenas se ele ainda não foi adicionado
  if (!clickEventAdded) {
    results.addEventListener('click', function(event) {
      registrarEstado();

      if (event.target.tagName === 'OPTION') {
        var selectedTeseText = event.target.value;

        var selectedTese = document.getElementById('tesesSelecionadas');

        // Verifica se a tese já foi adicionada
        var alreadyAdded = Array.from(selectedTese.getElementsByTagName('p')).some(p => p.textContent.slice(3) === selectedTeseText);
        if (alreadyAdded) {
          alert('Esta tese já foi adicionada.');
          return;
        }

        // Cria um novo parágrafo para a tese selecionada
        var p = document.createElement('p');
        // Adiciona o marcador de letras correspondente
        p.textContent = String.fromCharCode(97 + letterIndex) + ") " + selectedTeseText;
        selectedTese.appendChild(p);

        // Duplica o código para adicionar a tese ao elemento teseEnfrentar
        var p2 = document.createElement('p');
        p2.textContent = String.fromCharCode(97 + letterIndex).toLocaleLowerCase() + ") " + selectedTeseText;

        // Atualiza o índice do marcador de letras
        letterIndex++;

        // Remove a tese selecionada dos resultados
        event.target.remove();

        // Fecha o select de resultados
        results.size = 0;

        // Limpa o campo de busca
        input.value = '';

        // Remove todas as teses dos resultados
        results.innerHTML = '';
      }
    });

    // Marca que o evento de clique foi adicionado
    clickEventAdded = true;
  }
}

// Variável global para rastrear o índice do marcador de letras para pedidos
var letterIndexPedido = 0;

// Variável global para rastrear se o evento de clique já foi adicionado para pedidos
var clickEventAddedPedido = false;

function searchPedidoFuncao() {
  registrarEstado();

  var input, filter, results, i, pedido, tags, count = 0;
  input = document.getElementById('pedido');
  if (!input) return;
  input.setAttribute('autocomplete', 'off');

  filter = input.value.toUpperCase();
  results = document.getElementById('searchPedido');
  if (!results) return;
  results.innerHTML = '';

  fetch('pedidos.json')
    .then(response => response.json())
    .then(data => {
      for (i = 0; i < data.pedidos.length; i++) {
        pedido = data.pedidos[i];
        tags = pedido.tags || '';
        if ((pedido.pedido && pedido.pedido.toUpperCase().indexOf(filter) > -1) || (tags && tags.toUpperCase().indexOf(filter) > -1) || pedido.id.toString() === input.value) {
          var option = document.createElement('option');
          option.value = pedido.pedido;
          option.text = pedido.id + " - " + pedido.pedido; // Inclui o id do pedido no texto
          results.appendChild(option);
          count++;
        }
      }
      results.size = results.length; // Define o tamanho do select para o número de opções
    });

  // Adiciona o evento de clique apenas se ele ainda não foi adicionado
  if (!clickEventAddedPedido) {
    results.addEventListener('click', function (event) {
      registrarEstado();

      if (event.target.tagName === 'OPTION') {
        var selectedPedidoText = event.target.value;

        var selectedPedido = document.getElementById('pedidoPrincipal1');

        // Verifica se o pedido já foi adicionado
        var alreadyAdded = Array.from(selectedPedido.getElementsByTagName('p')).some(p => p.textContent.slice(4) === selectedPedidoText);
        if (alreadyAdded) {
          alert('Este pedido já foi adicionado.');
          return;
        }

        // Cria um novo parágrafo para o pedido selecionado
        var p = document.createElement('p');
        // Adiciona o marcador de letras correspondente
        p.textContent = String.fromCharCode(97 + letterIndexPedido) + ") " + selectedPedidoText;
        selectedPedido.appendChild(p);

        // Atualiza o índice do marcador de letras
        letterIndexPedido++;

        // Remove o pedido selecionado dos resultados
        event.target.remove();

        // Fecha o select de resultados
        results.size = 0;

        // Limpa o campo de busca
        input.value = '';

        // Remove todos os pedidos dos resultados
        results.innerHTML = '';
      }
    });

    // Marca que o evento de clique foi adicionado
    clickEventAddedPedido = true;
  }
}

var pedidos = {
  substituir: 'Subsidiariamente, pleiteia a substituição da prisão preventiva por medidas cautelares diversas.'
};
var pedidoSelecionado = null;

function selecionaPedido(id) {
  registrarEstado();

  const pedidoPrincipal = document.getElementById('pedidoPrincipal1');
  if (!pedidoPrincipal) return;

  if (pedidoSelecionado === id) {
    // Se o id já está selecionado, desmarque-o
    pedidoSelecionado = null;
    pedidoPrincipal.innerHTML = '';
  } else {
    // Se o id não está selecionado, selecione-o
    pedidoSelecionado = id;
    pedidoPrincipal.innerHTML = pedidos[id];
  }
}

var liminar = {
  deferida: 'O pedido liminar foi deferido.',
  indeferida: 'O pedido liminar foi indeferido.',
  semPedido: 'Não houve pedido liminar.'
};

function selecionaLiminar(argumento4) {
  registrarEstado();

  const se_liminar2 = document.getElementById('se_liminar2');
  const pedidoLiminar = document.getElementById('pedidoLiminar');
  if (!se_liminar2 || !pedidoLiminar) return;

  se_liminar2.innerHTML = liminar[argumento4];
  if (argumento4 == 'semPedido') {
    pedidoLiminar.innerHTML = '';
    se_liminar.innerHTML = '';

  }
}

var parecer = {
  naoConhecimento: 'pelo não conhecimento da ordem.',
  denegacao: 'pela denegação da ordem.',
  concessao: 'pela concessão da ordem.',
  provimento: 'pelo provimento do recurso.',
  desprovimento: 'pelo desprovimento do recurso.'
};

function selecionaParecer(argumento1) {
  registrarEstado();

  const parecerMinisterial = document.getElementById('parecerMinisterial');
  const parecerClasse = document.getElementById('parecerClasse');
  if (!parecerMinisterial || !parecerClasse) return;

  parecerMinisterial.innerHTML = 'O Ministério Público Federal manifestou-se ';
  parecerClasse.innerHTML = parecer[argumento1];
}


function primeiroGrau() {
  registrarEstado();

  const input = document.getElementById('primeiroGrau');
  const primeiroGrauTexto = document.getElementById('primeiroGrauTexto');
  if (!input || !primeiroGrauTexto) return;

  // Verificar se há um conteúdo duplicado para evitar adicioná-lo duas vezes
  if (primeiroGrauTexto.innerHTML.includes(input.value)) return;

  // Cria um elemento p2 para o cabeçalho
  const p2 = document.createElement('p');
  p2.innerHTML = "Assim se manifestou o Juízo de 1º Grau, <i>ipsis litteris</i>:";
  primeiroGrauTexto.appendChild(p2);

  // Divide o texto de entrada em parágrafos
  input.value.split('\n').forEach(paragraphText => {
    if (paragraphText.trim() !== '') { // Ignora linhas vazias
      const p = document.createElement('p');
      p.style.fontStyle = 'italic';
      p.style.paddingLeft = '3.1cm';
      p.style.textIndent = '0';
      p.style.fontSize = '11pt';
      p.textContent = paragraphText;
      primeiroGrauTexto.appendChild(p);
    }
  });

  input.value = '';
}

function segundoGrau() {
  registrarEstado();

  const input = document.getElementById('segundoGrau');
  const segundoGrauTexto = document.getElementById('segundoGrauTexto');
  if (!input || !segundoGrauTexto) return;

  // Verificar se há um conteúdo duplicado para evitar adicioná-lo duas vezes
  if (segundoGrauTexto.innerHTML.includes(input.value)) return;

  // Cria um elemento p2 para o cabeçalho
  const p2 = document.createElement('p');
  p2.innerHTML = "A Corte de origem fundamentou seu entendimento nos seguintes termos, <i>in verbis</i>:";
  segundoGrauTexto.appendChild(p2);

  // Divide o texto de entrada em parágrafos
  input.value.split('\n').forEach(paragraphText => {
    if (paragraphText.trim() !== '') { // Ignora linhas vazias
      const p = document.createElement('p');
      p.style.fontStyle = 'italic';
      p.style.paddingLeft = '3.1cm';
      p.style.textIndent = '0';
      p.style.fontSize = '11pt';
      p.textContent = paragraphText;
      segundoGrauTexto.appendChild(p);
    }
  });

  input.value = '';
}


function desfazerPrimeiroGrau() {
  document.getElementById('primeiroGrauTexto').innerHTML = '';
}

function desfazerSegundoGrau() {
  document.getElementById('segundoGrauTexto').innerHTML = '';
}




function removeAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function searchResultadoFuncao() {
  registrarEstado();

  var input, filter, results, i, resultado, tags, count = 0;
  input = document.getElementById('resultado');
  if (!input) return;
  input.setAttribute('autocomplete', 'off');

  filter = input.value.toUpperCase();
  results = document.getElementById('searchResultado');
  if (!results) return;
  results.innerHTML = '';

  fetch('resultados.json')
    .then(response => response.json())
    .then(data => {
      var keywords = filter.split(' ').map(keyword => removeAcentos(keyword));

      for (i = 0; i < data.resultados.length; i++) {
        resultado = data.resultados[i];
        tags = resultado.tags || '';
        var tagsUpper = removeAcentos(tags.toUpperCase());

        var allKeywordsFound = keywords.every(keyword => tagsUpper.indexOf(keyword.toUpperCase()) > -1);

        if ((resultado.resultado && removeAcentos(resultado.resultado.toUpperCase()).indexOf(filter) > -1) || allKeywordsFound || resultado.id.toString() === input.value) {
          var option = document.createElement('option');
          option.value = resultado.resultado + '|' + resultado.precedente;
          option.text = resultado.id + " - " + resultado.resultado + " - " + resultado.precedente;
          results.appendChild(option);
          count++;
        }
      }
      results.size = results.length;
    });

  results.addEventListener('click', function (event) {
    registrarEstado();

    if (event.target.tagName === 'OPTION') {
      var selectedResultadoText = event.target.value.split('|')[0];
      var selectedPrecedenteText = event.target.value.split('|')[1];

      var selectedResultado = document.getElementById('resultadoTese');
      if (!selectedResultado) return;

      var alreadyAdded = Array.from(selectedResultado.getElementsByTagName('p')).some(p => p.textContent === selectedResultadoText);
      if (alreadyAdded) {
        return;
      }

      var p = document.createElement('p');
      p.textContent = selectedResultadoText;
      selectedResultado.appendChild(p);

      var p2 = document.createElement('p');
      p2.textContent = "Confira-se:";
      selectedResultado.appendChild(p2);

      var p3 = document.createElement('p');
      var regex = /\(([A-Za-z].*?\d{4}\.)\)/g;
      var match;
      while ((match = regex.exec(selectedPrecedenteText)) !== null) {
        selectedPrecedenteText = selectedPrecedenteText.replace(match[0], '<span style="font-style: normal;">' + match[0] + '</span>' + '<br>' + '<br>');
      }

      p3.innerHTML = selectedPrecedenteText;
      p3.style.cssText += 'font-style: italic !important;';
      p3.style.cssText += 'padding-left: 3cm !important;';
      p3.style.cssText += 'text-indent: 0 !important;';
      p3.style.cssText += 'font-size: 11pt !important;';

      selectedResultado.appendChild(p3);

      var div = document.createElement('div');
      var textarea = document.createElement('textarea');
      div.appendChild(textarea);

      var button = document.createElement('button');
      button.textContent = 'Incluir';
      div.appendChild(button);

      p3.parentNode.insertBefore(div, p3.nextSibling);

      button.addEventListener('click', function () {
        registrarEstado();

        var textoDiv = document.createElement('div');
        var linhas = textarea.value.split('\n');

        linhas.forEach(function (linha) {
          var p = document.createElement('p');
          p.textContent = linha;
          textoDiv.appendChild(p);
        });

        div.parentNode.replaceChild(textoDiv, div);
      });

      letterIndex++;
      event.target.remove();
      results.size = 0;
      input.value = '';
      results.innerHTML = '';
    }
  });
}

function selecionaDispositivo(id) {
  registrarEstado();

  const dispositivo = document.getElementById('dispositivo');
  if (!dispositivo) return;

  if (id === 'conceder') {
    dispositivo.innerHTML = '<b>concedo a ordem</b>';
  } else if (id === 'denegar') {
    dispositivo.innerHTML = '<b>denego a ordem</b>';
  } else if (id === 'concederParcial') {
    dispositivo.innerHTML = '<b>concedo parcialmente a ordem</b>';
  } else if (id === 'negouProvimento') {
    dispositivo.innerHTML = '<b>nego provimento ao recurso</b>';
  } else if (id === 'darProvimento') {
    dispositivo.innerHTML = '<b>dou provimento ao recurso</b>';
  } else if (id === 'darParcialProvimento') {
    dispositivo.innerHTML = '<b>dou parcial provimento ao recurso</b>';
  } else if (id === 'naoConheco') {
    if (check() === HC) {
      dispositivo.innerHTML = '<b>não conheço do <i>habeas corpus</i></b>';
    } else {
      dispositivo.innerHTML = '<b>não conheço do recurso</b>';
    }
  } else if (id === 'concederOficio') {
    if (check() === HC) {
      dispositivo.innerHTML = '<b>não conheço do <i>writ</i></b>. Contudo, <b>concedo a ordem de ofício</b>';
    } else {
      dispositivo.innerHTML = '<b>não conheço do recurso</b>. Contudo, <b>concedo a ordem de ofício</b>';
    }
  }
}


async function copyFormattedTextToClipboard() {
  registrarEstado();
  // esvazia o arquivo temporario.json
  await salvarEstado([]);

  let element = document.getElementById('texto_base_relatorio');
  if (!element) return;

  // Criar um elemento temporário para manipular o HTML
  let tempDiv = document.createElement('div');





  tempDiv.innerHTML = element.innerHTML;


  // IDs específicos a serem verificados e removidos se vazios
  const idsToCheck = [
    'resultadoApreensao', 'pedidoPrincipal1', 'se_liminar2', 'pedidoLiminar', 
    'informacoes', 'parecerMinisterial', 'parecerClasse', 'primeiroGrauTexto', 
    'segundoGrauTexto', 'resultadoTese', 'resultadoTextoParticular', 'tesesSelecionadas', 'folhasSTJ', 'input1', 'inputTexto'
  ];

  idsToCheck.forEach(id => {
    let el = tempDiv.querySelector(`#${id}`);
    if (el && el.innerHTML.trim() === '') {
      let parent = el.parentElement;
      el.remove();
      // Remove o elemento pai <p> se ele estiver vazio após remover o <span>
      if (parent && parent.tagName === 'P' && parent.innerHTML.trim() === '') {
        parent.remove();
      }
    }
  });

  // Remover todos os <p> e <span> vazios
  let elementsToRemove = tempDiv.querySelectorAll('p, span');
  elementsToRemove.forEach(el => {
    if (el.innerHTML.trim() === '') {
      el.remove();
    }
  });

    // Zerar todos os estilos e aplicar novos estilos
  let styledHtml = `
  <html>
  <head>
  

  </head>
  <body>
  <section>${tempDiv.innerHTML}
  
  <style>
 

    p {
    text-indent : 2cm;
    }


    
  </style>
  </section>
  </body>
  </html>`;

  let textToCopy = new Blob([styledHtml], { type: 'text/html' });
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': textToCopy
      })
    ]);
    alert('Texto formatado copiado para a área de transferência');

    // Enviar conteúdo para o backend para salvar no histórico
    const response = await fetch('/saveClipboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: styledHtml })
    });

    if (!response.ok) throw new Error('Erro ao salvar conteúdo da área de transferência');
  } catch (err) {
    console.error('Erro ao copiar texto ou salvar no arquivo:', err);
  }
}