document.addEventListener('DOMContentLoaded', function() {
  var textoBaseRelatorio = document.getElementById('texto_base_relatorio');

  if (textoBaseRelatorio) {
    textoBaseRelatorio.addEventListener('click', function(event) {
      var target = event.target;

      // Verifica se o elemento clicado é um filho direto da div
      if (textoBaseRelatorio.contains(target)) {
        // Torna o elemento editável
        target.contentEditable = true;
        target.focus();

        // Adiciona um evento para desativar a edição ao perder o foco
        target.addEventListener('blur', function() {
          target.contentEditable = false;
        }, { once: true });
      }
    });
  }
});