document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var tese = document.getElementById('caixaTese').value;
    var tags = document.getElementById('caixaTags').value;
    var grupo = document.getElementById('caixaGrupo').value;

    var data = {
        tese: tese,
        tags: tags,
        grupo: grupo
    };

    fetch('/adiciona_teses.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString()
    }).then(function(response) {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Erro ao adicionar tese');
        }
    }).then(function(text) {
        console.log(text);
        window.location.href = '/adiciona_teses.html';
    }).catch(function(error) {
        console.error(error);
    });
});