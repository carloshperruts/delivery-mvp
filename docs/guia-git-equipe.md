# Guia de Git e GitHub para a Equipe - Delivery Fácil

Este guia explica, passo a passo e com calma, como vamos trabalhar juntos
no projeto a partir de agora que somos 3 pessoas. Ele foi escrito pensando
em quem nunca usou Git antes, então siga com calma, uma etapa de cada vez.

---

## 1. Conceitos básicos (antes de tudo)

### O que é o Git?
É um programa que guarda o "histórico" de tudo que mudou no código, no
seu computador. Cada vez que você salva um avanço, isso vira um registro
chamado **commit**.

### O que é o GitHub?
É o site onde esse histórico fica hospedado, permitindo que todo mundo da
equipe acesse o mesmo projeto, de qualquer lugar.

### O que é uma branch?
Pense na branch como uma **cópia paralela** do projeto. A `main` é a
branch principal — é a versão "oficial", que deve estar sempre
funcionando. Quando alguém vai mexer em algo, o ideal é criar uma branch
separada pra isso, mexer lá, e só depois juntar essa parte na `main`.

Isso evita que o projeto quebre enquanto alguém está testando algo no
meio do caminho.

### O que é um commit?
É um "registro de avanço". Cada commit tem uma mensagem curta explicando
o que mudou (ex: "Adiciona botão de remover item do carrinho").

### O que é um Pull Request (PR)?
É um "pedido" para juntar uma branch separada de volta na `main`. Quando
você termina uma tarefa na sua branch, você abre um PR pedindo pra
alguém revisar e aprovar a junção.

### O que é um merge?
É a ação de efetivamente juntar duas branches. Normalmente acontece
depois que o PR é aprovado.

---

## 2. Antes de começar a trabalhar (todo dia, sempre)

Sempre que for mexer no projeto, **primeiro** atualize sua cópia local
com o que já está no GitHub:

```bash
git checkout main
git pull
```

Isso evita trabalhar "por cima" de uma versão desatualizada.

---

## 3. Criando sua branch (quem vai desenvolver)

Escolha um nome curto que descreva a tarefa. Exemplos:

```bash
git checkout -b remover-item-carrinho
```
ou
```bash
git checkout -b responsividade
```

O comando `checkout -b` faz duas coisas ao mesmo tempo: cria a branch e
já "entra" nela. A partir daqui, tudo que você alterar fica guardado
separado da `main`.

---

## 4. Trabalhando e salvando o progresso

Depois de fazer uma alteração no código (um arquivo, uma função, um
ajuste), salve o progresso assim:

```bash
git add .
git commit -m "Descrição curta do que você fez"
```

Dica: escreva a mensagem no mesmo estilo de uma frase de ação. Exemplos
bons:
- "Adiciona botão de remover item"
- "Corrige erro ao calcular total"
- "Ajusta cardápio para telas pequenas"

Você pode (e deve) fazer vários commits pequenos ao longo do trabalho,
não precisa esperar terminar tudo para salvar.

---

## 5. Enviando sua branch para o GitHub

Quando quiser enviar o que já fez (pode ser no meio do trabalho, não
precisa estar 100% pronto):

```bash
git push -u origin nome-da-sua-branch
```

Troque `nome-da-sua-branch` pelo nome que você escolheu no passo 3.

Esse comando só precisa do `-u origin nome-da-branch` na **primeira vez**
que você envia aquela branch. Depois disso, para enviar novas
atualizações da mesma branch, basta:

```bash
git push
```

---

## 6. Abrindo o Pull Request (PR)

1. Acesse o repositório no navegador: `https://github.com/carloshperruts/delivery-mvp`
2. Normalmente aparece um aviso amarelo no topo com um botão
   **"Compare & pull request"** — clique nele.
   - Se não aparecer, vá na aba **Pull requests** → **New pull request**
     e selecione sua branch.
3. Escreva um título curto e, na descrição, explique rapidamente o que
   foi feito.
4. Clique em **Create pull request**.

Pronto — agora o Carlos (ou qualquer outro revisor) vai poder ver
exatamente o que mudou e aprovar.

---

## 7. Revisão e merge (papel do Carlos neste momento do projeto)

1. Na aba **Pull requests**, abrir o PR.
2. Revisar as mudanças (o GitHub mostra em verde o que foi adicionado e
   em vermelho o que foi removido).
3. Se estiver tudo certo, clicar em **Merge pull request** → **Confirm
   merge**.
4. Pode apagar a branch depois do merge (o próprio GitHub oferece um
   botão "Delete branch") — ela já cumpriu sua função.

---

## 8. Depois do merge: todo mundo atualiza

Assim que uma branch for "mergeada" na `main`, **todos** da equipe devem
rodar, na pasta do projeto:

```bash
git checkout main
git pull
```

Isso garante que todo mundo está sempre com a versão mais recente antes
de começar uma nova tarefa.

---

## 9. Resumo do ciclo completo

Para fixar, aqui está o ciclo que cada pessoa vai repetir a cada tarefa:

1. `git checkout main`
2. `git pull`
3. `git checkout -b nome-da-tarefa`
4. *(fazer as alterações no código)*
5. `git add .`
6. `git commit -m "mensagem descrevendo o que mudou"`
7. `git push -u origin nome-da-tarefa`
8. Abrir o Pull Request no GitHub
9. Aguardar revisão e merge
10. `git checkout main` + `git pull` (para pegar a versão atualizada)

---

## 10. Erros comuns e o que fazer

**"git push" foi recusado (rejected)**
Alguém enviou algo antes de você. Rode `git pull` primeiro, resolva
qualquer conflito se aparecer, e tente o `push` de novo.

**Apareceu uma mensagem de "conflito" (conflict)**
Significa que duas pessoas mudaram a mesma parte do mesmo arquivo. Não
se preocupe, é normal — nesse caso, chame o Carlos para ajudar a
resolver juntos antes de prosseguir.

**Esqueci em qual branch estou**
Rode:
```bash
git branch
```
A branch marcada com `*` é a que você está usando no momento.

---

Qualquer dúvida durante o processo, é só chamar no grupo antes de fazer
algo que não tiver certeza — é melhor perguntar do que gerar um
conflito grande no projeto.
