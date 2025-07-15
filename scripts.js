// Seleciona o botão de filtro e o painel de opções do filtro
const filtroBotao = document.querySelector('.filtro-botao');
const filtroOpcoes = document.querySelector('.filtro-opcoes');

// Função para atualizar o texto do botão de filtro conforme as opções selecionadas
function atualizarTextoBotao() {
  // Pega todas as opções de filtro
  const opcoes = Array.from(document.querySelectorAll('.filtro-opcao'));
  // Filtra as opções que estão ativadas e não são "Todos os níveis"
  const selecionadas = opcoes.filter(o => o.classList.contains('ativado') && !o.dataset.todos);
  // Encontra a opção "Todos os níveis"
  const todosNiveis = opcoes.find(o => o.dataset.todos === "true");
  let texto = '';

  // Define o texto do botão de acordo com as opções selecionadas
  if (todosNiveis && todosNiveis.classList.contains('ativado')) {
    texto = 'Todos os níveis';
  } else if (selecionadas.length === 1) {
    texto = selecionadas[0].textContent.trim();
  } else if (selecionadas.length === 2) {
    texto = selecionadas.map(o => o.textContent.trim()).join(' e ');
  } else if (selecionadas.length > 2) {
    texto = selecionadas.map(o => o.textContent.trim()).join(', ');
  }

  // Atualiza o texto do botão de filtro
  filtroBotao.querySelector('span').textContent = texto;
}

// Seleciona o ícone de seta (caret) do botão de filtro
const caret = filtroBotao.querySelector('.ph.ph-caret-down');

// Adiciona evento de clique ao botão de filtro para abrir/fechar o painel de opções
filtroBotao.addEventListener('click', function(e) {
  e.stopPropagation(); // Impede que o clique se propague para outros elementos
  filtroOpcoes.classList.toggle('ativado'); // Mostra ou esconde o painel de opções
  if (filtroOpcoes.classList.contains('ativado')) {
    caret.classList.add('rotacionado'); // Rotaciona o ícone
    filtroBotao.classList.add('ativado');
  } else {
    caret.classList.remove('rotacionado');
    filtroBotao.classList.remove('ativado');
  }
  atualizarTextoBotao(); // Atualiza o texto do botão
});

// Fecha o painel de opções ao clicar fora dele
document.addEventListener('click', function(e) {
  if (filtroOpcoes.classList.contains('ativado')) {
    if (!filtroOpcoes.contains(e.target) && !filtroBotao.contains(e.target)) {
      filtroOpcoes.classList.remove('ativado');
      caret.classList.remove('rotacionado');
      filtroBotao.classList.remove('ativado');
    }
  }
});

// Atualiza o texto do botão sempre que uma opção de filtro for clicada
document.querySelectorAll('.filtro-opcao').forEach(function(opcao) {
  opcao.addEventListener('click', function() {
    setTimeout(atualizarTextoBotao, 0); // Usa setTimeout para garantir atualização após o clique
  });
});

// Atualiza o texto do botão ao carregar a página
atualizarTextoBotao();

////////////////////////////////////////////////////////////////////////////////////

