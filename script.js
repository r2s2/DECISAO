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
  orcrim: ' organização criminosa'
}

function fatosIncluidos() {
  // Pega o textarea e o elemento 'fatos'
  var textarea = document.getElementById('caixatexto_base_relatorio');
  var fatos = document.getElementById('fatos');

  // Atualiza o conteúdo de 'fatos' com o valor do textarea
  if (textarea && fatos) {
    fatos.innerHTML = textarea.value;
  }
}

function criarElementoDelito(id) {
  var index = contadorDelito.indexOf(id);
  if (index !== -1) {
    // Se o id já está no contadorDelito, remova-o
    contadorDelito.splice(index, 1);

    // Remova o elemento correspondente do DOM
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);

    // Atualize 'dosDelitos' se necessário
    if (contadorDelito.length <= 1) {
      document.getElementById('dosDelitos').innerHTML = '';
    }
  } else {
    // Se o id não está no contadorDelito, adicione-o
    contadorDelito.push(id);

    // Crie um novo elemento no DOM
    var node = document.createElement("span");
    node.id = id;  // Adicione um id ao elemento para que possamos removê-lo mais tarde
    var textnode = document.createTextNode(contadorDelito.length > 1 ? ',' + delito[id] : delito[id]);
    node.appendChild(textnode);
    document.getElementById("DELITO").appendChild(node);

    // Atualize 'dosDelitos' se necessário
    if (contadorDelito.length > 1) {
      document.getElementById('dosDelitos').innerHTML = 'dos delitos';
    }
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
        alert('Este resultado já foi adicionado.');
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

      // Adiciona estilos ao parágrafo
      p3.style.fontStyle = 'italic'; // Torna o texto itálico
      p3.style.paddingLeft = '4cm'; // Adiciona uma indentação de 2cm
      p3.style.textIndent = '0'; 
      p3.style.fontSize = '10pt'; // Define o tamanho da fonte como 10pt

      // Adiciona o parágrafo ao resultado
      selectedResultado.appendChild(p3);

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
  let element = document.getElementsByClassName('texto_base_relatorio')[0];
  let styledHtml = `<p style="font-family: Arial, Helvetica, sans-serif; margin-bottom: 7.1pt; text-indent: 2cm;">${element.innerHTML}</p>`;
  let textToCopy = new Blob([styledHtml], { type: 'text/html' });
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': textToCopy
      })
    ]);
    alert('Texto não formatado copiado para a área de transferência');
  } catch (err) {
    console.error('Erro ao copiar texto: ', err);
  }
}

// fazer tela de login
// fazer tela de cadastro
// fazer tela de reset de senha
// fazer tela de perfil
// fazer tela de edição de perfil
// fazer tela de edição de senha
// fazer tela de edição de email
// fazer tela de exclusão de conta
// fazer log de quem criar teses, pedidos e resultados
// fazer tela de busca de teses
// fazer tela de busca de pedidos
// fazer tela de busca de resultados
// fazer log de todos os itens de cada processo
// fazer tela de administrador com atribuição de privilégios
// incluir campos de apreensão, droga com maconha, cocaína, crack e outros, e arma com calibre e tipo pistola, revólver, fuzil e outros
// criar classes agrg e edcl
// delitos como lista igual o de buscar teses, e que retorne sempre em ordem dos mais usados
// sob o parecer, criar dinamicamente os pedidos e abrir um campo para que o usuário possa selecionar um resultado
// criar ratio com dispositivos primeiro sobre o conhecimento, depois sobre o mérito
