import { filterOptions, filterButton } from './elements.js';

export function updateTextButton() {
  // Pega todas as opções de filtro
  filterOptions = Array.from(filterOptions);
  // Filtra as opções que estão ativadas e não são "Todos os níveis"
  const selected = filterOptions.filter(o => o.classList.contains('ativado') && !o.dataset.todos);
  // Encontra a opção "Todos os níveis"
  const allLevels = filterOptions.find(o => o.dataset.todos === "true");
  // Inicializa o texto do botão
  let text = '';

  // Define o texto do botão de acordo com as opções selecionadas
  if (allLevels && allLevels.classList.contains('ativado')) {
    text = 'Todos os níveis';
  } else if (selected.length === 1) {
    text = selected[0].textContent.trim();
  } else if (selected.length === 2) {
    text = selected.map(o => o.textContent.trim()).join(' e ');
  } else if (selected.length > 2) {
    text = selected.map(o => o.textContent.trim()).join(', ');
  }

  // Atualiza o texto do botão de filtro
  filterButton.querySelector('span').textContent = texto;
}