// Lógica para ativar/desativar as opções de filtro
document.querySelectorAll('.filtro-opcao').forEach(function(opcao) {
  opcao.addEventListener('click', function() {
    // Pega todas as opções de filtro
    const todasOpcoes = Array.from(document.querySelectorAll('.filtro-opcao'));
    // Encontra a opção "Todos os níveis"
    const todosNiveis = todasOpcoes.find(o => o.dataset.todos === "true");
    // Filtra as outras opções (exceto "Todos os níveis")
    const outras = todasOpcoes.filter(o => o !== todosNiveis);

    // Se clicou em "Todos os níveis"
    if (opcao.dataset.todos === "true") {
      if (opcao.classList.contains('ativado')) {
        return; // Se já está ativado, não faz nada
      }
      // Ativa todas as opções
      todasOpcoes.forEach(o => {
        o.classList.add('ativado');
        const icone = o.querySelector('.ph-check');
        if (icone) icone.setAttribute('aria-label', 'Ativado');
      });
    } else {
      // Se todas as opções (menos "Todos os níveis") estão ativas, ao clicar em uma delas, deixa só ela ativa
      const todasAtivadas = outras.every(o => o.classList.contains('ativado'));
      if (todasAtivadas) {
        outras.forEach(o => {
          o.classList.remove('ativado');
          const icone = o.querySelector('.ph-check');
          if (icone) icone.setAttribute('aria-label', 'Desativado');
        });
        opcao.classList.add('ativado');
        const icone = opcao.querySelector('.ph-check');
        if (icone) icone.setAttribute('aria-label', 'Ativado');
        // Desativa "Todos os níveis"
        todosNiveis.classList.remove('ativado');
        const iconeTodos = todosNiveis.querySelector('.ph-check');
        if (iconeTodos) iconeTodos.setAttribute('aria-label', 'Desativado');
        return;
      }

      // Alterna apenas a opção clicada normalmente
      opcao.classList.toggle('ativado');
      const icone = opcao.querySelector('.ph-check');
      if (icone) {
        icone.setAttribute(
          'aria-label',
          opcao.classList.contains('ativado') ? 'Ativado' : 'Desativado'
        );
      }

      // Se nenhuma opção (exceto "Todos os níveis") ficou ativada, ativa todas
      const nenhumaAtivada = !outras.some(o => o.classList.contains('ativado'));
      if (nenhumaAtivada) {
        todasOpcoes.forEach(o => {
          o.classList.add('ativado');
          const icone = o.querySelector('.ph-check');
          if (icone) icone.setAttribute('aria-label', 'Ativado');
        });
        return;
      }

      // Se todas as outras estiverem ativadas, ativa "Todos os níveis"
      const todasAtivadasDepois = outras.every(o => o.classList.contains('ativado'));
      if (todosNiveis) {
        todosNiveis.classList.toggle('ativado', todasAtivadasDepois);
        const iconeTodos = todosNiveis.querySelector('.ph-check');
        if (iconeTodos) {
          iconeTodos.setAttribute('aria-label', todasAtivadasDepois ? 'Ativado' : 'Desativado');
        }
      } else {
        todosNiveis.classList.remove('ativado');
        const iconeTodos = todosNiveis.querySelector('.ph-check');
        if (iconeTodos) iconeTodos.setAttribute('aria-label', 'Desativado');
      }
    }
    // Atualiza os cartões filtrados e o indicador
    setTimeout(() => {
      renderizarCartao();
      atualizarIndicador();
    }, 0);
  });
});

////////////////////////////////////////////////////////////////////////////////////

// Array de objetos com os dados dos flashcards
const flashcards = [
    {
    difficulty: 2,
    category: "Esporte",
    id: "001",
    title: "Respeito às minorias",
        question: "Como combater os casos de desrespeito às minorias no futebol?",
        answer: "Debate o combate ao desrespeito no futebol, como os crimes de racismo e homofobia, com punições e educação da torcida e clubes."
    },
  {
    difficulty: 1,
    category: "Culinária",
    id: "002",
    title: "Feijão no arroz",
        question: "O feijão vai por cima ou por baixo do arroz?",
        answer: "Debate a ordem ideal de servir feijão e arroz, focando em sabor e textura."
    },
  {
    difficulty: 3,
    category: "Política",
    id: "003",
    title: "Desmilitarização da Polícia",
        question: "A polícia deveria ser uma força civil e não militarizada?",
        answer: "Discute se a polícia deve ser civil para focar na comunidade e reduzir a violência atual, como a Guarda Civil."
    },
  {
    difficulty: 1,
    category: "Economia",
    id: "004",
    title: "Pedir desconto",
        question: "Pedir desconto é um direito ou uma cara de pau?",
        answer: "Debate sobre a legitimidade de pedir desconto, considerando aspectos culturais e sociais."
    },
];

////////////////////////////////////////////////////////////////////////////////////

// Função que retorna os índices dos flashcards filtrados conforme as opções selecionadas
function getIndicesFiltrados() {
  const opcoes = Array.from(document.querySelectorAll('.filtro-opcao'));
  const todosNiveis = opcoes.find(o => o.dataset.todos === "true");
  const selecionadas = opcoes.filter(o => o.classList.contains('ativado') && !o.dataset.todos);

  // Se "Todos os níveis" está ativado ou nenhuma opção está selecionada, retorna todos os índices
  if (todosNiveis && todosNiveis.classList.contains('ativado') || selecionadas.length === 0) {
    return flashcards.map((_, idx) => idx);
  }

  // Pega os textos das dificuldades selecionadas
  const dificuldadesSelecionadas = selecionadas.map(o => o.textContent.trim());
  // Filtra os flashcards conforme a dificuldade selecionada
  return flashcards
    .map((card, idx) => ({card, idx}))
    .filter(({card}) => {
      if (card.difficulty === 1 && dificuldadesSelecionadas.includes('Fácil')) return true;
      if (card.difficulty === 2 && dificuldadesSelecionadas.includes('Médio')) return true;
      if (card.difficulty === 3 && dificuldadesSelecionadas.includes('Difícil')) return true;
      return false;
    })
    .map(({idx}) => idx);
}

