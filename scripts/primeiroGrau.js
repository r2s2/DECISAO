function primeiroGrau() {
  registrarEstado();

  const input = document.getElementById('primeiroGrau');
  const primeiroGrauTexto = document.getElementById('primeiroGrauTexto');
  if (!input || !primeiroGrauTexto) return;

  // Verificar se há um conteúdo duplicado para evitar adicioná-lo duas vezes
  if (primeiroGrauTexto.innerHTML.includes(input.value)) return;

  // Cria um elemento p2 para o cabeçalho
  const p2 = document.createElement('p');
  p2.innerHTML = "Assim se manifestou o Juízo de 1º Grau, <i>ipsis litteris</i>:";
  primeiroGrauTexto.appendChild(p2);

  // Divide o texto de entrada em parágrafos
  input.value.split('\n').forEach(paragraphText => {
    if (paragraphText.trim() !== '') { // Ignora linhas vazias
      const p = document.createElement('p');
      p.id = 'primeiroGrauId'; // Adiciona o ID primeiroGrau ao parágrafo
      p.style.fontStyle = 'italic';
      p.style.paddingLeft = '3.1cm';
      p.style.textIndent = '0';
      p.style.fontSize = '11pt';
      p.textContent = paragraphText;
      primeiroGrauTexto.appendChild(p);
    }
  });

  // Remove o botão e a caixa de texto após a inclusão do texto
  input.parentElement.remove();
}

document.addEventListener('DOMContentLoaded', function() {
  const floatButtonPrimeiroGrau = document.getElementById('floatButtonPrimeiroGrau');
  const primeiroGrauTexto = document.getElementById('primeiroGrauTexto');

  floatButtonPrimeiroGrau.addEventListener('click', function() {
      const inputElement = document.createElement('textarea');
      inputElement.id = 'primeiroGrau';
      inputElement.rows = 8;
      inputElement.cols = 40;
      inputElement.placeholder = 'Assim se manifestou o Juízo de 1º Grau: (apenas colar o texto + Incluir)';

      // Cria o elemento p e adiciona o textarea a ele
      const pElement = document.createElement('p');
      pElement.appendChild(inputElement);

      // Cria o botão "Incluir" e adiciona-o após o textarea
      const buttonElement = document.createElement('button');
      buttonElement.textContent = 'Incluir';
      buttonElement.onclick = primeiroGrau;
      pElement.appendChild(document.createElement('br'));
      pElement.appendChild(buttonElement);

      // Adiciona o parágrafo ao elemento primeiroGrauTexto
      primeiroGrauTexto.appendChild(pElement);

      // Focar no textarea para permitir a digitação imediata
      inputElement.focus();
  });
});