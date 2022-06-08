const usuarioDB = require('../dbConnection');
const secLogin = require('../../components/seguranca');

async function addUsuario(usuario) {
    const conn = await usuarioDB.connect();
    const sql = 'INSERT INTO usuario (nome, email, TipoUsuario_codTipoUsuario, registro, senha) VALUES (?, ?, ?, ?, ?);';
    const values = [usuario.nome, usuario.email, usuario.TipoUsuario_codTipoUsuario, usuario.registro, secLogin.ocultarSenha(usuario.senha)];
    //console.log(sql, values);
    return await conn.query(sql, values);
}

async function updateUsuario(usuario) {
    const conn = await usuarioDB.connect();
    const sql = 'UPDATE usuario SET nome = ?, email = ?, TipoUsuario_codTipoUsuario = ?, registro = ?, senha=? where idUsuario = ?;';
    const values = [usuario.nome, usuario.email, usuario.TipoUsuario_codTipoUsuario, usuario.registro, secLogin.ocultarSenha(usuario.senha), usuario.idUsuario];
    return await conn.query(sql, values);
}

async function selectUsuario() {
    const conn = await usuarioDB.connect();
    const [rows] = await conn.query('SELECT * FROM usuario;');
    return rows;
}

async function selectUsuarioById(id) {
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM usuario WHERE idUsuario = ?;';
    return await conn.query(sql, [id]);
}

async function deleteUsuario(id) {
    const conn = await usuarioDB.connect();
    const sql = 'DELETE FROM usuario where idUsuario = ?;';
    return await conn.query(sql, [id]);
}

async function getUsuarioId(id) {
    const conn = await usuarioDB.connect();
    const sql = 'SELECT * FROM usuario where idUsuario=?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if (rows.length > 0) return rows[0];
    else return null;
}

module.exports = { getUsuarioId, addUsuario, selectUsuario, selectUsuarioById, deleteUsuario, updateUsuario }