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
    console.info('Escolha uma opção:');
    console.info('1: Adicionar Jogador');
    console.info('2: Listar Jogadores');
    console.info('3: Adicionar Time');
    console.info('4: Vincular Jogadores a Time');
    console.info('5: Listar Times');
    console.info('6: Deletar Time');
    console.info('7: Deletar Jogador');
    console.info('8: Atualizar Jogador');
    console.info('0: Sair');
}

// Function to handle user input
function handleInput(option) {
    switch (option) {
        case '1':
            rl.question('Digite o ID do jogador: ', (idJogador) => {
                rl.question('Digite o nome do jogador: ', (nome) => {
                    rl.question('Digite a posição do jogador: ', (posicao) => {
                        rl.question('Digite a idade do jogador: ', (idade) => {
                            client.AdicionarJogador({ jogador: { idJogador, nome, posicao, idade: parseInt(idade) } }, (error, response) => {
                                if (error) {
                                    console.error('Error adding player:', error);
                                } else {
                                    console.info('Player added:', response);
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
                    console.info('Players:', response.jogadores);
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
                            console.info('Team added:', response);
                        }
                        menu();
                    });
                });
            });
            break;

        case '4':
            rl.question('Digite o ID do time: ', (time_id) => {
                rl.question('Digite os IDs dos jogadores (separados por vírgula): ', (id_jogadores) => {
                    const idJogador = id_jogadores.split(',').map(id_jogador => id_jogador.trim());
                    client.VincularJogador({ id:time_id, idJogador }, (error, response) => {
                        if (error) {
                            console.error('Error linking players:', error);
                        } else {
                            console.info('Players linked to team:', response);
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
                    console.info('Teams:', response.times);
                }
                menu();
            });
            break;
        case '6':
            rl.question('Digite o ID do time: ', (id) => {
                client.DeletarTime({ id }, (error, response) => {
                    console.info('response',response, error,'error')
                    if (error) {
                        console.error('Error deleting team:', error);
                    } else {
                        console.info('Team deleted:', response);
                    }
                    menu();
                });
            });
            break;
        case '7':
            rl.question('Digite o ID do Jogador: ', (idJogador) => {
                client.DeletarJogador({ idJogador }, (error, response) => {
                    console.info('response',response, error,'error')
                    if (error) {
                        console.error('Error deleting team:', error);
                    } else {
                        console.info('Player deleted:', response);
                    }
                    menu();
                });
            });
            break;
        case '8':
            rl.question('Digite o ID do jogador: ', (idJogador) => {
                rl.question('Digite o nome do jogador: ', (nome) => {
                    rl.question('Digite a posição do jogador: ', (posicao) => {
                        rl.question('Digite a idade do jogador: ', (idade) => {
                            client.AtualizarJogador({ jogador: { idJogador, nome, posicao, idade: parseInt(idade) } }, (error, response) => {
                                if (error) {
                                    console.error('Error updating player:', error);
                                } else {
                                    console.info('Player updated:', response);
                                }
                                menu();
                            });
                        });
                    });
                });
            });
            break;
        case '0':
            rl.close();
            break;

        default:
            console.error('Opção inválida. Tente novamente.');
            menu();
            break;
    }
}

// Start the menu
menu();
rl.on('line', handleInput);
