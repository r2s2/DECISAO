const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/adiciona_pedidos', (req, res) => {
    const data = req.body;

    fs.readFile('pedidos.json', (err, json) => {
        if (err) throw err;

        const obj = JSON.parse(json);
        obj.pedidos.push(data);

        fs.writeFile('pedidos.json', JSON.stringify(obj), (err) => {
            if (err) throw err;
            console.log('Pedido adicionado');
        });
    });

    res.status(200).send('Pedido adicionado');
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));


