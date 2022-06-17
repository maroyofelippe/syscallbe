const recursoDB = require('../dbConnection');
const secRecurso = require('../../components/seguranca');

async function getTipoEquipamento() {
    const conn = await recursoDB.connect();
    const [rows] = await conn.query('SELECT * FROM tipoequipamento;');
    return rows;
}

async function getEquipamento() {
    const conn = await recursoDB.connect();
    //const [rows] = await conn.query('SELECT * FROM equipamento;');
    const [rows] = await conn.query("select eqp.idEquipamento, eqp.patrimonio, eqp.descricao, eqp.serialNumber, eqp.Fabricante_codFabricante, fab.codFabricante, fab.descricao as fabdescricao, eqp.TipoEquipamento_codTipoEquipamento, teqp.codTipoEquipamento, teqp.descricao as teqpdescricao, eqp.Ambiente_idAmbiente, amb.idAmbiente, concat(amb.predio, '-', amb.andar, '-', amb.sala) as Ambiente  from equipamento as eqp inner join ambiente as amb, fabricante as fab, tipoequipamento as teqp where eqp.Ambiente_idAmbiente = amb.idAmbiente AND eqp.TipoEquipamento_codTipoEquipamento = teqp.codTipoEquipamento AND eqp.Fabricante_codFabricante = fab.codFabricante;");
    return rows;
}

module.exports = { getTipoEquipamento, getEquipamento }