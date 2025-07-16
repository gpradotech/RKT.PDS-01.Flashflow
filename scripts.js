// Atualiza o texto do botão sempre que uma opção de filtro for clicada
document.querySelectorAll('.filtro-opcao').forEach(function(opcao) {
  opcao.addEventListener('click', function() {
    setTimeout(atualizarTextoBotao, 0); // Usa setTimeout para garantir atualização após o clique
  });
});

// Atualiza o texto do botão ao carregar a página
atualizarTextoBotao();