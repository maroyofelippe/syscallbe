const statusDB = require('../dbConnection');

async function addStatus2Chamado(ultimoID) {
    const conn = await statusDB.connect();
    const sqlstatus = 'INSERT INTO status2chamado 	(Status2_idStatus, Chamado_idChamado, dataInicio) VALUES (1, ?, now());';
    const rStatus = ultimoID[0].ultimoID;
    return await conn.query(sqlstatus, rStatus);
}

async function getUltimoID() {
    const conn = await statusDB.connect();
    return await conn.query('SELECT MAX(idChamado) as ultimoID from chamado;');
}

async function getTodosStatus() {
    const conn = await statusDB.connect();
    const [rows] = await conn.query('SELECT * FROM status2;');
    return rows;
}

module.exports = { addStatus2Chamado, getUltimoID, getTodosStatus }