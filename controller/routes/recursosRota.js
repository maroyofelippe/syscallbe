const { redirect } = require("express/lib/response");
const seguranca = require("../../model/components/seguranca");
const equipamentoBanco = require("../../model/repositories/recursos/equipamentoDB");
const ambienteBanco = require("../../model/repositories/recursos/ambienteDB");
const fabricanteBanco = require('../../model/repositories/recursos/fabricanteDB');
const statusBanco = require("../../model/repositories/recursos/statusDB");

module.exports = function (syscall) {

    //Usado para retornar todos os ambientes cadastrados
    syscall.get("/todosRecursos", async function (req, res) {
        const todosAmbientes = await ambienteBanco.getAmbiente();
        const todosEquipamentos = await equipamentoBanco.getEquipamento();
        const tiposEquipamentos = await equipamentoBanco.getTipoEquipamento();
        const todosFabricantes = await fabricanteBanco.getFabricante();
        const todosStatus = await statusBanco.getTodosStatus();


        //console.log(todosStatus);              
        if (req.query.fail)
            res.render("inicio/index", { mensagem: "Chamados" });
        else res.render("inicio/categorias", { mensagem: null, todosAmbientes, todosEquipamentos, tiposEquipamentos, todosFabricantes, todosStatus });
    });
}