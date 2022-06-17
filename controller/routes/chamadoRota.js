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
        if (req.query.fail)
            res.render("chamado/acompanhamento_todos", { mensagem: "Chamados" });
        else res.render("chamado/todosChamados", { mensagem: null, todosChamados });
    });

    //Usado para abrir carregar a página de novo chamado.
    syscall.get("/chamado/abrirChamado", async function (req, res) {
        var usuario = req.user;
        const tipoeqp = await equipamentoBanco.getTipoEquipamento();
        const tipoAmbiente = await ambienteBanco.getTipoAmbiente();
        const ambiente = await ambienteBanco.getAmbiente();
        const equipamento = await equipamentoBanco.getEquipamento();
        if (req.query.fail)
            res.render("chamado/novoChamado", { mensagem: "Chamados" });
        else res.render("chamado/novoChamado", { mensagem: null, usuario, tipoeqp, tipoAmbiente, ambiente, equipamento });
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

        let dataRFormatada = "";
        let dataEFormatada = "";

        if (dadosChamado.dataResolucao) {
            let dataR = dadosChamado.dataResolucao;
            var dia = dataR.getDate().toString().padStart(2, '0');
            var mes = (dataR.getMonth() + 1).toString().padStart(2, '0');
            var ano = dataR.getFullYear();
            dataRFormatada = ano + '-' + mes + '-' + dia;
        }

        if (dadosChamado.dataEncerramento) {
            let dataE = dadosChamado.dataEncerramento;
            var dia = dataE.getDate().toString().padStart(2, '0');
            var mes = (dataE.getMonth() + 1).toString().padStart(2, '0');
            var ano = dataE.getFullYear();
            dataEFormatada = ano + '-' + mes + '-' + dia;
        }

        if (req.query.fail)
            res.render("chamado/acompanhamento_todos", { mensagem: "Chamados" });
        else res.render("chamado/editarChamado2", { mensagem: null, usuario, dadosChamado, chamadoId, tipoAmbiente, tipoeqp, ambiente, equipamento, dataFormatada, dataRFormatada, dataEFormatada });
    });

    syscall.post("/chamado/upChamado", async (req, res) => {
        var usuario = req.user;
        var chamado = {
            idChamado: req.body.idChamado,
            dataAbertura: req.body.dataAbertura,
            descricaoProblema: req.body.descricaoProblema,
            Equipamento_idEquipamento: req.body.Equipamento_idEquipamento,
            Usuario_idUsuario: usuario.idUsuario,
            Profissionalti_idProfissionalTI: req.body.Profissionalti_idProfissionalTI,
            dataResolucao: req.body.dataResolucao,
            descricaoSolucao: req.body.descricaoSolucao,
            dataEncerramento: req.body.dataEncerramento,
        };
        try {
            chamadoBanco.updateChamado(chamado);
            res.redirect('/todosChamados');
        } catch (error) {
            res.render("chamado/acompanhamento_todos", {
                title: "Edição Chamado",
                mensagem: "Erro na alteração do Chamado",
            });
        }
    });
}

