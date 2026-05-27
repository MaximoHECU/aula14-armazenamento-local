const btnSalvar = document.querySelector(".btnSalvar");
const btnExcluir = document.querySelector(".btnExcluir");
const textarea = document.getElementById("salvos");

function salvar(){
    const texto = textarea.value;

    localStorage.setItem("minhaAnotação", texto);
    alert("Nota Salva!");
}

function carregar(){
    const salvo = localStorage.getItem("minhaAnotação");
    
    if (salvo) {
        textarea.value = salvo;
    }
}

function excluir(){
    
    textarea.value = "";
    alert("Nota excluída! Aperte Salvar para confirmar!!!");
}

btnSalvar.addEventListener("click", salvar);
btnExcluir.addEventListener("click", excluir);

carregar();
        
        

        

        