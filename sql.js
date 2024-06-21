const sqlite3 = require('sqlite3').verbose();

// Abra a conexão com o banco de dados
let db = new sqlite3.Database('./banco_dados.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado ao banco de dados SQLite.');
});

// Dados a serem inseridos
let grupo = "prisão";
let tese = "COVID";
let tags = "covid, doença, humanitário";

let sql = `INSERT INTO teses(grupo, tese, tags) VALUES(?, ?, ?)`;

db.run(sql, [grupo, tese, tags], function(err) {
  if (err) {
    console.error('Erro ao inserir dados:', err.message);
    return;
  }
  console.log(`Tese adicionada com ID: ${this.lastID}`);
});