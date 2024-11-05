// client.js
const readline = require('readline');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the proto file
const PROTO_PATH = path.join(__dirname, '../proto/futebol.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const futebol = grpc.loadPackageDefinition(packageDefinition).futebol;

// Create a client
const client = new futebol.TimeFutebol('127.0.0.1:50051', grpc.credentials.createInsecure());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display the menu
function menu() {
    console.log('Escolha uma opção:');
    console.log('1: Adicionar Jogador');
    console.log('2: Listar Jogadores');
    console.log('3: Adicionar Time');
    console.log('4: Vincular Jogadores a Time');
    console.log('5: Listar Times');
    console.log('0: Sair');
}

// Function to handle user input
function handleInput(option) {
    switch (option) {
        case '1':
            rl.question('Digite o ID do jogador: ', (id) => {
                rl.question('Digite o nome do jogador: ', (nome) => {
                    rl.question('Digite a posição do jogador: ', (posicao) => {
                        rl.question('Digite a idade do jogador: ', (idade) => {
                            client.AdicionarJogador({ jogador: { id, nome, posicao, idade: parseInt(idade) } }, (error, response) => {
                                if (error) {
                                    console.error('Error adding player:', error);
                                } else {
                                    console.log('Player added:', response);
                                }
                                menu();
                            });
                        });
                    });
                });
            });
            break;

        case '2':
            client.ListarJogadores({}, (error, response) => {
                if (error) {
                    console.error('Error listing players:', error);
                } else {
                    console.log('Players:', response.jogadores);
                }
                menu();
            });
            break;

        case '3':
            rl.question('Digite o ID do time: ', (id) => {
                rl.question('Digite o nome do time: ', (nome) => {
                    client.AdicionarTime({ time: { id, nome } }, (error, response) => {
                        if (error) {
                            console.error('Error adding team:', error);
                        } else {
                            console.log('Team added:', response);
                        }
                        menu();
                    });
                });
            });
            break;

        case '4':
            rl.question('Digite o ID do time: ', (time_id) => {
                rl.question('Digite os IDs dos jogadores (separados por vírgula): ', (jogadores_ids) => {
                    const ids = jogadores_ids.split(',').map(id => id.trim());
                    console.log("Time ID:", time_id);
                    console.log("Jogadores IDs:", ids);
                    console.log("Enviando dados:", { time_id, jogadores_ids:ids });
                    client.VincularJogador({ time_id, jogadores_ids:ids }, (error, response) => {
                        if (error) {
                            console.error('Error linking players:', error);
                        } else {
                            console.log('Players linked to team:', response);
                        }
                        menu();
                    });
                });
            });
            break;

        case '5':
            client.ListarTimes({}, (error, response) => {
                if (error) {
                    console.error('Error listing teams:', error);
                } else {
                    console.log('Teams:', response.times);
                }
                menu();
            });
            break;

        case '0':
            rl.close();
            break;

        default:
            console.log('Opção inválida. Tente novamente.');
            menu();
            break;
    }
}

// Start the menu
menu();
rl.on('line', handleInput);
