document.addEventListener('DOMContentLoaded', function() {
  var textoBaseRelatorio = document.getElementById('texto_base_relatorio');

  if (textoBaseRelatorio) {
    textoBaseRelatorio.addEventListener('click', function(event) {
      var target = event.target;

      // Verifica se o elemento clicado é um <textarea> ou <input>
      if (target.tagName.toLowerCase() === 'textarea' || target.tagName.toLowerCase() === 'input') {
        return; // Não faz nada se o elemento clicado for um <textarea> ou <input>
      }

      // Torna a div inteira editável
      textoBaseRelatorio.contentEditable = true;
      textoBaseRelatorio.focus();

      // Adiciona um evento para desativar a edição ao perder o foco
      textoBaseRelatorio.addEventListener('blur', function() {
        textoBaseRelatorio.contentEditable = false;
      }, { once: true });
    });
  }
});