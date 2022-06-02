const recursoDB = require('../dbConnection');
const secRecurso = require('../../components/seguranca');

async function getTipoEquipamento() {
    const conn = await recursoDB.connect();
    const [rows] = await conn.query('SELECT * FROM tipoequipamento;');
    return rows;
}

async function getEquipamento() {
    const conn = await recursoDB.connect();
    const [rows] = await conn.query('SELECT * FROM equipamento;');
    return rows;
}

module.exports = { getTipoEquipamento, getEquipamento }