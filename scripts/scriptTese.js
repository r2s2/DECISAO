var letterIndex = 0; // Certifique-se de que letterIndex está definido globalmente

function incluirTese(selectedTeseText) {
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
  var letter = String.fromCharCode(97 + (letterIndex % 26)); // Garante que o índice esteja no intervalo de 'a' a 'z'
  p.innerHTML = `<b>${letter})</b> ${selectedTeseText}`;

  // Cria o elemento input
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'input' + (letterIndex + 1); // Gera um ID único para o input
  input.style.width = '80px';
  input.placeholder = 'e-STJ fls.';

  // Adiciona o input ao parágrafo
  p.appendChild(document.createTextNode(' ')); // Adiciona um espaço antes do input
  p.appendChild(input);

  // Adiciona o parágrafo ao elemento selectedTese
  selectedTese.appendChild(p);

  // Atualiza o índice do marcador de letras
  letterIndex++;

  // Remove a tese selecionada dos resultados
  var results = document.getElementById('searchResults');
  var optionToRemove = Array.from(results.options).find(option => option.value === selectedTeseText);
  if (optionToRemove) {
    optionToRemove.remove();
  }

  // Fecha o select de resultados
  results.size = 0;

  // Limpa o campo de busca
  var inputField = document.getElementById('search');
  inputField.value = '';

  // Remove todas as teses dos resultados
  results.innerHTML = '';

  // Adiciona os event listeners ao novo input
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

var clickEventAdded = false;

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
        incluirTese(event.target.value);
      }
    });

    // Adiciona evento de tecla para detectar Enter
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && results.options.length === 1) {
        event.preventDefault();
        incluirTese(results.options[0].value);
      }
    });

    // Marca que o evento de clique foi adicionado
    clickEventAdded = true;
  }
}


// Função formatInput (exemplo)
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
