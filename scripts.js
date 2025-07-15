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

//////////////////////////////////////////

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

//////////////////////////////////////////