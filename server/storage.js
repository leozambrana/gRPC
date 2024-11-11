// storage.js
const jogadores = [
    { id: '1', nome: 'Ney', posicao: '11', idade: 32 },
    { id: '2', nome: 'Caça Rato', posicao: '7', idade: 42 },
    { id: '3', nome: 'Rafael Sobis', posicao: '10', idade: 38 },
    { id: '4', nome: 'Rony Rustico', posicao: '9', idade: 32 },
];
const times = [
    { id: '1', nome: 'Juventude', jogadores_ids: [] },
    { id: '2', nome: 'Inter', jogadores_ids: [] },
    { id: '3', nome: 'Criciuma', jogadores_ids: [] },
];

module.exports = {
    jogadores,
    times,
};
