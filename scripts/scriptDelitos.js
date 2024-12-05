
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
        // Esconde a lista de resultados e limpa o campo de entrada
        results.style.display = 'none';
        input.value = '';
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
        // Esconde a lista de resultados e limpa o campo de entrada
        results.style.display = 'none';
        input.value = '';
      }
    });
  
    // Adiciona evento de pressionar Enter ao campo de entrada para selecionar a única opção
    input.addEventListener('keypress', function (event) {
      if (event.key === 'Enter' && results.options.length === 1) {
        event.preventDefault();
        var selectedDelitoText = results.options[0].value;
  
        // Verifica se o delito já foi adicionado
        if (!contadorDelito.includes(selectedDelitoText)) {
          contadorDelito.push(selectedDelitoText);
          atualizarVisualizacaoDelitos();
        }
        // Esconde a lista de resultados e limpa o campo de entrada
        results.style.display = 'none';
        input.value = '';
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
  
  