# Roteiro de Teste Manual - MVP Delivery Fácil

Como este é um MVP simples de front-end (sem back-end ainda), os testes
por enquanto são manuais. Siga o roteiro abaixo para validar se está tudo
funcionando:

## Pré-requisito
Abra o arquivo `src/index.html` no navegador (Chrome, Edge, Firefox etc.)

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
