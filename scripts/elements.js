export const pagination = document.querySelector('.pagination');

export const filterButton = document.querySelector('.filtro-botao');
export const caret = filterButton.querySelector('.ph.ph-caret-down');
export const filterOptions = document.querySelector('.filtro-opcoes');
export const allOptions = Array.from(document.querySelectorAll('.filtro-opcao'));

export const btnBefore = document.getElementById('btn-anterior');
export const btnNext = document.getElementById('btn-proximo');

export const card1 = document.getElementById('card-1');
export const cardHeader = card1.querySelector('.card-header');
export const category = card1.querySelector('.category');
export const difficulty = card1.querySelector('.difficulty');
export const cardTitle = card1.querySelector('.card-content .title');
export const question = card1.querySelector('.question');
export const answer = card1.querySelector('.answer');