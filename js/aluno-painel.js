/* =========================================
   PAINEL DO ALUNO - Lógica de Boas-vindas
   ========================================= */

// Adiciona um event listener que espera o HTML ser totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Procura no HTML um elemento com id="nomeAtleta"
    const spanNome = document.getElementById('nomeAtleta');
    
    // Busca no localStorage o valor salvo com a key 'ldl_firstName'
    const nomeSalvo = localStorage.getItem('ldl_firstName');

    // Verifica duas coisas:
    // 1. Se o elemento foi encontrado no HTML
    // 2. Se existe um valor salvo no localStorage
    if (spanNome && nomeSalvo) {

        // Se as condições forem verdadeiras, substitui o textContent pelo valor salvo
        spanNome.textContent = nomeSalvo;
    }
});