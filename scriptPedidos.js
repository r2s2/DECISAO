    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        var pedido = document.getElementById('caixaPedido').value;
        var tags = document.getElementById('caixaTagsPedidos').value;

        var data = {
            pedido: pedido,
            tagsPedidos: tags
        };

        fetch('/adiciona_pedidos.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data).toString()
        }).then(function(response) {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Erro ao adicionar pedido');
            }
        }).then(function(text) {
            console.log(text);
            // Não redirecione ainda
            // window.location.href = '/adiciona_pedidos.html';
        }).catch(function(error) {
            console.error(error);
        });
    });

  