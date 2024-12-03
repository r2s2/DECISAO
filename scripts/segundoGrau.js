function segundoGrau() {
  registrarEstado();

  const input = document.getElementById('segundoGrau');
  const segundoGrauTexto = document.getElementById('segundoGrauTexto');
  if (!input || !segundoGrauTexto) return;

  // Verificar se há um conteúdo duplicado para evitar adicioná-lo duas vezes
  if (segundoGrauTexto.innerHTML.includes(input.value)) return;

  // Cria um elemento p2 para o cabeçalho
  const p2 = document.createElement('p');
  p2.innerHTML = "A Corte de origem fundamentou seu entendimento nos seguintes termos, <i>in verbis</i>:";
  segundoGrauTexto.appendChild(p2);

  // Divide o texto de entrada em parágrafos
  input.value.split('\n').forEach(paragraphText => {
    if (paragraphText.trim() !== '') { // Ignora linhas vazias
      const p = document.createElement('p');
      p.id = 'segundoGrauId'; // Adiciona o ID segundoGrau ao parágrafo
      p.style.fontStyle = 'italic';
      p.style.marginLeft = '3.1cm';
      p.style.textIndent = '0cm';
      p.style.fontSize = '11pt';
      p.textContent = paragraphText;
      segundoGrauTexto.appendChild(p);
    }
  });

  // Remove o botão e a caixa de texto após a inclusão do texto
  input.parentElement.remove();
}

document.addEventListener('DOMContentLoaded', function() {
  const floatButtonSegundoGrau = document.getElementById('floatButtonSegundoGrau');
  const segundoGrauTexto = document.getElementById('segundoGrauTexto');

  floatButtonSegundoGrau.addEventListener('click', function() {
      const inputElement = document.createElement('textarea');
      inputElement.id = 'segundoGrau';
      inputElement.rows = 8;
      inputElement.cols = 40;
      inputElement.placeholder = 'A Corte de origem fundamentou seu entendimento nos seguintes termos, <i>in verbis</i>: (apenas colar o texto + Incluir)';

      // Cria o elemento p e adiciona o textarea a ele
      const pElement = document.createElement('p');
      pElement.appendChild(inputElement);

      // Cria o botão "Incluir" e adiciona-o após o textarea
      const buttonElement = document.createElement('button');
      buttonElement.textContent = 'Incluir';
      buttonElement.onclick = segundoGrau;
      pElement.appendChild(document.createElement('br'));
      pElement.appendChild(buttonElement);

      // Adiciona o parágrafo ao elemento segundoGrauTexto
      segundoGrauTexto.appendChild(pElement);

      // Focar no textarea para permitir a digitação imediata
      inputElement.focus();
  });
});