// Função para criar um arquivo JSON e registrar os estados
export function iniciarSessao() {
    const data = {
        estados: []
    };

    // Função para adicionar um estado
    function adicionarEstado(estado) {
        data.estados.push(estado);
    }

    // Função para desfazer uma ação
    function desfazer() {
        if (data.estados.length > 0) {
            data.estados.pop();
        }
    }

    // Função para encerrar a sessão e excluir o arquivo JSON
    function encerrarSessao() {
        // Código para excluir o arquivo JSON
        console.log("Sessão encerrada. Arquivo excluído.")
    }

    // Retornar as funções para utilização externa
    return {
        adicionarEstado,
        desfazer,
        encerrarSessao
    };
}


