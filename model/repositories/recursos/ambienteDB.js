const ambeienteDB = require('../dbConnection');
const secRecurso = require('../../components/seguranca');

async function getTipoAmbiente() {
    const conn = await ambeienteDB.connect();
    const [rows] = await conn.query('SELECT * FROM tipoAmbiente;');
    return rows;
}

async function getAmbiente() {
    const conn = await ambeienteDB.connect();
    const [rows] = await conn.query('SELECT * FROM ambiente;');
    return rows;
}


async function getAmbienteByTipo(tipo) {
    const conn = await ambeienteDB.connect();
    const sql = 'SELECT * FROM ambiente WHERE TipoAmbiente_idAmbiente = ?;'
    const values = [tipo];
    const [rows] = await conn.query(sql, values);
    if (rows.length > 0) return rows[0];
    else return null;
}

module.exports = { getTipoAmbiente, getAmbiente, getAmbienteByTipo }