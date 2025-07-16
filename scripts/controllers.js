// Evento para mostrar um novo cartão aleatório ao clicar em "Próximo"
import { btnBefore, btnNext, answer } from "./elements.js";
import { getFilterIndex } from "./filterIndex.js";
import { flipCard } from "./flipCard.js";
import { renderCard } from "./renderCard.js";
import { updatePagination } from "./updatePagination.js"

// Variáveis para controlar o cartão visível e o anterior
export let cardVisible = 1;
export let cardBefore = 0;

function controllers() {
  btnNext.addEventListener('click', () => {
    cardVisible = 1
    
  })
  
}

controllers()
