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
            let data;
            const contentType = req.headers['content-type'];
            console.log('Content-Type recebido:', contentType); // Log para verificar o Content-Type

            try {
                if (contentType.startsWith('application/json')) {
                    data = JSON.parse(body);
                } else if (contentType === 'application/x-www-form-urlencoded') {
                    data = querystring.parse(body);
                } else {
                    throw new Error(`Unsupported content type: ${contentType}`);
                }
            } catch (error) {
                console.error('Erro ao parsear dados:', error);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Erro ao parsear dados');
                return;
            }

            if (pathname === '/adiciona_teses.html') {
                const tese = data.tese;
                const tags = data.tags;
                const grupo = data.grupo;

                fs.readFile('teses.json', (err, fileData) => {
                    if (err) {
                        console.error('Erro ao ler o arquivo:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Erro ao ler o arquivo de teses');
                        return;
                    }
                    let json = JSON.parse(fileData);
                    var id = json.teses.length + 1;
                    json.teses.push({ id, grupo, tese, tags });

                    fs.writeFile('teses.json', JSON.stringify(json), (err) => {
                        if (err) {
                            console.error('Erro ao escrever no arquivo:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Erro ao escrever no arquivo de teses');
                            return;
                        }

                        console.log('Tese adicionada com sucesso!');
                        res.writeHead(302, { 'Location': 'adiciona_teses.html' });
                        res.end('Tese adicionada com sucesso!');
                    });
                });

            } else if (pathname === '/adiciona_pedidos.html') {
                const pedido = data.pedido;
                const tagsPedidos = data.tagsPedidos;

                fs.readFile('pedidos.json', (err, fileData) => {
                    if (err) {
                        console.error('Erro ao ler o arquivo:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Erro ao ler o arquivo de pedidos');
                        return;
                    }
                    let json = JSON.parse(fileData);
                    var id = json.pedidos.length + 1;
                    json.pedidos.push({ id, pedido, tagsPedidos });

                    fs.writeFile('pedidos.json', JSON.stringify(json), (err) => {
                        if (err) {
                            console.error('Erro ao escrever no arquivo:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Erro ao escrever no arquivo de pedidos');
                            return;
                        }

                        console.log('Pedido adicionado com sucesso!');
                        res.writeHead(302, { 'Location': 'adiciona_pedidos.html' });
                        res.end('Pedido adicionado com sucesso!');
                    });
                });

            } else if (pathname === '/excluir_tese') {
                const id = parseInt(data.id);

                fs.readFile('teses.json', (err, fileData) => {
                    if (err) {
                        console.error('Erro ao ler o arquivo:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Erro ao ler o arquivo de teses');
                        return;
                    }
                    let json = JSON.parse(fileData);
                    const lengthBefore = json.teses.length;
                    json.teses = json.teses.filter(tese => tese.id !== id);
                    const lengthAfter = json.teses.length;

                    if (lengthBefore === lengthAfter) {
                        console.log('Tese não encontrada.');
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Tese não encontrada.');
                        return;
                    }

                    fs.writeFile('teses.json', JSON.stringify(json), (err) => {
                        if (err) {
                            console.error('Erro ao escrever no arquivo:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Erro ao escrever no arquivo de teses');
                            return;
                        }

                        console.log('Tese excluída com sucesso!');
                        res.end('Tese excluída com sucesso!');
                    });
                });

            } else if (pathname === '/excluir_pedido') {
                const id = parseInt(data.id);

                fs.readFile('pedidos.json', (err, fileData) => {
                    if (err) {
                        console.error('Erro ao ler o arquivo:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Erro ao ler o arquivo de pedidos');
                        return;
                    }
                    let json = JSON.parse(fileData);
                    const lengthBefore = json.pedidos.length;
                    json.pedidos = json.pedidos.filter(pedido => pedido.id !== id);
                    const lengthAfter = json.pedidos.length;

                    if (lengthBefore === lengthAfter) {
                        console.log('Pedido não encontrado.');
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Pedido não encontrado.');
                        return;
                    }

                    fs.writeFile('pedidos.json', JSON.stringify(json), (err) => {
                        if (err) {
                            console.error('Erro ao escrever no arquivo:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Erro ao escrever no arquivo de pedidos');
                            return;
                        }

                        console.log('Pedido excluído com sucesso!');
                        res.end('Pedido excluído com sucesso!');
                    });
                });

            } else if (pathname === '/adiciona_resultados.html') {
                const resultado = data.resultado;
                const tags = data.tags;
                const precedente = data.precedente;

                if (!precedente) {
                    console.log('Erro: precedente está vazio ou indefinido');
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Erro: precedente está vazio ou indefinido');
                    return;
                }

                fs.readFile('resultados.json', (err, fileData) => {
                    if (err) {
                        console.error('Erro ao ler o arquivo:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Erro ao ler o arquivo de resultados');
                        return;
                    }
                    let json = JSON.parse(fileData);
                    var id = json.resultados.length + 1;
                    json.resultados.push({ id, resultado, tags, precedente });

                    fs.writeFile('resultados.json', JSON.stringify(json), (err) => {
                        if (err) {
                            console.error('Erro ao escrever no arquivo:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Erro ao escrever no arquivo de resultados');
                            return;
                        }

                        res.writeHead(302, { 'Location': 'adiciona_resultados.html' });
                        res.end('Resultado adicionado com sucesso!');
                    });
                });

            } else if (pathname === '/excluir_resultado') {
                const id = parseInt(data.id);
                console.log('ID a ser excluído:', id); // Adicionar depuração para verificar o ID recebido
                
                fs.readFile('resultados.json', (err, fileData) => {
                    if (err) {
                        console.error('Erro ao ler o arquivo:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Erro ao ler o arquivo de resultados');
                        return;
                    }
                    let json = JSON.parse(fileData);
                    console.log('Resultados antes da exclusão:', json.resultados); // Adicionar depuração antes da exclusão
                    
                    const lengthBefore = json.resultados.length;
                    json.resultados = json.resultados.filter(resultado => resultado.id !== id);
                    const lengthAfter = json.resultados.length;
                    
                    console.log('Resultados após a exclusão:', json.resultados); // Adicionar depuração após a exclusão

                    if (lengthBefore === lengthAfter) {
                        console.log('Resultado não encontrado.');
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Resultado não encontrado.');
                        return;
                    }

                    fs.writeFile('resultados.json', JSON.stringify(json), (err) => {
                        if (err) {
                            console.error('Erro ao escrever no arquivo:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Erro ao escrever no arquivo de resultados');
                            return;
                        }

                        console.log('Resultado excluído com sucesso!');
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Resultado excluído com sucesso!');
                    });
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

        fs.readFile(filePath, function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao ler o arquivo ' + filePath);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
}).listen(8082, () => {
    console.log('Servidor rodando na porta 8082');
});
