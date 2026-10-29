// ==========================================
// MVP Delivery Fácil - script.js
// ==========================================
// Funcionalidades do Carrinho:
// 1. Carregar e exibir produtos do cardápio
// 2. Adicionar, alterar quantidade e remover itens do carrinho
// 3. Exibir mensagem amigável de carrinho vazio
// 4. Calcular o valor total do pedido
// ==========================================

let carrinho = [];

const listaProdutosEl = document.getElementById('lista-produtos');
const listaCarrinhoEl = document.getElementById('lista-carrinho');
const valorTotalEl = document.getElementById('valor-total');
const btnFinalizar = document.getElementById('btn-finalizar');

// ------------------------------------------
// 1. CARREGAR OS PRODUTOS
// ------------------------------------------
fetch('../data/produtos.json')
    .then(resposta => resposta.json())
    .then(produtos => {
        exibirProdutos(produtos);
    })
    .catch(erro => {
        listaProdutosEl.innerHTML = '<p>Erro ao carregar o cardápio.</p>';
        console.error('Erro ao buscar produtos:', erro);
    });

// ------------------------------------------
// 2. EXIBIR OS PRODUTOS NA TELA
// ------------------------------------------
function exibirProdutos(produtos) {
    listaProdutosEl.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
            <span class="categoria">${produto.categoria}</span>
            <h3>${produto.nome}</h3>
            <p class="descricao">${produto.descricao}</p>
            <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button class="btn-adicionar">Adicionar</button>
        `;

        const botao = card.querySelector('.btn-adicionar');
        botao.addEventListener('click', () => adicionarAoCarrinho(produto));

        listaProdutosEl.appendChild(card);
    });
}

// ------------------------------------------
// 3. GERENCIAMENTO DO CARRINHO (Adicionar, Alterar Qtd, Remover)
// ------------------------------------------

// Adiciona o produto ou aumenta a quantidade se já existir no carrinho
function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(item => item.id === produto.id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    atualizarCarrinho();
}

// Altera a quantidade do item (+1 ou -1)
function alterarQuantidade(id, delta) {
    const item = carrinho.find(i => i.id === id);
    if (!item) return;

    item.quantidade += delta;

    if (item.quantidade <= 0) {
        removerDoCarrinho(id);
    } else {
        atualizarCarrinho();
    }
}

// Remove o item inteiramente do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

// ------------------------------------------
// 4. ATUALIZAR A EXIBIÇÃO DO CARRINHO E O TOTAL
// ------------------------------------------
function atualizarCarrinho() {
    // Melhoria na mensagem de pedido vazio
    if (carrinho.length === 0) {
        listaCarrinhoEl.innerHTML = `
            <li id="carrinho-vazio" class="carrinho-vazio-container">
                <p>🛒 Seu carrinho está vazio!</p>
                <span>Escolha itens deliciosos no cardápio acima para começar seu pedido.</span>
            </li>
        `;
        valorTotalEl.textContent = '0,00';
        return;
    }

    listaCarrinhoEl.innerHTML = '';
    
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item-carrinho';
        
        const subtotal = item.preco * item.quantidade;

        li.innerHTML = `
            <div class="info-item">
                <span class="nome-item">${item.nome}</span>
                <span class="preco-unitario">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="controles-quantidade">
                <button class="btn-qtd btn-diminuir" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                <span class="qtd-item">${item.quantidade}</span>
                <button class="btn-qtd btn-aumentar" onclick="alterarQuantidade(${item.id}, 1)">+</button>
            </div>
            <span class="subtotal-item">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            <button class="btn-remover" onclick="removerDoCarrinho(${item.id})" title="Remover item">🗑️</button>
        `;
        listaCarrinhoEl.appendChild(li);
    });

    // Calcula o valor total levando em consideração as quantidades
    const total = carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
    valorTotalEl.textContent = total.toFixed(2).replace('.', ',');
}

// ------------------------------------------
// 5. FINALIZAR PEDIDO
// ------------------------------------------
btnFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Adicione pelo menos um item antes de finalizar o pedido!');
        return;
    }

    const total = carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
    alert(`Pedido finalizado com sucesso! Total: R$ ${total.toFixed(2).replace('.', ',')}`);

    carrinho = [];
    atualizarCarrinho();
});

// Mostra a mensagem de carrinho vazio assim que a página abre
atualizarCarrinho();