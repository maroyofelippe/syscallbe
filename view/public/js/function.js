let checkmark = document.getElementsByClassName("checkmark")[0];
let check = document.getElementById("a");

checkmark.addEventListener("click", () => {
    if(checkmark.classList.contains("clicado")){
        checkmark.classList.remove("clicado");
        check.checked = false;
    }
    else{
        checkmark.classList.add("clicado");
        check.checked = true;
    }
});