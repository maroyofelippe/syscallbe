const { redirect } = require("express/lib/response");
const seguranca = require("../../model/components/seguranca");
const usuarioBanco = require("../../model/repositories/usuario/usuarioDB");

module.exports = function (syscall) {
  syscall.get("/cadastro", function (req, res) {
    if (req.query.fail)
      res.render("usuario/Cadastro", { mensagem: "Cadastro" });
    else res.render("usuario/Cadastro", { mensagem: null });
  });

  syscall.get("/carregamento", function (req, res) {
    if (req.query.fail)
      res.render("inicio/carregamento", { mensagem: "Carregamento" });
    else res.render("inicio/carregamento", { mensagem: null });
  });

  syscall.post("/cadastro/usuario/inserir", (req, res) => {
    var usuario = {
      nome: req.body.nome,
      email: req.body.email,
      TipoUsuario_codTipoUsuario: req.body.TipoUsuario_codTipoUsuario,
      registro: req.body.registro,
      senha: req.body.senha,
    };
    usuarioBanco.addUsuario(usuario);
    if (req.query.fail) res.render("usuario/Cadastro", { title: "Edição de Usuário", mensagem: "Erro ao inserir novo Cadastro" });
    else res.redirect('/inicio');
  });
};
