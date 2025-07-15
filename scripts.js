const filtroBotao = document.querySelector('.filtro-botao');
const filtroOpcoes = document.querySelector('.filtro-opcoes');

// Atualiza texto do botão de filtro
function atualizarTextoBotao() {
  const opcoes = Array.from(document.querySelectorAll('.filtro-opcao'));
  const selecionadas = opcoes.filter(o => o.classList.contains('ativado') && !o.dataset.todos);
  const todosNiveis = opcoes.find(o => o.dataset.todos === "true");
  let texto = '';

  if (todosNiveis && todosNiveis.classList.contains('ativado')) {
    texto = 'Todos os níveis';
  } else if (selecionadas.length === 1) {
    texto = selecionadas[0].textContent.trim();
  } else if (selecionadas.length === 2) {
    texto = selecionadas.map(o => o.textContent.trim()).join(' e ');
  } else if (selecionadas.length > 2) {
    texto = selecionadas.map(o => o.textContent.trim()).join(', ');
  }

  filtroBotao.querySelector('span').textContent = texto;
}

const caret = filtroBotao.querySelector('.ph.ph-caret-down');

// Alterna painel de opções e rotaciona caret
filtroBotao.addEventListener('click', function(e) {
  e.stopPropagation();
  filtroOpcoes.classList.toggle('ativado');
  if (filtroOpcoes.classList.contains('ativado')) {
    caret.classList.add('rotacionado');
    filtroBotao.classList.add('ativado');
  } else {
    caret.classList.remove('rotacionado');
    filtroBotao.classList.remove('ativado');
  }
  atualizarTextoBotao();
});

// Fecha painel ao clicar fora
document.addEventListener('click', function(e) {
  if (filtroOpcoes.classList.contains('ativado')) {
    if (!filtroOpcoes.contains(e.target) && !filtroBotao.contains(e.target)) {
      filtroOpcoes.classList.remove('ativado');
      caret.classList.remove('rotacionado');
      filtroBotao.classList.remove('ativado');
    }
  }
});

// Atualiza texto do botão sempre que uma opção for clicada
document.querySelectorAll('.filtro-opcao').forEach(function(opcao) {
  opcao.addEventListener('click', function() {
    setTimeout(atualizarTextoBotao, 0);
  });
});

// Atualiza ao carregar
atualizarTextoBotao();

////////////////////////////////////////////////////////////////////////////////////

// Lógica para ativar/desativar opções de filtro
document.querySelectorAll('.filtro-opcao').forEach(function(opcao) {
  opcao.addEventListener('click', function() {
    const todasOpcoes = Array.from(document.querySelectorAll('.filtro-opcao'));
    const todosNiveis = todasOpcoes.find(o => o.dataset.todos === "true");
    const outras = todasOpcoes.filter(o => o !== todosNiveis);

    // Se clicou em "Todos os níveis"
    if (opcao.dataset.todos === "true") {
      if (opcao.classList.contains('ativado')) {
        return;
      }
      todasOpcoes.forEach(o => {
        o.classList.add('ativado');
        const icone = o.querySelector('.ph-check');
        if (icone) icone.setAttribute('aria-label', 'Ativado');
      });
    } else {
      // Se todas as opções (exceto "Todos os níveis") estão ativas, ao clicar em uma delas, deixa só ela ativa
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
        // Desmarca "Todos os níveis"
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

      // Verifica se ficou tudo desmarcado (exceto "Todos os níveis")
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
    // Atualiza os cards filtrados
    setTimeout(() => {
      renderizarCartao();
      atualizarIndicador();
    }, 0);
  });
});

////////////////////////////////////////////////////////////////////////////////////

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

// Função para obter índices dos flashcards filtrados
function getIndicesFiltrados() {
  const opcoes = Array.from(document.querySelectorAll('.filtro-opcao'));
  const todosNiveis = opcoes.find(o => o.dataset.todos === "true");
  const selecionadas = opcoes.filter(o => o.classList.contains('ativado') && !o.dataset.todos);

  if (todosNiveis && todosNiveis.classList.contains('ativado') || selecionadas.length === 0) {
    return flashcards.map((_, idx) => idx);
  }

  const dificuldadesSelecionadas = selecionadas.map(o => o.textContent.trim());
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

// "virar" cartão ao clicar
const card1 = document.getElementById('card-1');
const cardHeader = card1.querySelector('.card-header');
const category = card1.querySelector('.category');
const difficulty = card1.querySelector('.difficulty');
const cardTitle = card1.querySelector('.card-content .title');
const answer = card1.querySelector('.answer');
const question = card1.querySelector('.question');

function toggleCard() {
  if (answer.classList.contains('hidden')) {
    question.classList.remove('hidden');
    cardTitle.classList.remove('hidden');
    cardHeader.classList.remove('hidden');
    card1.classList.remove('back');
    card1.classList.add('front');
  } else {
    question.classList.add('hidden');
    cardTitle.classList.add('hidden');
    cardHeader.classList.add('hidden');
    card1.classList.add('back');
    card1.classList.remove('front');
  }
}
card1.addEventListener('click', function() {
  answer.classList.toggle('hidden');
  toggleCard();
});

// Renderiza o conteúdo do cartão inicial
let cardVisible = 0;
let cardAnterior = 0;

// Define o prefixo com base na dificuldade do cartão
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

// Renderiza o cartão com os dados do flashcard atual
function renderizarCartao() {
  const indicesFiltrados = getIndicesFiltrados();
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

renderizarCartao();

////////////////////////////////////////////////////////////////////////////////////

const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

btnProximo.addEventListener('click', function() {
  const indicesFiltrados = getIndicesFiltrados();
  cardAnterior = cardVisible;
  let novoIdx;
  do {
    novoIdx = indicesFiltrados[Math.floor(Math.random() * indicesFiltrados.length)];
  } while (novoIdx === cardVisible && indicesFiltrados.length > 1);
  cardVisible = novoIdx;
  renderizarCartao();
  atualizarIndicador();
  if (!answer.classList.contains('hidden')) {
    answer.classList.add('hidden');
    toggleCard();
  }
});

btnAnterior.addEventListener('click', function() {
  if (cardVisible === cardAnterior) return;
  [cardVisible, cardAnterior] = [cardAnterior, cardVisible];
  renderizarCartao();
  atualizarIndicador();
  if (!answer.classList.contains('hidden')) {
    answer.classList.add('hidden');
    toggleCard();
  }
});

////////////////////////////////////////////////////////////////////////////////////

// Atualiza o indicador de cartão visível
function atualizarIndicador() {
  const indicesFiltrados = getIndicesFiltrados();
  const indicador = document.querySelector('.indicador');
  const posicao = indicesFiltrados.indexOf(cardVisible) + 1;
  indicador.textContent = `Card ${posicao} de ${indicesFiltrados.length}`;
}

atualizarIndicador();