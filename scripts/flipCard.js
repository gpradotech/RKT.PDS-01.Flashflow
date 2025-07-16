import { card1, cardHeader, cardTitle, question, answer } from "./elements.js";

// Função para alternar entre frente e verso do cartão (mostrar pergunta ou resposta)
export function flipCard() {
  if (answer.classList.contains('hidden')) {
    // Mostra a resposta (frente do cartão)
    question.classList.add('hidden');
    cardTitle.classList.add('hidden');
    cardHeader.classList.add('hidden');
    card1.classList.add('back');

    card1.classList.remove('front');
    answer.classList.remove('hidden');
  } else {
    // Mostra a pergunta (verso do cartão)
    question.classList.remove('hidden');
    cardTitle.classList.remove('hidden');
    cardHeader.classList.remove('hidden');
    card1.classList.remove('back');

    card1.classList.add('front');
    answer.classList.add('hidden');
  }
}

// Adiciona um evento de clique ao cartão para alternar entre frente e verso
card1.addEventListener('click', () => {
  flipCard();
});