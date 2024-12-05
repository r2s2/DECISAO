//TODO FAZER QUE A INCLUSÃO DAS FLS SEJA AO LADO DOS CAMPOS DELITOS, APREENSÃO, RESULTADO DA ORIGEM, PEDIDOS, LIMINAR, PARECER DO MP, 1º E 2º GRAU
// JÁ nas teses fazer que a inclusão do fls apareça ao lado da tese no texto

// Botão e função do folhas

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


// Função formatInput (exemplo)
function formatInput(input) {
registrarEstado();
let value = input.value;
if (!value) return;

// Remove qualquer ponto final no final do valor
value = value.replace(/\.$/, '');

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



// Botão de folhas
document.addEventListener('DOMContentLoaded', function() {
  const floatButton = document.getElementById('floatButton');
  const textoBaseRelatorio = document.getElementById('texto_base_relatorio');

  floatButton.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData('text/plain', 'input1');
  });

  textoBaseRelatorio.addEventListener('dragover', function(event) {
      event.preventDefault();
      // Adiciona uma classe para destacar a linha
      if (event.target.tagName === 'P' || event.target.tagName === 'SPAN') {
        event.target.classList.add('highlight');
      }
  });

  textoBaseRelatorio.addEventListener('dragleave', function(event) {
      // Remove a classe de destaque quando o botão é arrastado para fora da linha
      if (event.target.tagName === 'P' || event.target.tagName === 'SPAN') {
        event.target.classList.remove('highlight');
      }
  });

  textoBaseRelatorio.addEventListener('drop', function(event) {
    event.preventDefault();
    const inputId = event.dataTransfer.getData('text/plain');
    if (inputId === 'input1') {
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.id = 'input1';
        inputElement.style.width = '80px';
        inputElement.placeholder = 'e-STJ fls.';

          // Verifica se o elemento alvo é um texto e ajusta a posição do input
          if (event.target.nodeType === Node.TEXT_NODE) {
            const textContent = event.target.textContent;
            const newText = textContent.slice(0, -1) + ' (e-STJ fls. )' + textContent.slice(-1);
            event.target.textContent = newText;
            event.target.parentNode.insertBefore(inputElement, event.target.nextSibling);
        } else {
            event.target.appendChild(inputElement);
        }
          // Adiciona os event listeners ao novo input
          inputElement.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9/]/g, ''); // Permitir apenas números e '/'
          });

          inputElement.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
              event.preventDefault();
              formatInput(this);
            }
          });

          // Focar no input para permitir a digitação imediata
          inputElement.focus();
      }

      // Remove a classe de destaque após soltar o botão
      if (event.target.tagName === 'P' || event.target.tagName === 'SPAN') {
        event.target.classList.remove('highlight');
      }
  });
});


// Exemplo de função para gerar uma chave única (UUID)
function gerarChaveUnica() {
  return URL.createObjectURL(new Blob()).slice(-36);
}

class Origem {
  constructor(nome, dispositivoFavoravel, dispositivoFavoravelParcial, dispositivoDesfavoravel, naoConhecimento, sinonimo) {
    this.nome = nome;
    this.dispositivoFavoravel = dispositivoFavoravel;
    this.dispositivoDesfavoravel = dispositivoDesfavoravel;
    this.sinonimo = sinonimo;
    this.dispositivoFavoravelParcial = dispositivoFavoravelParcial;
    this.naoConhecimento = naoConhecimento;

  }
}

/*
const HC = new Origem("<i>Habeas Corpus</i>", "concedeu a ordem.", "concedeu parcialmente a ordem.", "denegou a ordem.</b>", "não conheceu da ordem", "<i>writ</i>");
const apelacao = new Origem("Apelação", "deu provimento à apelação.", "deu parcial provimento à apelação.", "negou provimento à apelação.", "não conheceu da apelação", "apelação");

const agravoExecucao = new Origem("Agravo em execução", "deu provimento ao agravo em execução.", "deu parcial provimento ao agravo em execução.", "negou provimento ao agravo.", "não conheceu do agravo", "agravo em execução");
const rse = new Origem("Recurso em sentido estrito", "deu provimento ao recurso em sentido estrito.", "deu parcial provimento ao recurso em sentido estrito.", "negou provimento ao recurso em sentido estrito.", "não conheceu do recurso", "recurso em sentido estrito");
const revisao = new Origem("Revisão criminal", "julgou procedente a revisão criminal.", "julgou parcialmente procedente a revisão criminal.", "julgou improcedente a revisão criminal.", "não conheceu da revisão criminal", "revisão criminal");
*/

