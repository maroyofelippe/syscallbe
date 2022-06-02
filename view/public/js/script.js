

function geraTipoAmbienteList(tipoAmbiente) {
    const tipoAmbienteSelect = document.getElementById("tipoAmbiente2");

    const tipoAmbienteList = tipoAmbiente;
    for (tipoAmbiente in tipoAmbienteList) {
        option = new Option(tipoAmbienteList[tipoAmbiente], tipoAmbiente);
        tipoAmbienteSelect.option[tipoAmbienteList.option.length] = tipoAmbiente;
    }

}




function validarCadastro() {
    let senha = document.getElementById('senha');
    let confirma = document.getElementById('confirma');
    let registro = document.getElementById('txtRegistro');

    let regex = /[A-Za-z\d@$!%*#?&]/;

    if (isNaN(registro)) {
        alert("O número de Registro na Fatec precisa ser um número inteiro");
        return false;
    }

    if (regex.test(senha)) {
        alert("Sua senha precisa ter pelo menos uma letra maiúscula, uma minuscula, um número e um caractere especial!");
        return false;
    }

    if (confirma != senha) {
        alert("Senhas não conferem!");
        cadastro.confirma.focus();
        return false;
    }

    alert("Cadastro realizado com sucesso!");
    cadastro.reset();
    return false;
}

function mudarRegistro() {
    let registro = document.getElementById('txtRegistro');
    let select = document.getElementById('registro');
    let value = select.options[select.selectedIndex].value;

    if (value == "RM") {
        registro.setAttribute('maxLength', 5);
        registro.value = "";
    } else {
        registro.setAttribute('maxLength', 13);
        registro.value = "";
    }
}