# Roteiro de Teste Manual - MVP Delivery Fácil

Como este é um MVP simples de front-end (sem back-end ainda), os testes
por enquanto são manuais. Siga o roteiro abaixo para validar se está tudo
funcionando.

## Pré-requisito

Este projeto carrega os produtos dinamicamente a partir de um arquivo
JSON (`data/produtos.json`) usando `fetch()`. Por restrição de segurança
dos navegadores, **não é possível abrir o `index.html` diretamente com
duplo clique** (URLs no formato `file://...`) — o `fetch()` é bloqueado
e o cardápio não carrega.

É necessário rodar um servidor local. Duas opções:

**Opção 1 - Live Server (VS Code)**
1. Instale a extensão "Live Server" no VS Code.
2. Clique com o botão direito em `src/index.html`.
3. Selecione "Open with Live Server".

**Opção 2 - Servidor HTTP do Python**
1. Abra o terminal na raiz do projeto (pasta `delivery-mvp`).
2. Execute:
   ```
   python -m http.server
   ```
3. Acesse `http://localhost:8000/src/index.html` no navegador.

## Casos de teste

1. **Carregamento do cardápio**
   - Ao abrir a página, os produtos devem aparecer automaticamente.
   - Esperado: 6 produtos visíveis (Pizzas, Lanches, Acompanhamentos, Bebidas).

2. **Adicionar item ao carrinho**
   - Clique em "Adicionar" em qualquer produto.
   - Esperado: o item aparece na lista "Seu Pedido" à direita, e o total é atualizado.

3. **Adicionar múltiplos itens**
   - Adicione 2 ou 3 produtos diferentes.
   - Esperado: todos aparecem na lista, e o total soma corretamente.

4. **Carrinho vazio**
   - Antes de adicionar qualquer item, o carrinho deve mostrar
     "Nenhum item adicionado ainda."

5. **Finalizar pedido sem itens**
   - Clique em "Finalizar Pedido" sem ter adicionado nada.
   - Esperado: um alerta pede para adicionar pelo menos um item.

6. **Finalizar pedido com itens**
   - Adicione itens e clique em "Finalizar Pedido".
   - Esperado: um alerta mostra o total do pedido, e o carrinho é esvaziado.

## Próximos testes (quando integrar com back-end)
- Persistência do pedido em banco de dados
- Validação de estoque
- Cálculo de frete