class Classe {
  constructor(nomeExtenso, verbo, agente, dispositivoFavoravel, dispositivoDesfavoravel, sinonimo, autorJustica) {
    this.nomeExtenso = nomeExtenso;
    this.verbo = verbo;
    this.agente = agente;
    this.dispositivoFavoravel = dispositivoFavoravel;
    this.dispositivoDesfavoravel = dispositivoDesfavoravel;
    this.sinonimo = sinonimo;
    this.autorJustica = autorJustica;
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
    if (document.getElementById('autorJustica')) {
      document.getElementById('autorJustica').innerHTML = this.autorJustica;
    }
  }
}

const HC = new Classe("<i>habeas corpus</i>", "impetrado em favor de", "paciente", "<b>concedo a ordem.</b>", "<b>denego a ordem.</b>", "<i>writ</i>", "{{pac");
const RHC = new Classe("recurso ordinário em <i>habeas corpus</i>", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso ordinário", "{{rec");
const REsp = new Classe("recurso especial", "interposto por", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso especial", "{{rec");
const AREsp = new Classe("agravo em recurso especial", "interposto por", "agravante", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo em recurso especial", "{{agr");
const agrg = new Classe("agravo regimental", "interposto por", "agravante", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo regimental", "{{agr");
const edcl = new Classe("embargos de declaração", "opostos por", "embargante", "<b>acolho os embargos.</b>", "<b>rejeito os embargos.</b>", "embargos de declaração", "{{enb");

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
      if (classes[id] == REsp || classes[id] == AREsp || classes[id] == agrg || classes[id] == edcl) {
        document.getElementById("se_liminar").innerHTML = "";
        document.getElementById("se_liminar2").innerHTML = "";
        
      } 
      return classes[id];
    }
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


function selecionaAtoCoator(id) {
  const element = document.getElementById("atoCoator");

  let valor;
  switch (id) {
    case 'hc_origem':
      valor = 'HC';
      break;
    case 'apelacao':
      valor = 'Apelação';
      break;
    case 'agravoExecucao':
      valor = 'Agravo em execução';
      break;
    case 'rse':
      valor = 'Recurso em sentido estrito';
      break;
    default:
      console.log('ID não reconhecido:', id);
      valor = null;
  }

  if (element && valor) {
    element.textContent = valor;
  }

  coator = valor;

  }


   
/*
  for (let id in atosCoatores) {
    const element = document.getElementById(id);
    if (element) {
      console.log(`Elemento encontrado: ${id}`);
      if (element.checked) {
        console.log(`Elemento selecionado: ${id}`);
        atosCoatores[id].selecionadoAtoCoator();
        return atosCoatores[id];
      }
    } else {
      console.log(`Elemento não encontrado: ${id}`);
    }
  }

  console.log('Nenhum ato coator selecionado');
  return null;
}*/


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
          option.value = resultado.topico + '|' + resultado.resultado + '|' + resultado.precedente;
          option.text = resultado.id + " - " + resultado.topico + " - " + resultado.tags;  //+ " - " + resultado.resultado + " - " + resultado.precedente;
          results.appendChild(option);
          count++;
        }
      }
      results.size = results.length;
    });

  results.addEventListener('click', function (event) {
    registrarEstado();

    if (event.target.tagName === 'OPTION') {
      adicionarResultado(event.target.value);
    }
  });

  input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && results.length === 1) {
      event.preventDefault();
      adicionarResultado(results.options[0].value);
    }
  });

  // Função para adicionar o resultado selecionado
  function adicionarResultado(value) {
    var selectedTopicoText = value.split('|')[0];
    var selectedResultadoText = value.split('|')[1];
    var selectedPrecedenteText = value.split('|')[2];

    var selectedResultado = document.getElementById('resultadoTese');
    if (!selectedResultado) return;

    var alreadyAdded = Array.from(selectedResultado.getElementsByTagName('p')).some(p => p.textContent === selectedResultadoText);
    if (alreadyAdded) {
      return;
    }

    var p = document.createElement('p');
    p.textContent = selectedTopicoText;
    p.style.fontWeight = 'bold'; // Negrito
    p.style.textDecoration = 'underline'; // Sublinhado
    selectedResultado.appendChild(p);

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

    selectedPrecedenteText = selectedPrecedenteText.replace(/\[...\]/g, '<br>[...]');

    var quebraDeLinha = selectedPrecedenteText;

    // Use a regular expression with the global flag to find and replace all occurrences of the pattern
    var regex = /(\d+\. [A-Z])/g;
    var replacedText = quebraDeLinha.replace(regex, '<br>$1');

    // Update the content of the element p3 with the replaced text
    p3.innerHTML = replacedText;

    p3.style.cssText += 'font-style: italic !important;';
    p3.style.cssText += 'padding-left: 3cm !important;';
    p3.style.cssText += 'text-indent: 0 !important;';
    p3.style.cssText += 'font-size: 11pt !important;';
    
    selectedResultado.appendChild(p3);

    var div = document.createElement('div');
    var textarea = document.createElement('textarea');
    textarea.placeholder = 'Digite o texto a ser incluído';
    textarea.rows = 8;
    textarea.cols = 60;
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
    results.size = 0;
    input.value = '';
    results.innerHTML = '';
  }

  // Função para fechar a prateleira de resultados
  function fecharPrateleira() {
    results.style.display = 'none';
  }

  // Adiciona evento de clique fora do campo de busca
  document.addEventListener('click', function(event) {
    if (!input.contains(event.target) && !results.contains(event.target)) {
      fecharPrateleira();
    }
  });

  // Adiciona evento de entrada de texto ao campo de busca
  input.addEventListener('input', function() {
    if (input.value.trim() === '') {
      fecharPrateleira();
    } else {
      results.style.display = 'block';
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
  } else if (id === 'negarProvimento') {
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

  // Adicionar classe e estilo aos parágrafos
  let paragraphs = tempDiv.querySelectorAll('p, [contenteditable="false"]');
  paragraphs.forEach(p => {
    if (p.id === 'primeiroGrauId' || p.id === 'segundoGrauId' || p.id === 'searchResultadoFuncao') {
      p.style.cssText += 'padding-left: 0cm !important;';
      p.style.cssText += 'font-style: italic !important;';
      p.style.cssText += 'margin-left: 120px !important;';
      p.style.cssText += 'text-indent: 0cm !important;';
      p.style.cssText += 'font-size: 11pt !important;';
      p.style.cssText += 'font-family: Arial, Helvetica, sans-serif;';
      p.style.cssText += 'line-height: 100% !important;';
      p.style.cssText += 'margin-bottom: 0.3cm !important;';
    } else {
      p.classList.add('text-indent');
      p.style.cssText += 'color:#000000;margin-bottom:0.25cm;text-align:justify;text-indent:2cm;line-height:150%';
      p.querySelectorAll('span').forEach(span => {
        span.style.cssText += 'line-height:150%;font-family:Arial,Helvetica,sans-serif;font-size:12pt;';
      });
    }
  });

  // Concatenar o HTML de cada parágrafo individualmente
  let formattedHTML = '';
  paragraphs.forEach(p => {
    formattedHTML += p.outerHTML;
  });

  // Copiar o HTML formatado diretamente
  let textToCopy = new Blob([formattedHTML], { type: 'text/html' });
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
      body: JSON.stringify({ text: formattedHTML })
    });

    if (!response.ok) throw new Error('Erro ao salvar conteúdo da área de transferência');
  } catch (err) {
    console.error('Erro ao copiar texto ou salvar no arquivo:', err);
  }
}