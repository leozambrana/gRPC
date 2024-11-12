// times.js
const { times, jogadores } = require('./storage');
const grpc = require('@grpc/grpc-js');

function deletarTime(call, callback) {
    const id = call.request.id;
    const index = times.findIndex(t => t.id === id);

    if (index !== -1) {
        times.splice(index, 1);
        callback(null, { message: "Time deletado com sucesso." });
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Time não encontrado."
        });
    }
}

// Implement the AdicionarTime method
function adicionarTime(call, callback) {
    const novoTime = call.request.time;
    times.push(novoTime);
    callback(null, { time: novoTime });
}

// Implement the VincularJogador method
function vincularJogador(call, callback) {
    const { id, idJogador } = call.request; // Desestrutura o request
     const time = times.find(t => t.id === id);

    if (time) {
        time.jogadoresIds.push(...idJogador); // Adiciona os IDs dos jogadores ao time
        callback(null, { message: `Jogadores vinculados ao time ${time.nome}` }); // Retorna mensagem de sucesso
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Time não encontrado."
        });
    }
}

// Implement the ListarTimes method
function listarTimes(call, callback) {
    const timesComNomes = times.map((time) => {
        const nomesJogadores = time.jogadoresIds.map((id) => {
            const jogador = jogadores.find((jogador) =>jogador.idJogador ==id);
            return jogador ? jogador.nome : null; // Se jogador encontrado, retorna o nome
        }).filter(nome => nome !== null); // Remove qualquer valor null (caso o jogador não seja encontrado)

        return {
            ...time,
            jogadoresIds:nomesJogadores,
        };
    });
    callback(null, { times: timesComNomes });
}

module.exports = {
    adicionarTime,
    vincularJogador,
    listarTimes,
    deletarTime,
};
