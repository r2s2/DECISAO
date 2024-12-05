// importar função formatInput do script.js da pasta DECISAO

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
        incluirPedido(event.target.value);
      }
    });

    // Adiciona evento de tecla para detectar Enter
    input.addEventListener('keypress', function(event) {
      if (event.key === 'Enter' && results.options.length === 1) {
        event.preventDefault();
        incluirPedido(results.options[0].value);
      }
    });

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

    // Marca que o evento de clique foi adicionado
    clickEventAddedPedido = true;
  }
}

function incluirPedido(selectedPedidoText) {
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
  p.innerHTML = `<b>${String.fromCharCode(97 + letterIndexPedido)})</b> ${selectedPedidoText}`;

  // Cria o elemento input
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'input' + (letterIndexPedido + 1); // Gera um ID único para o input
  input.style.width = '80px';
  input.placeholder = 'e-STJ fls.';

  // Adiciona o input ao parágrafo
  p.appendChild(document.createTextNode(' ')); // Adiciona um espaço antes do input
  p.appendChild(input);

  // Adiciona o parágrafo ao elemento selectedPedido
  selectedPedido.appendChild(p);

  // Atualiza o índice do marcador de letras
  letterIndexPedido++;

  // Remove o pedido selecionado dos resultados
  var results = document.getElementById('searchPedido');
  var optionToRemove = Array.from(results.options).find(option => option.value === selectedPedidoText);
  if (optionToRemove) {
    optionToRemove.remove();
  }

  // Fecha o select de resultados
  results.size = 0;

  // Limpa o campo de busca
  var inputField = document.getElementById('pedido');
  inputField.value = '';

  // Remove todos os pedidos dos resultados
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

// Função para fechar a prateleira de resultados
function fecharPrateleira() {
  var results = document.getElementById('searchPedido');
  if (results) {
    results.style.display = 'none';
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