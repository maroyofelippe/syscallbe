const ambeienteDB = require('../dbConnection');
const secRecurso = require('../../components/seguranca');

async function getAmbiente() {
    const conn = await ambeienteDB.connect();
    const [rows] = await conn.query("select amb.idAmbiente, amb.TipoAmbiente_idTipoAmbiente, tamb.idTipoAmbiente, tamb.descricao, amb.predio, amb.sala, amb.andar from ambiente as amb inner join tipoambiente as tamb where amb.TipoAmbiente_idTipoAmbiente = tamb.idTipoAmbiente;");
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

async function getTipoAmbiente() {
    const conn = await ambeienteDB.connect();
    const [rows] = await conn.query('SELECT * FROM tipoAmbiente;');
    return rows;
}


module.exports = { getAmbiente, getAmbienteByTipo, getTipoAmbiente }