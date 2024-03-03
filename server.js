const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const querystring = require('querystring');

http.createServer(function (req, res) {
    const requestUrl = url.parse(req.url);
    let pathname = requestUrl.pathname;

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = querystring.parse(body);

            if (pathname === '/adiciona_teses.html') {
                const tese = data.tese;
                const tags = data.tags;
                const grupo = data.grupo;

                fs.readFile('teses.json', (err, fileData) => {
                    if (err) throw err;
                    let json = JSON.parse(fileData);
                    var id = json.teses.length + 1;
                    json.teses.push({ id, grupo, tese, tags });

                    fs.writeFileSync('teses.json', JSON.stringify(json));
                    console.log('Tese adicionada com sucesso!');
                });

                res.writeHead(302, {'Location': 'adiciona_teses.html'});
                res.end('Tese adicionada com sucesso!');
            } else if (pathname === '/adiciona_pedidos.html') {
                const pedido = data.pedido;
                const tagsPedidos = data.tagsPedidos;

                fs.readFile('pedidos.json', (err, fileData) => {
                    if (err) throw err;
                    let json = JSON.parse(fileData);
                    var id = json.pedidos.length + 1;
                    json.pedidos.push({ id, pedido, tagsPedidos });

                    fs.writeFileSync('pedidos.json', JSON.stringify(json));
                    console.log('Pedido adicionado com sucesso!');
                });

                res.writeHead(302, {'Location': 'adiciona_pedidos.html'});
                res.end('Pedido adicionado com sucesso!');
            } else if (pathname === '/excluir_tese') {
                const id = parseInt(data.id);

                fs.readFile('teses.json', (err, fileData) => {
                    if (err) throw err;
                    let json = JSON.parse(fileData);
                    json.teses = json.teses.filter(tese => tese.id !== id);

                    fs.writeFileSync('teses.json', JSON.stringify(json));
                    console.log('Tese excluída com sucesso!');
                    res.end('Tese excluída com sucesso!');
                });
            } else if (pathname === '/excluir_pedido') {
                const id = parseInt(data.id);

                fs.readFile('pedidos.json', (err, fileData) => {
                    if (err) throw err;
                    let json = JSON.parse(fileData);
                    json.pedidos = json.pedidos.filter(pedido => pedido.id !== id);

                    fs.writeFileSync('pedidos.json', JSON.stringify(json));
                    console.log('Pedido excluído com sucesso!');
                    res.end('Pedido excluído com sucesso!');
                });
            }
        });
    } else {
        const filePath = path.join(__dirname, pathname === '/' ? '/tela_trabalho.html' : pathname);
        const ext = path.extname(filePath).toLowerCase();
        let contentType;

        switch (ext) {
            case '.html':
                contentType = 'text/html';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            default:
                contentType = 'text/plain';
        }

        fs.readFile(filePath, function(err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Erro ao ler o arquivo ' + filePath);
            } else {
                res.writeHead(200, {'Content-Type': contentType});
                res.end(data);
            }
        });
    }
}).listen(8082);