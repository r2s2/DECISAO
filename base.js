// o base agora é o servidor



const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Configura o Express para usar o body-parser como middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/adiciona_teses', (req, res) => {
    let db = new sqlite3.Database('./banco_dados.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err);
        }
    });

    let sql = `INSERT INTO teses(grupo, tese, tags) VALUES(?, ?, ?)`;
    db.run(sql, [req.body.grupo, req.body.tese, req.body.tags], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err);
        }
        console.log(`Tese adicionada com ID: ${this.lastID}`);
        res.status(200).send(`Tese adicionada com ID: ${this.lastID}`);
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });
});

app.post('/adiciona_pedidos', (req, res) => {
    let db = new sqlite3.Database('./banco_dados.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err);
        }
    });

    let sql = `INSERT INTO pedidos(pedido, tags) VALUES(?, ?)`;
    db.run(sql, [req.body.pedido, req.body.tags], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err);
        }
        console.log(`Pedido adicionado com ID: ${this.lastID}`);
        res.status(200).send(`Pedido adicionado com ID: ${this.lastID}`);
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });
});

app.post('/adiciona_resultados', (req, res) => {
    let db = new sqlite3.Database('./banco_dados.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err);
        }
    });

    let sql = `INSERT INTO resultados(resultado, precedente, tags) VALUES(?, ?, ?)`;
    db.run(sql, [req.body.resultado, req.body.precedente, req.body.tags], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err);
        }
        console.log(`Resultado adicionado com ID: ${this.lastID}`);
        res.status(200).send(`Resultado adicionado com ID: ${this.lastID}`);
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});