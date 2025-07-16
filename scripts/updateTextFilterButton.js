import { filterOptions, filterButton } from "./elements.js";

// Atualiza o texto do botão conforme a opção selecionada
export function updateTextFilterButton() {
  filterOptions.forEach(function(option) {
    option.addEventListener('click', function() {
      filterButton.textContent = option.textContent;
    });
  });
}

// Atualiza o texto do botão ao carregar a página (opcional)
updateTextFilterButton();