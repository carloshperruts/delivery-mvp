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
## Testes de responsividade e imagens

7. **Responsividade em tablets**
   - Abra a página em uma tela com largura de até 768 pixels.
   - Esperado: o cardápio e o carrinho ficam organizados verticalmente, ocupando a largura disponível, sem cortes ou rolagem horizontal indesejada.

8. **Responsividade em celulares**
   - Abra a página em uma tela com largura de até 480 pixels.
   - Esperado: os produtos aparecem em uma coluna, os textos ficam legíveis e os botões continuam visíveis e fáceis de clicar.

9. **Exibição das imagens dos produtos**
   - Verifique se cada um dos 6 produtos apresenta sua imagem correspondente.
   - Esperado: as imagens aparecem dentro dos cards, sem distorção ou ultrapassar os limites do cardápio.

10. **Funcionamento do carrinho em telas pequenas**
    - Em uma tela de celular, adicione um produto ao carrinho e depois adicione outro.
    - Esperado: os itens aparecem corretamente, o total é atualizado e o botão "Finalizar Pedido" permanece acessível.

11. **Remover item do carrinho**
    - Adicione um item ao carrinho e clique no botão de lixeira (🗑️) ou "Remover".
    - Esperado: o item é removido imediatamente da lista e o valor total do pedido é recalculado sem ele.

12. **Alterar quantidade de um item (Aumentar e Diminuir)**
    - Adicione um item e clique nos botões "+" e "-" do item no carrinho.
    - Esperado: ao clicar no "+", a quantidade do item aumenta para 2 e o subtotal do item/total da compra dobra. Ao clicar no "-", a quantidade diminui.

13. **Remoção automática ao zerar quantidade**
    - Em um item com quantidade 1 no carrinho, clique no botão "-".
    - Esperado: a quantidade chega a 0 e o item é removido do carrinho automaticamente.

14. **Mensagem personalizada de carrinho vazio**
    - Com o carrinho zerado (ao abrir a página ou remover todos os itens), observe o espaço do carrinho.
    - Esperado: exibe a mensagem amigável com ícone "🛒 Seu carrinho está vazio!" acompanhada de instruções para escolher itens no cardápio.