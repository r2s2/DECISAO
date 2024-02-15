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
    document.getElementById('sinonimo').innerHTML = this.sinonimo;
    }
}

var HC = new Classe("<i>habeas corpus</i>", "impetrado em favor de", "paciente", "<b>concedo a ordem.</b>", "<b>denego a ordem.</b>", "<i>writ</i>")
var RHC = new Classe("recurso ordinário em <i>habeas corpus</i>", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso ordinário")
var REsp = new Classe("recurso especial", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso especial")
var AREsp = new Classe("agravo em recurso especial", "interposto", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo em recurso especial")



var contadorDelito = []
var contadorPedidos = []
contadorTeses = []

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
        if(tese.tese.toUpperCase().indexOf(filter) > -1 || tags.toUpperCase().indexOf(filter) > -1 || tese.id.toString() === input.value) {
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
  
    document.getElementById('parecerMinisterial').innerHTML = 'O MinistÃ©rio PÃºblico Federal manifestou-se '
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
 

  if (document.getElementById('HC').checked) {
    HC.selecionadoClasse();
  } else if (document.getElementById('RHC').checked) {
    RHC.selecionadoClasse();
  } else if (document.getElementById('RESP').checked) {
    REsp.selecionadoClasse();
  } else if (document.getElementById('ARESP').checked) {
    AREsp.selecionadoClasse();
  }   


    //if da escolha da fase
  if (document.getElementById('analise_liminar').checked){
        document.getElementById("se_liminar").innerHTML = "com pedido liminar";
        document.getElementById('se_liminar2').innerHTML = "";
        document.getElementById('pedidoLiminar').innerHTML = ', liminarmente e no mÃ©rito,'
  } else if (document.getElementById('analise_merito').checked) {
        document.getElementById('se_liminar').innerHTML = "";
        
  } else if (document.getElementById('sem_liminar').checked) {
          document.getElementById('se_liminar').innerHTML = "";
          document.getElementById('se_liminar2').innerHTML = "NÃo houve pedido liminar."}

      
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


