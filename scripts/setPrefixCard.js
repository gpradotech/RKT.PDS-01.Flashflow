import { flashcards } from './flashcards.js';
import { cardVisible } from './elements.js';

// Função para definir o prefixo da dificuldade (F, M, D)
export function setPrefix() {
  let prefix = 0;
  switch (flashcards[cardVisible].difficulty) {
    case 1: prefix = 'F'; break;
    case 2: prefix = 'M'; break;
    case 3: prefix = 'D'; break;
    default: prefix = 'X'; break;
  }
  return prefix;
}