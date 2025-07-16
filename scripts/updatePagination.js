import { pagination } from "./elements.js";
import { getFilterIndex } from "./filterIndex.js";
import { cardVisible } from "./controllers.js";

export function updatePagination() {
  const filteredIndex = getFilterIndex();
  const position = cardVisible;
  pagination.textContent = `Card ${position} de ${filteredIndex.length}`;
}

updatePagination()