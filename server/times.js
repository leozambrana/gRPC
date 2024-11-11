// times.js
const { times } = require('./storage');
const grpc = require('@grpc/grpc-js');

function deletarTime(call, callback) {
    const { time_id } = call.request;
    const index = times.findIndex(t => t.id === time_id);

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
    console.log("Dados recebidos no servidor:", (call)); // Adiciona log para ver o que está chegando

    const { time_id, jogadores_ids } = call.request; // Desestrutura o request
    console.log('jogadores_ids',jogadores_ids)
    console.log('times',times)
    console.log('times.find(t => t.id === time_id)',times.find(t => t.id === time_id))
    const time = times.find(t => t.id === time_id);

    if (time) {
        time.jogadores_ids.push(...jogadores_ids); // Adiciona os IDs dos jogadores ao time
        callback(null, { message: `Jogadores vinculados ao time ${time.nome}` }); // Retorna mensagem de sucesso
    } else {
        console.log('se ele cai aqui tem algo mtooo errado')
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Time não encontrado."
        });
    }
}

// Implement the ListarTimes method
function listarTimes(call, callback) {
    callback(null, { times: times });
}

module.exports = {
    adicionarTime,
    vincularJogador,
    listarTimes,
    deletarTime,
};