// Seleciona elementos do cartão na tela
const card1 = document.getElementById('card-1');
const cardHeader = card1.querySelector('.card-header');
const category = card1.querySelector('.category');
const difficulty = card1.querySelector('.difficulty');
const cardTitle = card1.querySelector('.card-content .title');
const answer = card1.querySelector('.answer');
const question = card1.querySelector('.question');

// Função para alternar entre frente e verso do cartão (mostrar pergunta ou resposta)
function toggleCard() {
  if (answer.classList.contains('hidden')) {
    // Mostra a pergunta (frente do cartão)
    question.classList.remove('hidden');
    cardTitle.classList.remove('hidden');
    cardHeader.classList.remove('hidden');
    card1.classList.remove('back');
    card1.classList.add('front');
  } else {
    // Mostra a resposta (verso do cartão)
    question.classList.add('hidden');
    cardTitle.classList.add('hidden');
    cardHeader.classList.add('hidden');
    card1.classList.add('back');
    card1.classList.remove('front');
  }
}

// Adiciona evento de clique para virar o cartão
card1.addEventListener('click', function() {
  answer.classList.toggle('hidden');
  toggleCard();
});

// Variáveis para controlar o cartão visível e o anterior
let cardVisible = 0;
let cardAnterior = 0;

// Função para definir o prefixo da dificuldade (F, M, D)
function setPrefix() {
  let prefix = 0;
  switch (flashcards[cardVisible].difficulty) {
    case 1: prefix = 'F'; break;
    case 2: prefix = 'M'; break;
    case 3: prefix = 'D'; break;
    default: prefix = 'X'; break;
  }
  return prefix;
}

// Função para renderizar o cartão na tela com os dados do flashcard atual
function renderizarCartao() {
  const indicesFiltrados = getIndicesFiltrados();
  // Se o cartão atual não está nos filtrados, mostra o primeiro filtrado
  if (!indicesFiltrados.includes(cardVisible)) {
    cardVisible = indicesFiltrados[0] || 0;
  }
  const card = flashcards[cardVisible];
  card1.setAttribute('data-difficulty', card.difficulty);
  difficulty.textContent = `${setPrefix()}${card.id}`;
  category.textContent = card.category;
  cardTitle.textContent = card.title;
  question.textContent = card.question;
  answer.textContent = card.answer;
}

// Renderiza o cartão ao carregar a página
renderizarCartao();

////////////////////////////////////////////////////////////////////////////////////

// Seleciona os botões de navegação (anterior e próximo)
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

// Evento para mostrar um novo cartão aleatório ao clicar em "Próximo"
btnProximo.addEventListener('click', function() {
  const indicesFiltrados = getIndicesFiltrados();
  cardAnterior = cardVisible;
  let novoIdx;
  // Garante que o novo cartão não seja o mesmo que o atual (se houver mais de um)
  do {
    novoIdx = indicesFiltrados[Math.floor(Math.random() * indicesFiltrados.length)];
  } while (novoIdx === cardVisible && indicesFiltrados.length > 1);
  cardVisible = novoIdx;
  renderizarCartao();
  atualizarIndicador();
  // Se a resposta estiver visível, esconde ao trocar de cartão
  if (!answer.classList.contains('hidden')) {
    answer.classList.add('hidden');
    toggleCard();
  }
});

// Evento para voltar ao cartão anterior ao clicar em "Anterior"
btnAnterior.addEventListener('click', function() {
  if (cardVisible === cardAnterior) return; // Se já está no anterior, não faz nada
  [cardVisible, cardAnterior] = [cardAnterior, cardVisible]; // Troca os valores
  renderizarCartao();
  atualizarIndicador();
  // Esconde a resposta se estiver visível
  if (!answer.classList.contains('hidden')) {
    answer.classList.add('hidden');
    toggleCard();
  }
});

////////////////////////////////////////////////////////////////////////////////////

// Função para atualizar o indicador de posição do cartão (ex: "Card 2 de 4")
function atualizarIndicador() {
  const indicesFiltrados = getIndicesFiltrados();
  const indicador = document.querySelector('.indicador');
  const posicao = indicesFiltrados.indexOf(cardVisible) + 1;
  indicador.textContent = `Card ${posicao} de ${indicesFiltrados.length}`;
}

// Atualiza o indicador ao carregar a página
atualizarIndicador();