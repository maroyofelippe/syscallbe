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

  syscall.post("/cadastro/usuario/salvar", (req, res) => {
    var usuario = {
      idUsuario: req.body.id,
      nome: req.body.nome,
      email: req.body.email,
      TipoUsuario_codTipoUsuario: req.body.TipoUsuario_codTipoUsuario,
      registro: req.body.registro,
      senha: req.body.senha,
    };
    try {
      usuarioBanco.updateUsuario(usuario);
      res.render("usuario/Sucesso", { mensagem: "Alterado com sucesso" });
    } catch (error) {
      res.render("usuario/EditUsuario", {
        title: "Edição de Usuário",
        mensagem: "Erro na alteração do Cadastro",
      });
    }
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
    /*
    try {
      //console.log(usuario);
      usuarioBanco.addUsuario(usuario);
      res.render("inicio/carregamento", { mensagem: null });
    } catch (error) {
      res.render("usuario/Cadastro", {
        title: "Edição de Usuário",
        mensagem: "Erro ao inserir novo Cadastro",
      });
    }*/
  });
};
