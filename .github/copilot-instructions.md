# Copilot Instructions for RKT.PDS-01.Flashflow

## Visão Geral
Este projeto é uma aplicação web de flashcards, organizada em módulos JavaScript ES6. O código está dividido em múltiplos arquivos sob `scripts/`, cada um responsável por uma funcionalidade específica (renderização, controle, manipulação de elementos, filtros, etc).

## Estrutura e Fluxo Principal
- O estado do cartão visível é controlado por variáveis e funções em módulos como `elements.js` e `renderCard.js`.
- O fluxo de renderização do cartão depende do índice atual (`cardVisible`) e do array de flashcards importado de `flashcards.js`.
- Navegação entre cartões é feita por eventos nos botões `btnNext` e `btnBefore`, definidos em `controllers.js`.
- Filtros e prefixos de cartões são tratados por módulos como `filterIndex.js` e `setPrefixCard.js`.

## Convenções e Padrões
- Cada módulo exporta funções ou constantes específicas do seu domínio.
- O acesso e atualização do cartão visível deve ser feito via funções getter/setter (ex: `getCardVisible`, `setCardVisible`), não diretamente por variáveis globais.
- O arquivo `renderCard.js` é responsável por atualizar o DOM com os dados do flashcard atual.
- O código utiliza classes CSS como `hidden` para controlar a visibilidade de elementos (ex: resposta do cartão).

## Exemplos de Fluxo
- Ao clicar em "Próximo", o índice do cartão é atualizado e `renderCard()` é chamado para atualizar o conteúdo.
- Ao clicar em "Anterior", o índice é trocado com o anterior e o cartão é re-renderizado.
- Mudanças de filtro devem atualizar o índice e disparar nova renderização.

## Dicas para Agentes AI
- Sempre use as funções de controle de estado ao manipular o cartão visível.
- Mantenha a separação de responsabilidades: manipulação de DOM em `renderCard.js`, lógica de controle em `controllers.js`, dados em `flashcards.js`.
- Para adicionar novas funcionalidades, siga o padrão de modularização já existente.
- Consulte os arquivos em `scripts/` para exemplos de integração entre módulos.

## Diretórios e Arquivos-Chave
- `scripts/` — módulos JS principais
- `elements.js` — referências a elementos do DOM e variáveis de estado
- `renderCard.js` — lógica de renderização do cartão
- `controllers.js` — eventos e controle de navegação
- `flashcards.js` — dados dos flashcards

---
Se algum padrão ou fluxo não estiver claro, peça exemplos de uso real nos arquivos do diretório `scripts/`.
