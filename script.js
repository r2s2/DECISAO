class Classe {
  constructor(nomeExtenso, verbo, agente, dispositivoFavoravel, dispositivoDesfavoravel, sinonimo) {
    this.nomeExtenso = nomeExtenso
    this.verbo = verbo
    this.agente = agente
    this.dispositivoFavoravel = dispositivoFavoravel
    this.dispositivoDesfavoravel = dispositivoDesfavoravel
    this.sinonimo = sinonimo
  }

  selecionadoClasse() {

    document.getElementById('classe').innerHTML = this.nomeExtenso;
    document.getElementById('classe2').innerHTML = this.sinonimo;
    document.getElementById('reu').innerHTML = this.agente;
    document.getElementById('VERBO').innerHTML = this.verbo;
  }
}

var HC = new Classe("<i>habeas corpus</i>", "impetrado em favor de", "paciente", "<b>concedo a ordem.</b>", "<b>denego a ordem.</b>", "<i>writ</i>")
var RHC = new Classe("recurso ordinário em <i>habeas corpus</i>", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso ordinário")
var REsp = new Classe("recurso especial", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso especial")
var AREsp = new Classe("agravo em recurso especial", "interposto", "agravante", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo em recurso especial")
var agrg = new Classe("agravo regimental", "interposto", "agravante", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo regimental")
var edcl = new Classe("embargos de declaração", "opostos", "embargante", "<b>acolho os embargos.</b>", "<b>rejeito os embargos.</b>", "embargos de declaração")





function check() {


  const classes = {
    'HC': HC,
    'RHC': RHC,
    'RESP': REsp,
    'ARESP': AREsp,
    'agrg': agrg,
    'edcl': edcl
  };

  for (let id in classes) {
    if (document.getElementById(id).checked) {
      classes[id].selecionadoClasse();

      if (id === 'HC') {
        return 'HC'
      } // para ser chamado no dispositivo
      break;
    }
  }


  //if da escolha da fase
  if (document.getElementById('analise_liminar').checked) {
    document.getElementById("se_liminar").innerHTML = "com pedido liminar";
    document.getElementById('se_liminar2').innerHTML = "";
    document.getElementById('pedidoLiminar').innerHTML = ', liminarmente e no mérito,'
  } else if (document.getElementById('analise_merito').checked) {
    document.getElementById('se_liminar').innerHTML = "";

  } else if (document.getElementById('sem_liminar').checked) {
    document.getElementById('se_liminar').innerHTML = "";
    document.getElementById('se_liminar2').innerHTML = "Não houve pedido liminar."
  }


}


function selecionaResultado(id) {
  if (id === 'concedeu') {
    document.getElementById('resultadoQuo').innerHTML = 'concedeu o <i>habeas corpus</i>.';
  } else if (id === 'denegou') {
    document.getElementById('resultadoQuo').innerHTML = 'denegou o <i>habeas corpus</i>.';
  } else if (id === 'concedeuParcial') {
    document.getElementById('resultadoQuo').innerHTML = 'concedeu parcialmente o <i>habeas corpus</i>.';
  } else if (id === 'naoConheceu') {
    document.getElementById('resultadoQuo').innerHTML = 'não conheceu do <i>habeas corpus</i>.';
  } else if (id === 'semResultado') {
    document.getElementById('resultadoQuo').innerHTML = 'não se manifestou.';
  } else if (id === 'negouProvimento') {
    document.getElementById('resultadoQuo').innerHTML = 'negou provimento ao recurso.';
  } else if (id === 'deuProvimento') {
    document.getElementById('resultadoQuo').innerHTML = 'deu provimento ao recurso.';
  } else if (id === 'deuParcialProvimento') {
    document.getElementById('resultadoQuo').innerHTML = 'deu parcial provimento ao recurso.';
  }

}

var contadorDelito = []
var contadorPedidos = []
var contadorTeses = []

function digitaFls() {

  var x = document.getElementById("eSTJfls");


  var node = document.createElement("span");

  var textnode = document.createTextNode('(e-STJ fls. ' + x.value + ')');

  node.appendChild(textnode)
  document.getElementById("folhasSTJ").appendChild(node);


}



var faseLiminar = {

  liminarComLiminar: 'com pedido liminar',
  meritoComLiminar: 'com pedido liminar',
  semLiminar: ''

}
function selecionaFase(argumento5) {
  document.getElementById('se_liminar').innerHTML = faseLiminar[argumento5]
  if (argumento5 != 'liminarComLiminar') {
    document.getElementById('informacoes').innerHTML = 'Informações prestadas'
  }

}

var delito = {
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


}


function searchTipoPenal() {
  var input, filter, results, i;
  input = document.getElementById('tipoPenal');
  input.setAttribute('autocomplete', 'off');

  filter = input.value.toUpperCase();
  results = document.getElementById('searchTipoPenal');
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

  if (input.value.trim() === '') {
    results.style.display = 'none';
  } else {
    results.style.display = 'block';
  }
}

function atualizarVisualizacaoDelitos() {
  var pDelitosSelecionados = document.getElementById('DELITO');
  var textoDosDelitos = document.getElementById('dosDelitos');

  if (contadorDelito.length > 0) {
    // Cria a string de delitos, substituindo a última vírgula por " e "
    var delitosTexto = contadorDelito.join(', ').replace(/, ([^,]*)$/, ' e $1');
    pDelitosSelecionados.textContent = delitosTexto;
    // Altera o texto para "dos delitos" se houver mais de um delito selecionado
    textoDosDelitos.textContent = contadorDelito.length > 1 ? 'dos delitos' : 'do delito';
  } else {
    // Se não houver delitos selecionados, limpa o texto do parágrafo e volta ao singular
    pDelitosSelecionados.textContent = '';
    textoDosDelitos.textContent = 'do delito';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var inputTexto = document.getElementById('inputTexto');
  inputTexto.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      var texto = inputTexto.value;
      // Cria um novo nó de texto com o valor do input
      var textoNode = document.createTextNode(texto);
      var paragrafoTexto = document.getElementById('paragrafoTexto');
      // Insere o texto no lugar do input
      paragrafoTexto.insertBefore(textoNode, inputTexto);
      // Remove o input do parágrafo
      paragrafoTexto.removeChild(inputTexto);
      event.preventDefault();
    }
  });
});


function fatosIncluidos() {
  // Pega o textarea e o elemento 'fatos'
  var textarea = document.getElementById('caixatexto_base_relatorio');
  var fatos = document.getElementById('fatos');

  // Atualiza o conteúdo de 'fatos' com o valor do textarea
  if (textarea && fatos) {
    fatos.innerHTML = textarea.value;
  }
}

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


// Variável global para rastrear o índice do marcador de letras
var letterIndex = 0;

// Variável global para rastrear se o evento de clique já foi adicionado
var clickEventAdded = false;

function searchTese() {
  var input, filter, results, i, tese, tags, count = 0;
  input = document.getElementById('search');
  input.setAttribute('autocomplete', 'off');

  filter = input.value.toUpperCase();
  results = document.getElementById('searchResults');
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
    results.addEventListener('click', function (event) {
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

        // Adiciona o evento de clique apenas se ele ainda não foi adicionado







        // Atualiza o índice do marcador de letras
        letterIndex++; // Use letterIndex aqui

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

// Variável global para rastrear o índice do marcador de letras
var letterIndexPedido = 0;

// Variável global para rastrear se o evento de clique já foi adicionado
var clickEventAddedPedido = false;

function searchPedidoFuncao() {
  var input, filter, results, i, pedido, tags, count = 0;
  input = document.getElementById('pedido');
  input.setAttribute('autocomplete', 'off');

  filter = input.value.toUpperCase();
  results = document.getElementById('searchPedido');
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
        p.textContent = String.fromCharCode(97 + letterIndexPedido) + ") " + selectedPedidoText; // Use letterIndexPedido aqui
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
}
var pedidoSelecionado = null;

function selecionaPedido(id) {
  if (pedidoSelecionado === id) {
    // Se o id já está selecionado, desmarque-o
    pedidoSelecionado = null;
    document.getElementById("pedidoPrincipal1").innerHTML = '';
  } else {
    // Se o id não está selecionado, selecione-o
    pedidoSelecionado = id;
    document.getElementById("pedidoPrincipal1").innerHTML = pedidos[id];
  }
}


var liminar = {
  deferida: 'O pedido liminar foi deferido.',
  indeferida: 'O pedido liminar foi indeferido.',
  semPedido: 'Não houve pedido liminar.'
}
function selecionaLiminar(argumento4) {
  document.getElementById('se_liminar2').innerHTML = liminar[argumento4]
  if (argumento4 == 'semPedido') {
    document.getElementById('pedidoLiminar').innerHTML = ''
  } else { document.getElementById('pedidoLiminar').innerHTML = ', inclusive liminarmente, ' }

}

var parecer = {
  naoConhecimento: 'pelo não conhecimento da ordem.',
  denegacao: 'pela denegação da ordem.',
  concessao: 'pela concessão da ordem.',
  provimento: 'pelo provimento do recurso.',
  desprovimento: 'pelo desprovimento do recurso.'
}
function selecionaParecer(argumento1) {

  document.getElementById('parecerMinisterial').innerHTML = 'O Ministério Público Federal manifestou-se '
  document.getElementById('parecerClasse').innerHTML = parecer[argumento1]

}


function primeiroGrau() {
  // Obtem o elemento de entrada onde o usuário digita o texto
  var input = document.getElementById('primeiroGrau');

  // Cria um novo elemento p
  var p = document.createElement('p');
  var p2 = document.createElement('p');

  // Adiciona estilos ao parágrafo
  p.style.fontStyle = 'italic'; // Torna o texto itálico
  p.style.paddingLeft = '4cm'; // Adiciona uma indentação de 2cm
  p.style.textIndent = '0'; 
  p.style.fontSize = '10pt'; // Define o tamanho da fonte como 10pt

  // Define o conteúdo de texto do parágrafo
  p2.innerHTML = "Assim se manifestou o Juízo de 1º Grau, <i>ipsis litteris</i>:"; 
  p.textContent = input.value;

  // Adiciona o parágrafo ao elemento com id 'primeiroGrauTexto'
  document.getElementById('primeiroGrauTexto').appendChild(p2);
  document.getElementById('primeiroGrauTexto').appendChild(p);

  // Limpa o input
  input.value = '';
}

function segundoGrau() {
  // Obtem o elemento de entrada onde o usuário digita o texto
  var input = document.getElementById('segundoGrau');

  // Cria um novo elemento p
  var p = document.createElement('p');
  var p2 = document.createElement('p');

  // Adiciona estilos ao parágrafo
  p.style.fontStyle = 'italic'; // Torna o texto itálico
  p.style.paddingLeft = '4cm'; // Adiciona uma indentação de 2cm
  p.style.textIndent = '0'; 
  p.style.fontSize = '10pt'; // Define o tamanho da fonte como 10pt

  // Define o conteúdo de texto do parágrafo
  p2.innerHTML = "A Corte de origem fundamentou seu entendimento nos seguintes termos, <i>in verbis</i>:"; 
  p.textContent = input.value;

  // Adiciona o parágrafo ao elemento com id 'primeiroGrauTexto'
  document.getElementById('segundoGrauTexto').appendChild(p2);
  document.getElementById('segundoGrauTexto').appendChild(p);

  // Limpa o input
  input.value = '';
}

// Adiciona o evento 'keydown' ao elemento de entrada
document.getElementById('primeiroGrau').addEventListener('keydown', function(event) {
  // Verifica se a tecla pressionada foi Enter
  if (event.key === 'Enter') {
    // Chama a função primeiroGrau
    primeiroGrau();

    // Previne a ação padrão do evento Enter
    event.preventDefault();
  }
});


// Adiciona o evento 'keydown' ao elemento de entrada
document.getElementById('primeiroGrau').addEventListener('keydown', function(event) {
  // Verifica se a tecla pressionada foi Enter
  if (event.key === 'Enter') {
    // Chama a função primeiroGrau
    primeiroGrau();

    // Previne a ação padrão do evento Enter
    event.preventDefault();
  }
});

function removeAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function searchResultadoFuncao() {
  var input, filter, results, i, resultado, tags, count = 0;
  input = document.getElementById('resultado');
  input.setAttribute('autocomplete', 'off');

  filter = input.value.toUpperCase();
  results = document.getElementById('searchResultado');
  results.innerHTML = '';

  fetch('resultados.json')
  .then(response => response.json())
  
.then(data => {
  // Divide o filtro em várias palavras-chave e remove os acentos
  var keywords = filter.split(' ').map(keyword => removeAcentos(keyword));

  for (i = 0; i < data.resultados.length; i++) {
    resultado = data.resultados[i];
    tags = resultado.tags || '';
    var tagsUpper = removeAcentos(tags.toUpperCase());

    // Verifica se todas as palavras-chave estão presentes nas tags
    var allKeywordsFound = keywords.every(keyword => tagsUpper.indexOf(keyword.toUpperCase()) > -1);

    if ((resultado.resultado && removeAcentos(resultado.resultado.toUpperCase()).indexOf(filter) > -1) || allKeywordsFound || resultado.id.toString() === input.value) {
    
      
        
          var option = document.createElement('option');
          option.value = resultado.resultado + '|' + resultado.precedente; // Separa o resultado e o precedente com um |
          option.text = resultado.id + " - " + resultado.resultado + " - " + resultado.precedente; // Inclui o id do resultado e o precedente no texto
          results.appendChild(option);
          count++;
        }
      }
      results.size = results.length; // Define o tamanho do select para o número de opções
    });

  results.addEventListener('click', function (event) {

    if (event.target.tagName === 'OPTION') {
      var selectedResultadoText = event.target.value.split('|')[0]; // Separa o resultado e o precedente
      var selectedPrecedenteText = event.target.value.split('|')[1]; // Separa o resultado e o precedente

      var selectedResultado = document.getElementById('resultadoTese');

     // Verifica se o resultado já foi adicionado
var alreadyAdded = Array.from(selectedResultado.getElementsByTagName('p')).some(p => p.textContent === selectedResultadoText);
      if (alreadyAdded) {
        //alert('Este resultado já foi adicionado.');
        return;
      }

      // Cria um novo parágrafo para o resultado selecionado
      var p = document.createElement('p');
      p.textContent = selectedResultadoText;
      selectedResultado.appendChild(p);

      // Cria um novo parágrafo para o texto "Confira-se:"
      var p2 = document.createElement('p');
      p2.textContent = "Confira-se:";
      selectedResultado.appendChild(p2);

      // Cria um novo parágrafo para o precedente
      var p3 = document.createElement('p');

      // Encontra o texto entre parênteses que começa com letras e termina com um ano ou com um ano e ponto final
      var regex = /\(([A-Za-z].*?\d{4}\.)\)/g;
      var match;
      while ((match = regex.exec(selectedPrecedenteText)) !== null) {
        // Adiciona tags <span> ao redor do texto encontrado
        selectedPrecedenteText = selectedPrecedenteText.replace(match[0], '<span style="font-style: normal;">' + match[0] + '</span>');
      }

      // Adiciona o texto ao parágrafo
      p3.innerHTML = selectedPrecedenteText;

            // Adiciona estilos ao parágrafo com !important para evitar sobrescrita
      p3.style.cssText += 'font-style: italic !important;'; // Torna o texto itálico
      p3.style.cssText += 'padding-left: 4cm !important;'; // Adiciona uma left de 4cm
      p3.style.cssText += 'text-indent: 0 !important;'; 
      p3.style.cssText += 'font-size: 10pt !important;'; // Define o tamanho da fonte como 10pt

      // Adiciona o parágrafo ao resultado
      selectedResultado.appendChild(p3);

      
// Cria a div que irá conter o textarea e o botão
var div = document.createElement('div');

// Cria o textarea
var textarea = document.createElement('textarea');

// Adiciona o textarea à div
div.appendChild(textarea);

// Cria o botão
var button = document.createElement('button');
button.textContent = 'Incluir';

// Adiciona o botão à div
div.appendChild(button);

// Adiciona a div logo após o parágrafo p3
p3.parentNode.insertBefore(div, p3.nextSibling);

// Configura o evento de clique do botão
button.addEventListener('click', function() {
  // Cria um novo elemento para substituir o textarea
  var textoDiv = document.createElement('div');

// Divide o valor do textarea em linhas
  var linhas = textarea.value.split('\n');

  // Para cada linha, cria um novo parágrafo e adiciona ao textoDiv
  linhas.forEach(function(linha) {
    var p = document.createElement('p');
    p.textContent = linha;
    textoDiv.appendChild(p);
  });


  // Substitui o textarea e o botão pelo texto
  div.parentNode.replaceChild(textoDiv, div);
});

      // Atualiza o índice do marcador de letras
      letterIndex++; // Use letterIndex aqui

      // Remove o resultado selecionado dos resultados
      event.target.remove();

      // Fecha o select de resultados
      results.size = 0;

      // Limpa o campo de busca
      input.value = '';

      // Remove todos os resultados dos resultados
      results.innerHTML = '';

    }
  });

}


function selecionaDispositivo(id) {
  if (id === 'conceder') {
    document.getElementById('dispositivo').innerHTML = '<b>concedo a ordem</b>';
  } else if (id === 'denegar') {
    document.getElementById('dispositivo').innerHTML = '<b>denego a ordem</b>';
  } else if (id === 'concederParcial') {
    document.getElementById('dispositivo').innerHTML = '<b>concedo parcialmente a ordem</b>';
  } else if (id === 'negouProvimento') {
    document.getElementById('dispositivo').innerHTML = '<b>nego provimento ao recurso</b>';
  } else if (id === 'darProvimento') {
    document.getElementById('dispositivo').innerHTML = '<b>dou provimento ao recurso</b>';
  } else if (id === 'darParcialProvimento') {
    document.getElementById('dispositivo').innerHTML = '<b>dou parcial provimento ao recurso</b>';
  } else if (id === 'naoConheco') {
    if (check() === 'HC') {
      document.getElementById('dispositivo').innerHTML = '<b>não conheço do <i>habeas corpus</i></b>';
    } else {
      document.getElementById('dispositivo').innerHTML = '<b>não conheço do recurso</b>';
    }
  } else if (id === 'concederOficio') {
    if (check() === 'HC') {
      document.getElementById('dispositivo').innerHTML = '<b>não conheço do <i>writ</i></b>. Contudo, <b>concedo a ordem de ofício</b>';
    } else {
      document.getElementById('dispositivo').innerHTML = '<b>não conheço do recurso</b>. Contudo, <b>concedo a ordem de ofício</b>';
    }
}
}






function zerarTudo() {
  document.getElementById('DELITO').innerHTML = ''
  document.getElementById('tesesSelecionadas').innerHTML = ''
  document.getElementById('informacoes').innerHTML = ''
  contadorDelito = []
  contadorPedidos = []
  contadorTeses = []
  document.getElementById('dosDelitos').innerHTML = 'do delito'
  document.getElementById('pedidoPrincipal').innerHTML = ''
}


async function copyFormattedTextToClipboard() {
  let element = document.getElementById('texto_base_relatorio');
  let styledHtml = `
<html>
<head>
<style>
  body, p {
    font-family: 'Arial', sans-serif !important; // Usando !important para tentar forçar a sobreposição de estilos padrão
    margin-bottom: 7.1pt;
    text-indent: 2cm;    
  }
</style>
</head>
<body>
<p>${element.innerHTML}</p>
</body>
</html>`;

  // Cria um novo Blob com o tipo MIME correto para HTML
  let textToCopy = new Blob([styledHtml], { type: 'text/html' });
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': textToCopy
      })
    ]);
    alert('Texto formatado copiado para a área de transferência');
  } catch (err) {
    console.error('Erro ao copiar texto: ', err);
  }
}
