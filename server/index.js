// index.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const jogadores = require('./jogadores');
const times = require('./times');

// Load the proto file
const PROTO_PATH = path.join(__dirname, '../proto/futebol.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const futebol = grpc.loadPackageDefinition(packageDefinition).futebol;

// Create the gRPC server
const server = new grpc.Server();
server.addService(futebol.TimeFutebol.service, {
    AdicionarJogador: jogadores.adicionarJogador,
    ListarJogadores: jogadores.listarJogadores,
    AdicionarTime: times.adicionarTime,
    VincularJogador: times.vincularJogador,
    ListarTimes: times.listarTimes,
});

// Start the server
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error('Error binding server:', error);
        return;
    }
    server.start();
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
