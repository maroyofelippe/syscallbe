const { redirect } = require("express/lib/response");
const seguranca = require("../../model/components/seguranca");
const chamadoBanco = require("../../model/repositories/chamado/chamadoDB");
const equipamentoBanco = require("../../model/repositories/recursos/equipamentoDB");
const ambienteBanco = require("../../model/repositories/recursos/ambienteDB");
const statusBanco = require("../../model/repositories/recursos/statusDB");

module.exports = function (syscall) {

    //Usado para retornar todos os chamados abertos
    syscall.get("/todosChamados", async function (req, res) {
        const todosChamados = await chamadoBanco.getChamado();
        //console.log(todosChamados);
        if (req.query.fail)
            res.render("chamado/acompanhamento_todos", { mensagem: "Chamados" });
        else res.render("chamado/acompanhamento_todos", { mensagem: null, todosChamados });
    });

    //Usado para abrir carregar a página de novo chamado.
    syscall.get("/chamado/abrirChamado", async function (req, res) {
        var usuario = req.user;
        const tipoeqp = await equipamentoBanco.getTipoEquipamento();
        const tipoAmbiente = await ambienteBanco.getTipoAmbiente();
        const ambiente = await ambienteBanco.getAmbiente();
        const equipamento = await equipamentoBanco.getEquipamento();
        if (req.query.fail)
            res.render("chamado/abrir_chamado", { mensagem: "Chamados" });
        else res.render("chamado/abrir_chamado", { mensagem: null, usuario, tipoeqp, tipoAmbiente, ambiente, equipamento });
    });

    //Usado para gravar novo chamado.
    syscall.post("/chamado/newChamado", async (req, res) => {
        var chamado = {
            Ambiente_idAmbiente: req.body.Ambiente_idAmbiente,
            descricaoProblema: req.body.descricaoProblema,
            TipoEquipamento_codTipoEquipamento: req.body.TipoEquipamento_codTipoEquipamento,
            Equipamento_idEquipamento: req.body.Equipamento_idEquipamento,
            Usuario_idUsuario: req.user.idUsuario,
        };
        chamadoBanco.addChamado(chamado);
        let ultimoID = await statusBanco.getUltimoID();
        statusBanco.addStatus2Chamado(ultimoID[0]);
        if (req.query.fail) res.render("chamado/abrir_chamado", { title: "Novo Chamado", mensagem: "Erro ao inserir novo Chamado" });
        else res.redirect('/todosChamados');
    });


    // UPDATES
    syscall.get("/chamado/editarChamado:id", async function (req, res) {
        var usuario = req.user;
        var chID = req.params.id;
        const chamadoId = await chamadoBanco.getChamadoById(chID);

        const tipoeqp = await equipamentoBanco.getTipoEquipamento();
        const tipoAmbiente = await ambienteBanco.getTipoAmbiente();
        const ambiente = await ambienteBanco.getAmbiente();
        const equipamento = await equipamentoBanco.getEquipamento();

        let dadosChamado = chamadoId[0];

        let data = dadosChamado.dataAbertura;
        var dia = data.getDate().toString().padStart(2, '0');
        var mes = (data.getMonth() + 1).toString().padStart(2, '0');
        var ano = data.getFullYear();
        let dataFormatada = dia + '/' + mes + '/' + ano;

        if (req.query.fail)
            res.render("chamado/editarChamado", { mensagem: "Chamados" });
        else res.render("chamado/editarChamado", { mensagem: null, usuario, dadosChamado, chamadoId, tipoAmbiente, tipoeqp, ambiente, equipamento, dataFormatada });
    });

    syscall.post("/chamado/upChamado", (req, res) => {
        var chamado = {
            idChamado: req.body.idChamado,
            dataAbertura: req.body.dataAbertura,
            descricaoProblema: req.body.descricaoProblema,
            Equipamento_idEquipamento: req.body.Equipamento_idEquipamento,
            Usuario_idUsuario: req.body.Usuario_idUsuario,
            Profissionalti_idProfissionalTI: req.body.Profissionalti_idProfissionalTI,
            dataResolucao: req.body.dataResolucao,
            descricaoSolucao: req.body.descricaoSolucao,
            dataEncerramento: req.body.dataEncerramento,
        };
        try {
            chamadoBanco.updateChamado(chamado);
            res.render("chamado/acompanhamento_todos", { mensagem: "Alterado com sucesso" });
        } catch (error) {
            res.render("chamado/acompanhamento_todos", {
                title: "Edição Chamado",
                mensagem: "Erro na alteração do Chamado",
            });
        }
    });

    syscall.post("/chamado/resChamado", (req, res) => {
        var chamado = {
            idChamado: req.body.idChamado,
            dataAbertura: req.body.dataAbertura,
            descricaoProblema: req.body.descricaoProblema,
            Equipamento_idEquipamento: req.body.Equipamento_idEquipamento,
            Usuario_idUsuario: req.body.Usuario_idUsuario,
            Profissionalti_idProfissionalTI: req.body.Profissionalti_idProfissionalTI,
            dataResolucao: req.body.dataResolucao,
            descricaoSolucao: req.body.descricaoSolucao,
            dataEncerramento: req.body.dataEncerramento,
        };
        try {
            chamadoBanco.upResolucaoChamado(chamado);
            res.render("chamado/acompanhamento_todos", { mensagem: "Chamado Resolvido" });
        } catch (error) {
            res.render("chamado/acompanhamento_todos", {
                title: "Edição Chamado",
                mensagem: "Erro na resolução do Chamado",
            });
        }
    });

    syscall.post("/chamado/encerraChamado", (req, res) => {
        var chamado = {
            idChamado: req.body.idChamado,
            dataAbertura: req.body.dataAbertura,
            descricaoProblema: req.body.descricaoProblema,
            Equipamento_idEquipamento: req.body.Equipamento_idEquipamento,
            Usuario_idUsuario: req.body.Usuario_idUsuario,
            Profissionalti_idProfissionalTI: req.body.Profissionalti_idProfissionalTI,
            dataResolucao: req.body.dataResolucao,
            descricaoSolucao: req.body.descricaoSolucao,
            dataEncerramento: req.body.dataEncerramento,
        };
        try {
            chamadoBanco.upEncerraChamado(chamado);
            res.render("chamado/acompanhamento_todos", { mensagem: "Chamado Encerrado com sucesso" });
        } catch (error) {
            res.render("chamado/acompanhamento_todos", {
                title: "Edição Chamado",
                mensagem: "Erro no Encerramento do Chamado",
            });
        }
    });

}

