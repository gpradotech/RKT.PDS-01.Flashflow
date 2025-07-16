// Adiciona evento de clique ao botão de filtro para abrir/fechar o painel de opções
import { filterButton, filterOptions, allOptions } from './elements.js';

// Função para abrir/fechar o dropdown
export function toggleDropdown() {

  filterButton.addEventListener('click', function(e) {
    e.stopPropagation(); // Impede que o clique se propague para outros elementos
    filterOptions.classList.toggle('ativado'); // Mostra ou esconde o painel de opções
    if (filterOptions.classList.contains('ativado')) {
      caret.classList.add('rotacionado'); // Rotaciona o ícone
      filterButton.classList.add('ativado');
    } else {
      caret.classList.remove('rotacionado');
      filterButton.classList.remove('ativado');
    }
    updateButtonText(); // Atualiza o texto do botão
  });

  // Fecha o painel de opções ao clicar fora dele
  document.addEventListener('click', function(e) {
    if (filterOptions.classList.contains('ativado')) {
      if (!filterOptions.contains(e.target) && !filterButton.contains(e.target)) {
        filterOptions.classList.remove('ativado');
        caret.classList.remove('rotacionado');
        filterButton.classList.remove('ativado');
      }
    }
  });
}

toggleDropdown()

// Lógica para ativar/desativar as opções de filtro
export function selectOptions() {
  allOptions.forEach(function(option) {
    option.addEventListener('click', function() {
      // Pega todas as opções de filtro
      const allOptions = Array.from(document.querySelectorAll('.filtro-opcao'));
      // Encontra a opção "Todos os níveis"
      const allLevels = allOptions.find(o => o.dataset.todos === "true");
      // Filtra as outras opções (exceto "Todos os níveis")
      const others = allOptions.filter(o => o !== allLevels);

      // Se clicou em "Todos os níveis"
      if (option.dataset.todos === "true") {
        if (option.classList.contains('ativado')) {
          return; // Se já está ativado, não faz nada
        }
        // Ativa todas as opções
        allOptions.forEach(o => {
          o.classList.add('ativado');
          const icone = o.querySelector('.ph-check');
          if (icone) icone.setAttribute('aria-label', 'Ativado');
        });
      } else {
        // Se todas as opções (menos "Todos os níveis") estão ativas, ao clicar em uma delas, deixa só ela ativa
        const todasAtivadas = others.every(o => o.classList.contains('ativado'));
        if (todasAtivadas) {
          others.forEach(o => {
            o.classList.remove('ativado');
            const icone = o.querySelector('.ph-check');
            if (icone) icone.setAttribute('aria-label', 'Desativado');
          });
          option.classList.add('ativado');
          const icone = option.querySelector('.ph-check');
          if (icone) icone.setAttribute('aria-label', 'Ativado');
          // Desativa "Todos os níveis"
          allLevels.classList.remove('ativado');
          const iconeTodos = allLevels.querySelector('.ph-check');
          if (iconeTodos) iconeTodos.setAttribute('aria-label', 'Desativado');
          return;
        }

        // Alterna apenas a opção clicada normalmente
        option.classList.toggle('ativado');
        const icone = option.querySelector('.ph-check');
        if (icone) {
          icone.setAttribute(
            'aria-label',
            option.classList.contains('ativado') ? 'Ativado' : 'Desativado'
          );
        }

        // Se nenhuma opção (exceto "Todos os níveis") ficou ativada, ativa todas
        const nenhumaAtivada = !others.some(o => o.classList.contains('ativado'));
        if (nenhumaAtivada) {
          allOptions.forEach(o => {
            o.classList.add('ativado');
            const icone = o.querySelector('.ph-check');
            if (icone) icone.setAttribute('aria-label', 'Ativado');
          });
          return;
        }

        // Se todas as outras estiverem ativadas, ativa "Todos os níveis"
        const todasAtivadasDepois = others.every(o => o.classList.contains('ativado'));
        if (allLevels) {
          allLevels.classList.toggle('ativado', todasAtivadasDepois);
          const iconeTodos = allLevels.querySelector('.ph-check');
          if (iconeTodos) {
            iconeTodos.setAttribute('aria-label', todasAtivadasDepois ? 'Ativado' : 'Desativado');
          }
        } else {
          allLevels.classList.remove('ativado');
          const iconeTodos = allLevels.querySelector('.ph-check');
          if (iconeTodos) iconeTodos.setAttribute('aria-label', 'Desativado');
        }
      }
      // Atualiza os cartões filtrados e o pagination
      setTimeout(() => {
        renderizarCartao();
        atualizarpagination();
      }, 0);
    });
  });
}

selectOptions()