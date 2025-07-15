const filtroBotao = document.querySelector('.filtro-botao');
const filtroOpcoes = document.querySelector('.filtro-opcoes');

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

// Adiciona evento de clique no botão de filtro
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

// Rotaciona caret ao clicar fora do botão
document.addEventListener('click', function(e) {
  if (filtroOpcoes.classList.contains('ativado')) {
    if (!filtroOpcoes.contains(e.target) && !filtroBotao.contains(e.target)) {
      filtroOpcoes.classList.remove('ativado');
      caret.classList.remove('rotacionado');
      filtroBotao.classList.remove('ativado');
    }
  }
});

// Fecha painel ao clicar fora
document.addEventListener('click', function(e) {
  if (filtroOpcoes.classList.contains('ativado')) {
    if (!filtroOpcoes.contains(e.target) && !filtroBotao.contains(e.target)) {
      filtroOpcoes.classList.remove('ativado');
    }
  }
});

// Atualiza texto do botão sempre que uma opção for clicada
document.querySelectorAll('.filtro-opcao').forEach(function(opcao) {
  opcao.addEventListener('click', function() {
    setTimeout(atualizarTextoBotao, 0); // Aguarda atualização das classes
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
      // NOVO: Se todas as opções (exceto "Todos os níveis") estão ativas, ao clicar em uma delas, deixa só ela ativa
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
  });
});

////////////////////////////////////////////////////////////////////////////////////

const flashcards = [
	{
    difficulty: 2,
    category: "Esporte",
    id: "001",
    title: "Respeito às Minorias",
		question: "Como combater os casos de desrespeito às minorias no futebol?",
		answer: "Combate ao desrespeito no futebol, como os crimes de racismo e homofobia, com punições e educação da torcida e clubes."
	},
  {
    difficulty: 1,
    category: "Culinária",
    id: "002",
    title: "Feijão no Arroz",
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
    difficulty: 2,
    category: "Esporte",
    id: "004",
    title: "Respeito às Minorias",
		question: "Como combater os casos de desrespeito às minorias no futebol?",
		answer: "Combate ao desrespeito no futebol, como os crimes de racismo e homofobia, com punições e educação da torcida e clubes."
	},
];

////////////////////////////////////////////////////////////////////////////////////

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
// F = Fácil, M = Médio, D = Difícil, X = Desconhecido
function setPrefix() {
  let prefix = 0;

  switch (flashcards[cardVisible].difficulty) {
    case 1:
      prefix = 'F';
      break;
    case 2:
      prefix = 'M';
      break;
    case 3:
      prefix = 'D';
      break;
    default:
      prefix = 'X';
      break;
  }

  return prefix;
}

// Renderiza o cartão com os dados do flashcard atual
function renderizarCartao() {
  card1.setAttribute('data-difficulty', flashcards[cardVisible].difficulty);
  difficulty.textContent = `${setPrefix()}${flashcards[cardVisible].id}`;
  category.textContent = flashcards[cardVisible].category;
  cardTitle.textContent = flashcards[cardVisible].title;
  question.textContent = flashcards[cardVisible].question;
  answer.textContent = flashcards[cardVisible].answer;
}

renderizarCartao()

////////////////////////////////////////////////////////////////////////////////////

const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

btnProximo.addEventListener('click', function() {
  cardAnterior = cardVisible;
  
  let novoCard;
  do {
    novoCard = Math.floor(Math.random() * flashcards.length);
  } while (novoCard === cardVisible && flashcards.length > 1);
  
  cardVisible = novoCard;

  renderizarCartao();
  atualizarIndicador();

  // Se o cartão estiver virado, volta para o estado inicial
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

  // Se o cartão estiver virado, volta para o estado inicial
  if (!answer.classList.contains('hidden')) {
    answer.classList.add('hidden');
    toggleCard();
  }
});

////////////////////////////////////////////////////////////////////////////////////

// Atualiza o indicador de cartão visível
// Exibe o número do cartão atual e o total de cartões
function atualizarIndicador() {
  const indicador = document.querySelector('.indicador');
  indicador.textContent = `Card ${cardVisible + 1} de ${flashcards.length}`;
}

atualizarIndicador()