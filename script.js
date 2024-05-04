class Classe {
  constructor (nomeExtenso, verbo, agente, dispositivoFavoravel, dispositivoDesfavoravel, sinonimo) {
    this.nomeExtenso = nomeExtenso
    this.verbo = verbo
    this.agente = agente
    this.dispositivoFavoravel = dispositivoFavoravel
    this.dispositivoDesfavoravel = dispositivoDesfavoravel
    this.sinonimo = sinonimo
  }

  selecionadoClasse(){

    
      document.getElementById('classe').innerHTML = this.nomeExtenso;
      document.getElementById('classe2').innerHTML = this.sinonimo;
      document.getElementById('reu').innerHTML = this.agente;
      document.getElementById('VERBO').innerHTML = this.verbo;
       


    
}
}

var HC = new Classe("<i>habeas corpus</i>", "impetrado em favor de", "paciente", "<b>concedo a ordem.</b>", "<b>denego a ordem.</b>", "<i>writ</i>")
var RHC = new Classe("recurso ordinário em <i>habeas corpus</i>", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso ordinário")
var REsp = new Classe("recurso especial", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso especial")
var AREsp = new Classe("agravo em recurso especial", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo em recurso especial")
var agrg = new Classe("agravo regimental", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo regimental")
var edcl = new Classe("embargos de declaração", "opostos", "embargante", "<b>acolho os embargos.</b>", "<b>rejeito os embargos.</b>", "embargos de declaração")



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


function incluirApreensao (){
  var maconha = document.getElementById('maconha').value
  var node = document.createElement("span");
  var textnode = document.createTextNode('Apreensão de ' + maconha );
  node.appendChild(textnode);
  document.getElementById("resultado").appendChild(node);

}
  
var faseLiminar = {
    
liminarComLiminar: 'com pedido liminar',
meritoComLiminar: 'com pedido liminar',
semLiminar: ''

}
function selecionaFase(argumento5){
  document.getElementById('se_liminar').innerHTML = faseLiminar[argumento5]
  if (argumento5 != 'liminarComLiminar') {
    document.getElementById('informacoes').innerHTML = 'Informações prestadas'}

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
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('conversaoForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var maconha = document.getElementById('maconha').value ? document.getElementById('maconha').value : null;
        var cocaina = document.getElementById('cocaina').value ? document.getElementById('cocaina').value : null;
        var crack = document.getElementById('crack').value ? document.getElementById('crack').value : null;
        var outros = document.getElementById('outros').value ? document.getElementById('outros').value : null;

        var resultadoApreensao = document.getElementById('resultadoApreensao');
        resultadoApreensao.innerHTML = ''; // Limpa o conteúdo do elemento 'resultadoApreensao'

        if (maconha) {
            var novoParagrafo = document.createElement('p');
            if (maconha >= 1000000) {
                novoParagrafo.innerHTML = 'Maconha: ' + (maconha / 1000000).toLocaleString('pt-BR') + ' toneladas';
            } else if (maconha >= 1000) {
                novoParagrafo.innerHTML = 'Maconha: ' + (maconha / 1000).toLocaleString('pt-BR') + ' quilogramas';
            } else {
                novoParagrafo.innerHTML = 'Maconha: ' + maconha.toLocaleString('pt-BR') + ' gramas';
            }
            resultadoApreensao.appendChild(novoParagrafo);
        }
        if (cocaina) {
            var novoParagrafo = document.createElement('p');
            if (cocaina >= 1000000) {
                novoParagrafo.innerHTML = 'Cocaína: ' + (cocaina / 1000000).toLocaleString('pt-BR') + ' toneladas';
            } else if (cocaina >= 1000) {
                novoParagrafo.innerHTML = 'Cocaína: ' + (cocaina / 1000).toLocaleString('pt-BR') + ' quilogramas';
            } else {
                novoParagrafo.innerHTML = 'Cocaína: ' + cocaina.toLocaleString('pt-BR') + ' gramas';
            }
            resultadoApreensao.appendChild(novoParagrafo);
        }
        if (crack) {
            var novoParagrafo = document.createElement('p');
            if (crack >= 1000000) {
                novoParagrafo.innerHTML = 'Crack: ' + (crack / 1000000).toLocaleString('pt-BR') + ' toneladas';
            } else if (crack >= 1000) {
                novoParagrafo.innerHTML = 'Crack: ' + (crack / 1000).toLocaleString('pt-BR') + ' quilogramas';
            } else {
                novoParagrafo.innerHTML = 'Crack: ' + crack.toLocaleString('pt-BR') + ' gramas';
            }
            resultadoApreensao.appendChild(novoParagrafo);
        }
        if (outros) {
            var novoParagrafo = document.createElement('p');
            if (outros >= 1000000) {
                novoParagrafo.innerHTML = 'Outros: ' + (outros / 1000000).toLocaleString('pt-BR') + ' toneladas';
            } else if (outros >= 1000) {
                novoParagrafo.innerHTML = 'Outros: ' + (outros / 1000).toLocaleString('pt-BR') + ' quilogramas';
            } else {
                novoParagrafo.innerHTML = 'Outros: ' + outros.toLocaleString('pt-BR') + ' gramas';
            }
            resultadoApreensao.appendChild(novoParagrafo);
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
      for(i = 0; i < data.teses.length; i++) {
        tese = data.teses[i];
        tags = tese.tags || '';
        if((tese.tese && tese.tese.toUpperCase().indexOf(filter) > -1) || (tags && tags.toUpperCase().indexOf(filter) > -1) || tese.id.toString() === input.value) {
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
      if (event.target.tagName === 'OPTION') {
        var selectedTeseText = event.target.value;
        
        var selectedTese = document.getElementById('tesesSelecionadas');
        var teseEnfrentar = document.getElementById('teseEnfrentar'); // Novo elemento
        
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
        teseEnfrentar.appendChild(p2); // Adiciona ao novo elemento
        
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
        for(i = 0; i < data.pedidos.length; i++) {
          pedido = data.pedidos[i];
          tags = pedido.tags || '';
          if((pedido.pedido && pedido.pedido.toUpperCase().indexOf(filter) > -1) || (tags && tags.toUpperCase().indexOf(filter) > -1) || pedido.id.toString() === input.value) {
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
      results.addEventListener('click', function(event) {
        if (event.target.tagName === 'OPTION') {
          var selectedPedidoText = event.target.value;
  
          var selectedPedido = document.getElementById('pedidoPrincipal1');
          var pedidoEnfrentar = document.getElementById('pedidoEnfrentar'); // Novo elemento
  
          // Verifica se o pedido já foi adicionado
          var alreadyAdded = Array.from(selectedPedido.getElementsByTagName('p')).some(p => p.textContent.slice(3) === selectedPedidoText);
          if (alreadyAdded) {
            alert('Este pedido já foi adicionado.');
            return;
          }
  
          // Cria um novo parágrafo para o pedido selecionado
          var p = document.createElement('p');
          // Adiciona o marcador de letras correspondente
          p.textContent = String.fromCharCode(97 + letterIndexPedido) + ") " + selectedPedidoText; // Use letterIndexPedido aqui
          selectedPedido.appendChild(p);
  
          // Duplica o código para adicionar o pedido ao elemento pedidoEnfrentar 
          var p2 = document.createElement('p');
          p2.textContent = String.fromCharCode(97 + letterIndex).toLocaleLowerCase() + ") " + selectedPedidoText;
          pedidoEnfrentar.appendChild(p2); // Adiciona ao novo elemento
  
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
function selecionaLiminar(argumento4){
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
function selecionaParecer(argumento1){ 
  
    document.getElementById('parecerMinisterial').innerHTML = 'O Ministério Público Federal manifestou-se '
    document.getElementById('parecerClasse').innerHTML = parecer[argumento1]

}

function zerarTudo(){
  document.getElementById('DELITO').innerHTML = ''
  document.getElementById('tesesSelecionadas').innerHTML = ''
  document.getElementById('informacoes').innerHTML = ''
  contadorDelito = []
  contadorPedidos = []
  contadorTeses = []
  document.getElementById('dosDelitos').innerHTML = 'do delito'
  document.getElementById('pedidoPrincipal').innerHTML = ''
}


 


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
  if (document.getElementById('analise_liminar').checked){
        document.getElementById("se_liminar").innerHTML = "com pedido liminar";
        document.getElementById('se_liminar2').innerHTML = "";
        document.getElementById('pedidoLiminar').innerHTML = ', liminarmente e no mérito,'
  } else if (document.getElementById('analise_merito').checked) {
        document.getElementById('se_liminar').innerHTML = "";
        
  } else if (document.getElementById('sem_liminar').checked) {
          document.getElementById('se_liminar').innerHTML = "";
          document.getElementById('se_liminar2').innerHTML = "Não houve pedido liminar."}

      
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



async function copyFormattedTextToClipboard() {
  let element = document.getElementsByClassName('texto_base_relatorio')[0];
  let styledHtml = `<p style="font-family: Arial, Helvetica, sans-serif; margin-bottom: 7.1pt; text-indent: 2cm;">${element.innerHTML}</p>`;
  let textToCopy = new Blob([styledHtml], {type: 'text/html'});
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
