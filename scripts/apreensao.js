document.addEventListener('DOMContentLoaded', function () {
  const floatButtonApreensao = document.getElementById('floatButtonApreensao');
  const resultadoApreensao = document.getElementById('resultadoApreensao');

  floatButtonApreensao.addEventListener('click', function() {
      // Cria o formulário
      const formElement = document.createElement('form');
      formElement.id = 'formApreensao';

      // Cria os campos do formulário
      const inputMaconha = document.createElement('input');
      inputMaconha.type = 'number';
      inputMaconha.id = 'maconha';
      inputMaconha.placeholder = 'Digite a quantidade de gramas';
      inputMaconha.name = 'gramas';
      inputMaconha.min = '0';
      inputMaconha.step = 'any';

      const inputCocaina = document.createElement('input');
      inputCocaina.type = 'number';
      inputCocaina.id = 'cocaina';
      inputCocaina.placeholder = 'Digite a quantidade de gramas';
      inputCocaina.name = 'gramas';
      inputCocaina.min = '0';
      inputCocaina.step = 'any';

      const inputCrack = document.createElement('input');
      inputCrack.type = 'number';
      inputCrack.id = 'crack';
      inputCrack.placeholder = 'Digite a quantidade de gramas';
      inputCrack.name = 'gramas';
      inputCrack.min = '0';
      inputCrack.step = 'any';

      const inputOutros = document.createElement('input');
      inputOutros.type = 'text';
      inputOutros.id = 'outros';
      inputOutros.placeholder = '12 tubos de lança-perfume com 30 mL de líquido';
      inputOutros.name = 'gramas';

      const inputArmas = document.createElement('input');
      inputArmas.type = 'text';
      inputArmas.id = 'armas';
      inputArmas.placeholder = '3 pistolas calibre .38, 7 munições 9mm etc';
      inputArmas.name = 'armas';

      // Cria o botão "Enviar"
      const buttonEnviar = document.createElement('input');
      buttonEnviar.type = 'submit';
      buttonEnviar.value = 'Enviar';

      // Adiciona os campos e o botão ao formulário
      formElement.appendChild(inputMaconha);
      formElement.appendChild(document.createTextNode(' MACONHA'));
      formElement.appendChild(document.createElement('br'));
      formElement.appendChild(inputCocaina);
      formElement.appendChild(document.createTextNode(' COCAÍNA'));
      formElement.appendChild(document.createElement('br'));
      formElement.appendChild(inputCrack);
      formElement.appendChild(document.createTextNode(' CRACK'));
      formElement.appendChild(document.createElement('br'));
      formElement.appendChild(inputOutros);
      formElement.appendChild(document.createTextNode(' OUTRAS DROGAS'));
      formElement.appendChild(document.createElement('br'));
      formElement.appendChild(inputArmas);
      formElement.appendChild(document.createTextNode(' ARMAS'));
      formElement.appendChild(document.createElement('br'));
      formElement.appendChild(buttonEnviar);

      // Adiciona o formulário ao elemento resultadoApreensao
      resultadoApreensao.innerHTML = ''; // Limpa o conteúdo anterior
      resultadoApreensao.appendChild(formElement);

      // Adiciona o evento de submit ao formulário
      formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        apreensao();
      });
  });
});

function apreensao() {
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
    var texto = '<b>Outros</b>: ' + outros;
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

  // Remove o formulário após a inclusão dos valores
  document.getElementById('formApreensao').remove();
}