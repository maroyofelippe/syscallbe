const { redirect } = require("express/lib/response");
const seguranca = require("../../model/components/seguranca");
const usuarioBanco = require("../../model/repositories/usuario/usuarioDB");
const usuarioRota = require("./usuarioRota");

module.exports = function (syscall) {

    //  GET da Página Perfil
    syscall.get("/perfil", function (req, res) {
        var usuario = req.user;
        if (req.query.fail)
            res.render("usuario/perfil", { mensagem: "Perfil de Usuário" });
        else res.render("usuario/perfil", { mensagem: null, usuario });
    });

    syscall.post("/updatePerfil", async (req, res) => {
        var usuario = {
            idUsuario: req.user.idUsuario,
            nome: req.body.nome,
            email: req.body.email,
            TipoUsuario_codTipoUsuario: req.body.TipoUsuario_codTipoUsuario,
            registro: req.body.registro,
            senha: req.body.senha,
        };
        await usuarioBanco.updateUsuario(usuario);
        if (req.query.fail) res.render("/inicio", { title: "Edição de Usuário", mensagem: "Erro ao inserir novo Cadastro" });
        else res.redirect('/inicio');
    });
}
