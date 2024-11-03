//criar função que encaminha para o resultados.json o resultado, precedente e tags

// Path: scriptResultado.js

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        var topico = document.getElementById('caixaTopico').value;
        var resultado = document.getElementById('caixaResultado').value;
        var precedente = document.getElementById('caixaPrecedente').value;
        var tags = document.getElementById('caixaTags').value;

        var data = {
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
            body: new URLSearchParams(data).toString()
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
    });
});
