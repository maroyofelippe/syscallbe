const chamadoDB = require('../dbConnection');
const secChamado = require('../../components/seguranca');

async function addChamado(chamado) {
    const conn = await chamadoDB.connect();
    const sql = 'INSERT INTO chamado (dataAbertura, descricaoProblema,  Equipamento_idEquipamento, Usuario_idUsuario, Ambiente_idAmbiente, TipoEquipamento_codTipoEquipamento) VALUES (now(), ?, ?, ?, ?,?);';
    const values = [chamado.descricaoProblema, chamado.Equipamento_idEquipamento, chamado.Usuario_idUsuario, chamado.Ambiente_idAmbiente, chamado.TipoEquipamento_codTipoEquipamento];
    return await conn.query(sql, values);
}

async function upResolucaoChamado(chamado) {
    const conn = await chamadoDB.connect();
    const sql = 'UPDATE chamado SET dataResolucao = ?, descricaoSolucao = ?, Profissionalti_idProfissionalTI = ?, Equipamento_idEquipamento=? where idChamado = ?;';
    const values = [chamado.dataResolucao, chamado.descricaoSolucao, chamado.Profissionalti_idProfissionalTI, chamado.Equipamento_idEquipamento, chamado.idChamado];
    return await conn.query(sql, values);
}

async function upEncerraChamado(chamado) {
    const conn = await chamadoDB.connect();
    const sql = 'UPDATE chamado SET dataEncerramento = ?, descricaoSolucao = ?, Profissionalti_idProfissionalTI = ? where idChamado = ?;';
    const values = [chamado.dataEncerramento, chamado.descricaoSolucao, chamado.Profissionalti_idProfissionalTI, chamado.idChamado];
    return await conn.query(sql, values);
}

async function updateChamado(chamado) {
    const conn = await chamadoDB.connect();
    const sql = 'UPDATE chamado SET descricaoProblema, Profissionalti_idProfissionalTI = ?, Equipamento_idEquipamento=? where idChamado = ?;';
    const values = [chamado.descricaoProblema, chamado.Profissionalti_idProfissionalTI, chamado.Equipamento_idEquipamento, chamado.idChamado];
    return await conn.query(sql, values);
}



async function getChamado() {
    const conn = await chamadoDB.connect();
    const [rows] = await conn.query("select ch.idChamado, ch.Usuario_idUsuario, ch.dataAbertura, usr.nome, ch.Equipamento_idEquipamento, eqp.descricao as Equipamento, ch.Ambiente_idAmbiente, concat(amb.predio, '-', amb.andar, '-', amb.sala) as Ambiente, ch.TipoEquipamento_codTipoEquipamento, tpeqp.descricao as tipoEquipamento, ch.descricaoProblema, s2c.Status2_idStatus, s2.descricao, s2.cor  from chamado as ch INNER JOIN usuario as usr, equipamento as eqp, ambiente as amb, tipoequipamento as tpeqp, status2chamado as s2c, status2 as s2 WHERE ch.Usuario_idUsuario = usr.idUsuario AND ch.Ambiente_idAmbiente = amb.idAmbiente AND ch.TipoEquipamento_codTipoEquipamento = tpeqp.codTipoEquipamento AND ch.idChamado = s2c.Chamado_idChamado AND s2c.Status2_idStatus = s2.idStatus;");
    return rows;
}

async function getChamadoById(id) {
    const conn = await chamadoDB.connect();
    const [rows] = await conn.query("select ch.idChamado, ch.Usuario_idUsuario, ch.dataAbertura, usr.nome, ch.Equipamento_idEquipamento, eqp.descricao as Equipamento, ch.Ambiente_idAmbiente, concat(amb.predio, ' - ', amb.andar, ' - ', amb.sala) as Ambiente, ch.TipoEquipamento_codTipoEquipamento, tpeqp.descricao as tipoEquipamento, ch.descricaoProblema, s2c.Status2_idStatus, s2.descricao, s2.cor  from chamado as ch INNER JOIN usuario as usr, equipamento as eqp, ambiente as amb, tipoequipamento as tpeqp, status2chamado as s2c, status2 as s2 WHERE ch.Usuario_idUsuario = usr.idUsuario AND ch.Ambiente_idAmbiente = amb.idAmbiente AND ch.TipoEquipamento_codTipoEquipamento = tpeqp.codTipoEquipamento AND ch.idChamado = s2c.Chamado_idChamado AND s2c.Status2_idStatus = s2.idStatus AND ch.idChamado = ?;", [id]);
    return rows;


    //const sql = "select ch.idChamado, ch.Usuario_idUsuario, usr.nome, ch.Equipamento_idEquipamento, eqp.descricao as Equipamento, ch.Ambiente_idAmbiente, concat(amb.predio, ' - ', amb.andar, ' - ', amb.sala) as Ambiente, ch.TipoEquipamento_codTipoEquipamento, tpeqp.descricao as tipoEquipamento, ch.descricaoProblema, s2c.Status2_idStatus, s2.descricao, s2.cor  from chamado as ch INNER JOIN usuario as usr, equipamento as eqp, ambiente as amb, tipoequipamento as tpeqp, status2chamado as s2c, status2 as s2 WHERE ch.Usuario_idUsuario = usr.idUsuario AND ch.Ambiente_idAmbiente = amb.idAmbiente AND ch.TipoEquipamento_codTipoEquipamento = tpeqp.codTipoEquipamento AND ch.idChamado = s2c.Chamado_idChamado AND s2c.Status2_idStatus = s2.idStatus AND ch.idChamado = ?;";

    //const sql2 = "SELECT * FROM chamado WHERE idChamado = ?;";

    //return await conn.query(sql2, [id]);
}

//Corrigir delete para status de "deletado = status 99 ou qualquer coisa neste sentido."
async function delChamadoById(id) {
    const conn = await usuarioDB.connect();
    const sql = 'DELETE FROM usuario where idUsuario = ?;';
    return await conn.query(sql, [id]);
}



module.exports = { addChamado, upResolucaoChamado, upEncerraChamado, updateChamado, getChamado, getChamadoById, delChamadoById }