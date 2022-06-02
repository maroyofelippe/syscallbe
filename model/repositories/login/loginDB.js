const loginDB = require('../dbConnection');
const secLogin = require('../../components/seguranca');

async function loginUsuario(email, senha) {
    const conn = await loginDB.connect();
    const sql = 'SELECT * FROM usuario WHERE email=? and senha=?';
    const values = [email, secLogin.ocultarSenha(senha)];
    const [rows] = await conn.query(sql, values);
    if (rows.length > 0) {
        //console.log(rows);
        return rows;
    }
    else return null;
}

module.exports = { loginUsuario }




