// storage.js
const jogadores = [
    { idJogador: '1', nome: 'Ney', posicao: '11', idade: 32 },
    { idJogador: '2', nome: 'Caça Rato', posicao: '7', idade: 42 },
    { idJogador: '3', nome: 'Rafael Sobis', posicao: '10', idade: 38 },
    { idJogador: '4', nome: 'Rony Rustico', posicao: '9', idade: 32 },
];
const times = [
    { id: '1', nome: 'Juventude', jogadoresIds: [1] },
    { id: '2', nome: 'Inter', jogadoresIds: [] },
    { id: '3', nome: 'Criciuma', jogadoresIds: [] },
];

module.exports = {
    jogadores,
    times,
};
