let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ADICIONAR PRODUTO
export function addItem(produto) {

    const itemExistente = carrinho.find(item =>
        item.id_produto === produto.id_produto
    );

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