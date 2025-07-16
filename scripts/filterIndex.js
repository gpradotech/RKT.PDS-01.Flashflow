// Função que retorna os índices dos flashcards filtrados conforme as opções selecionadas
import { allOptions } from "./elements.js";
import { flashcards } from "./flashcards.js";

export function getFilterIndex() {
  const options = Array.from(allOptions);
  const allLevels = options.find(o => o.dataset.todos === "true");
  const selected = options.filter(o => o.classList.contains('ativado') && !o.dataset.todos);

  // Se "Todos os níveis" está ativado ou nenhuma opção está selecionada, retorna todos os índices
  if (allLevels && allLevels.classList.contains('ativado') || selected.length === 0) {
    return flashcards.map((_, idx) => idx);
  }

  // Pega os textos das dificuldades selecionadas
  // Exemplo: ['Fácil', 'Médio', 'Difícil']
  const difficultySelected = selected.map(o => o.textContent.trim());
  // Filtra os flashcards conforme a dificuldade selecionada
  return flashcards
    .map((card, idx) => ({card, idx}))
    .filter(({card}) => {
      if (card.difficulty === 1 && difficultySelected.includes('Fácil')) return true;
      if (card.difficulty === 2 && difficultySelected.includes('Médio')) return true;
      if (card.difficulty === 3 && difficultySelected.includes('Difícil')) return true;
      return false;
    })
    .map(({idx}) => idx);
}