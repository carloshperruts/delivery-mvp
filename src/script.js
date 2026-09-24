// ==========================================
// MVP Delivery Fácil - script.js
// ==========================================
// Este arquivo é responsável por:
// 1. Carregar os produtos do arquivo data/produtos.json
// 2. Exibir os produtos na tela (cardápio)
// 3. Permitir adicionar produtos ao carrinho
// 4. Calcular e mostrar o total do pedido
// ==========================================

// Guarda os itens que o usuário adicionou ao pedido.
// Começa como uma lista (array) vazia.
let carrinho = [];

// Pega os elementos HTML que vamos manipular, guardando em variáveis
// para não precisar buscar no HTML toda hora.
const listaProdutosEl = document.getElementById('lista-produtos');
const listaCarrinhoEl = document.getElementById('lista-carrinho');
const valorTotalEl = document.getElementById('valor-total');
const btnFinalizar = document.getElementById('btn-finalizar');

// ------------------------------------------
// 1. CARREGAR OS PRODUTOS
// ------------------------------------------
// fetch() é uma função do navegador que busca um arquivo (aqui, o JSON).
// Como isso demora um pouquinho, usamos .then() para dizer
// "quando terminar de carregar, faça isso aqui".
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
    // Limpa a mensagem "Carregando..."
    listaProdutosEl.innerHTML = '';

    // Para cada produto da lista, criamos um "card" (bloco) e
    // inserimos na tela.
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto-card';

        // template string (crase `` `` ``) permite escrever HTML
        // misturado com variáveis usando ${ }
        card.innerHTML = `
            <span class="categoria">${produto.categoria}</span>
            <h3>${produto.nome}</h3>
            <p class="descricao">${produto.descricao}</p>
            <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button class="btn-adicionar">Adicionar</button>
        `;

        // Pega o botão que acabamos de criar dentro do card
        // e diz: "quando clicar, chame a função adicionarAoCarrinho"
        const botao = card.querySelector('.btn-adicionar');
        botao.addEventListener('click', () => adicionarAoCarrinho(produto));

        listaProdutosEl.appendChild(card);
    });
}

// ------------------------------------------
// 3. ADICIONAR PRODUTO AO CARRINHO
// ------------------------------------------
function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    atualizarCarrinho();
}

// ------------------------------------------
// 4. ATUALIZAR A EXIBIÇÃO DO CARRINHO E O TOTAL
// ------------------------------------------
function atualizarCarrinho() {
    // Se o carrinho estiver vazio, mostra a mensagem padrão
    if (carrinho.length === 0) {
        listaCarrinhoEl.innerHTML = '<li id="carrinho-vazio">Nenhum item adicionado ainda.</li>';
        valorTotalEl.textContent = '0,00';
        return;
    }

    // Monta a lista de itens do carrinho
    listaCarrinhoEl.innerHTML = '';
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
        `;
        listaCarrinhoEl.appendChild(li);
    });

    // Calcula o total somando o preço de todos os itens
    const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
    valorTotalEl.textContent = total.toFixed(2).replace('.', ',');
}

// ------------------------------------------
// 5. FINALIZAR PEDIDO (ação simples para o MVP)
// ------------------------------------------
btnFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Adicione pelo menos um item antes de finalizar o pedido!');
        return;
    }

    const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
    alert(`Pedido finalizado! Total: R$ ${total.toFixed(2).replace('.', ',')}`);

    // Limpa o carrinho depois de "finalizar"
    carrinho = [];
    atualizarCarrinho();
});
