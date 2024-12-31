//criar função que encaminha para o resultados.json o resultado, precedente e tags

// Path: scriptResultado.js

function gerarChaveUnica() {
  return URL.createObjectURL(new Blob()).slice(-36);
}

function verificarIdUnico(id, resultados) {
  return !resultados.some(resultado => resultado.id === id);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        var topico = document.getElementById('caixaTopico').value.trim();
        var resultado = document.getElementById('caixaResultado').value.trim();
        var precedente = document.getElementById('caixaPrecedente').value.trim();
        var tags = document.getElementById('caixaTags').value.trim();

        // Verificar se topico e resultado não estão vazios
        if (topico === '' || resultado === '') {
            alert('Os campos "Tópico" e "Resultado" são obrigatórios.');
            return;
        }

        fetch('resultados.json')
            .then(response => response.json())
            .then(data => {
                var id;
                do {
                    id = gerarChaveUnica(); // Gerar ID único
                } while (!verificarIdUnico(id, data.resultados));

                var novoResultado = {
                    id: id, // Adicionar ID único aos dados
                    topico: topico,
                    resultado: resultado,
                    precedente: precedente,
                    tags: tags
                };
        var topico = document.getElementById('caixaTopico').value.trim();
        var resultado = document.getElementById('caixaResultado').value.trim();
        var precedente = document.getElementById('caixaPrecedente').value.trim();
        var tags = document.getElementById('caixaTags').value.trim();

        // Verificar se topico e resultado não estão vazios
        if (topico === '' || resultado === '') {
            alert('Os campos "Tópico" e "Resultado" são obrigatórios.');
            return;
        }

        fetch('resultados.json')
            .then(response => response.json())
            .then(data => {
                var id;
                do {
                    id = gerarChaveUnica(); // Gerar ID único
                } while (!verificarIdUnico(id, data.resultados));

                var novoResultado = {
                    id: id, // Adicionar ID único aos dados
                    topico: topico,
                    resultado: resultado,
                    precedente: precedente,
                    tags: tags
                };

                fetch('/adiciona_resultados.html', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(novoResultado).toString()
                }).then(function(response) {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Erro ao adicionar resultado');
                    }
                }).then(function(text) {
                    console.log(text);
                    window.location.href = '/adiciona_resultados.html';
                }).catch(function(error) {
                    console.error(error);
                });
            })
            .catch(function(error) {
                console.error('Erro ao carregar resultados:', error);
            });
                fetch('/adiciona_resultados.html', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(novoResultado).toString()
                }).then(function(response) {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Erro ao adicionar resultado');
                    }
                }).then(function(text) {
                    console.log(text);
                    window.location.href = '/adiciona_resultados.html';
                }).catch(function(error) {
                    console.error(error);
                });
            })
            .catch(function(error) {
                console.error('Erro ao carregar resultados:', error);
            });
    });
});