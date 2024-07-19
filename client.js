/*
 document.addEventListener('DOMContentLoaded', (event) => {
    // Seu código aqui

   



document.addEventListener('DOMContentLoaded', function() {
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

        const sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('./banco_dados.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
              console.error(err.message);
            }
            console.log('Conectado ao banco de dados SQLite.');
          });
        
        let grupo = document.getElementById('caixaGrupo').value;
        let tese = document.getElementById('caixaTese').value;
        let tags = document.getElementById('caixaTags').value;
        
        let sql = `INSERT INTO teses(grupo, tese, tags) VALUES(?, ?, ?)`;
        
        db.run(sql, [grupo, tese, tags], function(err) {
          if (err) {
            console.error('Erro ao inserir dados:', err.message);
            return;
          }
          console.log(`Tese adicionada com ID: ${this.lastID}`);
        });

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
});


});



// Abra a conexão com o banco de dados

// Dados a serem inseridos
*/