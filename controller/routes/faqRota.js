const seguranca = require("../../model/components/seguranca");


module.exports = function (syscall) {

    //  GET da Página Perguntas Frequentes
    syscall.get("/faq", function (req, res) {
        if (req.query.fail)
            res.render("faq/faq", { mensagem: "Perguntas Frequentes" });
        else res.render("faq/faq", { mensagem: null });
    });



}
