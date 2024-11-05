// jogadores.js
const { jogadores } = require('./storage');

// Implement the AdicionarJogador method
function adicionarJogador(call, callback) {
    const novoJogador = call.request.jogador;
    jogadores.push(novoJogador);
    callback(null, novoJogador);
}

// Implement the ListarJogadores method
function listarJogadores(call, callback) {
    callback(null, { jogadores: jogadores });
}

module.exports = {
    adicionarJogador,
    listarJogadores,
};
