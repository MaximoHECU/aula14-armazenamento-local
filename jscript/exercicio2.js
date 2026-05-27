const inputItem = document.getElementById("pesquisaItem");
const btnAdicionar = document.querySelector(".btnAdicionar");
const btnEsvaziar = document.querySelector(".btnEsvaziar");
const listaUl = document.getElementById("carrinho");

const CHAVE_CARRINHO = "carrinho_exercicio2";

function obterCarrinho(){
    const dadosSalvos = sessionStorage.getItem(CHAVE_CARRINHO); 
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
}

function salvarCarrinho(carrinho){
    sessionStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const carrinho = obterCarrinho();
    listaUl.innerHTML = "";
    
    if (carrinho.length === 0) {
        listaUl.innerHTML = "<li>O carrinho está vazio.</li>";
        return;
    }
    
    carrinho.forEach(produto => {
        const novoLi = document.createElement("li");
        novoLi.setAttribute("data-id", produto.id);
        
        novoLi.innerHTML = `
            <span><strong>${produto.nome}</strong> (x${produto.quantidade})</span>
            <button class="btn-deletar-item" style="margin-left: 10px;">Excluir</button>
        `;
        
        listaUl.appendChild(novoLi);
    });
}

function adicionarAoCarrinho() {
    const nomeProduto = inputItem.value.trim();
    
    if (nomeProduto === "") {
        alert("Por favor, digite o nome de um produto!");
        return;
    }
    
    const carrinho = obterCarrinho();
    
    const produtoExistente = carrinho.find(item => item.nome.toLowerCase() === nomeProduto.toLowerCase());
    
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        const novoItem = {
            id: Date.now(),
            nome: nomeProduto,
            quantidade: 1
        };
        carrinho.push(novoItem);
    }
    
    salvarCarrinho(carrinho);
    
    inputItem.value = "";
    inputItem.focus();
}

function removerDoCarrinho(idProduto) {
    let carrinho = obterCarrinho();
    const produtoExistente = carrinho.find(produto => produto.id === idProduto);
    
    if (!produtoExistente) return;
    
    if (produtoExistente.quantidade > 1) {
        produtoExistente.quantidade -= 1;
    } else {
        carrinho = carrinho.filter(item => item.id !== idProduto);
    }
    
    salvarCarrinho(carrinho);
}

function esvaziarCarrinho() {
    sessionStorage.removeItem(CHAVE_CARRINHO);
    renderizarCarrinho();
}


btnAdicionar.addEventListener("click", adicionarAoCarrinho);

inputItem.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        adicionarAoCarrinho();
    }
});

btnEsvaziar.addEventListener("click", esvaziarCarrinho);

listaUl.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-deletar-item")) {
        const liPai = event.target.closest("li");
        const idParaRemover = Number(liPai.getAttribute("data-id"));
        removerDoCarrinho(idParaRemover);
    }
});

renderizarCarrinho();