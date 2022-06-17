const seguranca = require("../../model/components/seguranca");
const loginBanco = require("../../model/repositories/login/loginDB");

module.exports = function(syscall){

//  GET da Página Inicial
syscall.get("/inicio", function (req, res) {
    if (req.query.fail)
      res.render("inicio/index", { mensagem: "Tela Inicial" });
    else res.render("inicio/index", { mensagem: null });
  });

  syscall.get("/categorias", function (req, res) {
    if (req.query.fail)
      res.render("inicio/login", { mensagem: "Falha de Login" });

    else res.redirect('/todosRecursos');
    
  });

//GET da página Login.ejs
syscall.get('/login', function (req, res) {
    if(req.query.fail) res.render('login/login', { mensagemLogin: 'Usúario e/ou senha incorretos!'});
    else res.render('login/login', { mensagemLogin: null});
});
    

}


