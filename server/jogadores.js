// jogadores.js
const { jogadores } = require('./storage');

// Implement the AdicionarJogador method
function adicionarJogador(call, callback) {
    const novoJogador = call.request.jogador;
    jogadores.push(novoJogador);
    callback(null, novoJogador);
}

function atualizarJogador(call, callback) {
    const novoJogador = call.request.jogador;
    const index = jogadores.findIndex(t => t.idJogador === novoJogador.idJogador);
    if (index !== -1) {
        jogadores.splice(index, 1);
        jogadores.push(novoJogador);
        callback(null, novoJogador);
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Jogador não encontrado."
        });
    }
}

// Implement the ListarJogadores method
function listarJogadores(call, callback) {
    callback(null, { jogadores: jogadores });
}

function deletarJogador(call, callback) {
    const idJogador = call.request.idJogador;
    const index = jogadores.findIndex(t => t.idJogador === idJogador);

    if (index !== -1) {
        jogadores.splice(index, 1);
        callback(null, { message: "Jogador deletado com sucesso." });
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Jogador não encontrado."
        });
    }
}

module.exports = {
    adicionarJogador,
    listarJogadores,
    deletarJogador,
    atualizarJogador,
};
