const recursoDB = require('../dbConnection');
const secRecurso = require('../../components/seguranca');

async function getFabricante() {
    const conn = await recursoDB.connect();
    const [rows] = await conn.query('SELECT * FROM fabricante;');
    return rows;
}


module.exports = { getFabricante }