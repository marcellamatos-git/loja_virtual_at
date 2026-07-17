let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


export function addItem(produto) {

    const itemExistente = carrinho.find(item => item.id_produto === produto.id_produto);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id_produto: produto.id_produto,
            descricao_produto: produto.descricao_produto,
            valor_unitario: produto.valor_unitario,
            caminho_imagem: produto.caminho_imagem,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ALTERAR QUANTIDADE
window.alterarQuantidade = function(idProduto, valor) {

    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produto = carrinho.find(item => item.id_produto === idProduto);

    if (!produto) return;

    produto.quantidade += valor;

    if (produto.quantidade <= 0) {
        carrinho = carrinho.filter(item => item.id_produto !== idProduto);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    location.reload();
}

// MOSTRAR CARRINHO
const listaCarrinho = document.querySelector("#lista-carrinho");

if (listaCarrinho) {

    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach(produto => {

        total += produto.valor_unitario * produto.quantidade;

        listaCarrinho.innerHTML += `
            <div class="item-carrinho">
                <img src="../${produto.caminho_imagem}" width="100">
               
                <h3>${produto.descricao_produto}</h3>
                
                <div class="quantidade">
                    <button onclick="alterarQuantidade(${produto.id_produto},-1)">-</button>

                    <span>${produto.quantidade}</span>

                    <button onclick="alterarQuantidade(${produto.id_produto},1)">+</button>

                </div>

                <p>Preço: R$ ${(produto.valor_unitario * produto.quantidade).toFixed(2).replace(".", ",")}</p>

                <hr>

            </div>
        `;
    });

    document.querySelector("#total").textContent = total.toFixed(2).replace(".", ",");
    document.querySelector("#total-final").textContent = total.toFixed(2).replace(".", ",");
}

// FINALIZAR COMPRA
const btnFinalizar = document.querySelector("#btn-finalizar");

if (btnFinalizar) {

    btnFinalizar.addEventListener("click", () => {

        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        alert("Compra finalizada com sucesso!");
        localStorage.removeItem("carrinho");

        window.location.href = "../index.html";
    });

}
window.removerProduto = function(idProduto) {
    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho = carrinho.filter(item => item.id_produto !== idProduto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    location.reload();
};