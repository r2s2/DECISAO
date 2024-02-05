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
var RHC = new Classe("recurso ordinário em <i>habeas corpus</i>", "interposto por", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso ordinário")
var REsp = new Classe("recurso especial", "interposto por", "recorrente por", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "recurso especial")
var AREsp = new Classe("agravo em recurso especial", "interposto por", "recorrente", "<b>dou provimento ao recurso.</b>", "<b>nego provimento ao recurso.</b>", "agravo em recurso especial")



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



var teses = {
  requisitos: "Ausência de fundamentos idôneos para a decretação e manutenção da prisão preventiva.",
  prazoInstrucao: 'Estar configurado constrangimento ilegal por excesso de prazo da prisão preventiva por não haver previsão para o encerramento da instrução criminal.',
  prazoApelacao: 'Estar configurado excesso de prazo da prisão pela demora no julgamento da apelação.',
  cautelares: 'Ser desproporcional a custódia  antecipada, sendo recomendável sua substituição por medidas cautelares diversas previstas no art. 319 do Código de Processo Penal.',
  condicoes: 'Assere que as condições pessoais favoráveis militam contra a segregação cautelar.',
  contemporaneidade: 'Não haver contemporaneidade entre a data dos fatos narrados e a decretação da custódia.',
  desproporcionalidade: 'Ser desproporcional a prisão, uma vez que uma futura condenação importaria em fixação de regime de cumprimento de pena menos gravoso do que a cautela máxima.',
  oficio: 'Ser ilegal a decretação de prisão preventiva de ofício, sem manifestação nesse sentido das autoridades competentes.',
  revisao: 'Não ter havido a revisão obrigatória da necessidade da custódia em 90 dias, como prevê a norma regente.',
  domiciliarMae: 'Fazer jus a agente à prisão domiciliar em razão de ser mãe de criançamenor de 12 anos.',
  domiciliarCovid: 'Fazer jus à prisão domiciliar em razão contexto de pandemia de COVID.'

} 
function selecionaTese(id) {
  var index = contadorTeses.indexOf(id);
  if (index !== -1) {
    // Se o id já está no contadorTeses, remova-o
    contadorTeses.splice(index, 1);

    // Remova o elemento correspondente do DOM
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
  } else {
    // Se o id não está no contadorTeses, adicione-o
    contadorTeses.push(id);

    // Crie um novo elemento no DOM
    var node = document.createElement("p");
    node.id = id;  // Adicione um id ao elemento para que possamos removê-lo mais tarde
    var textnode = document.createTextNode(teses[id]);
    node.appendChild(textnode);
    document.getElementById("tesesSelecionadas").appendChild(node);
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




   


   // document.getElementById('teste5').innerHTML = teses['cautelares']
    /*if da escolha da classe*/
  /*
   if (document.getElementById('HC').checked){
      HC.selecionadoClasse()} else if (document.getElementById('RHC').checked){ RHC.selecionadoClasse()
  } */
    
    //if da escolha da fase
  if (document.getElementById('analise_liminar').checked){
        document.getElementById("se_liminar").innerHTML = "com pedido liminar";
        document.getElementById('se_liminar2').innerHTML = "";
        document.getElementById('pedidoLiminar').innerHTML = ', liminarmente e no mÃ©rito,'
  } else if (document.getElementById('analise_merito').checked) {
        document.getElementById('se_liminar').innerHTML = "";
        
  } else if (document.getElementById('sem_liminar').checked) {
          document.getElementById('se_liminar').innerHTML = "";
          document.getElementById('se_liminar2').innerHTML = "NÃ£o houve pedido liminar."}

      
}

  
// InclusÃ£o do texto dos fatos
function fatosIncluidos() {
  var x = document.getElementById("caixaTexto").value;
  document.getElementById("fatos").innerHTML = x;
}

async function copyBlueClassToClipboard() {
  let element = document.getElementsByClassName('texto_base_relatório')[0];
  let textToCopy = element.innerText;
  try {
    await navigator.clipboard.writeText(textToCopy);
    alert('Texto copiado para a área de transferência');
  } catch (err) {
    console.error('Erro ao copiar texto: ', err);
  }
}