import { difficulty, category, cardTitle, question, answer } from "./elements.js";
import { flashcards } from "./flashcards.js";
import { cardVisible } from "./controllers.js"

export function renderCard() {
  category.textContent = flashcards[cardVisible].category;
  difficulty.textContent = flashcards[cardVisible].id;
  cardTitle.textContent = flashcards[cardVisible].title;
  question.textContent = flashcards[cardVisible].question;
  answer.textContent = flashcards[cardVisible].answer;
}

// Renderiza o cartão ao carregar a página
renderCard();