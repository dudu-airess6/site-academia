/* =========================================
   PAINEL DO ALUNO - Lógica de Boas-vindas
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Procura o local onde o nome vai aparecer no HTML
    const spanNome = document.getElementById('nomeAtleta');
    
    // Puxa o nome que foi salvo no Cadastro ou no Perfil
    const nomeSalvo = localStorage.getItem('ldl_firstName');

    // Se a tag existir e tiver um nome salvo na memória...
    if (spanNome && nomeSalvo) {
        // ...ele troca "Atleta" pelo primeiro nome digitado!
        spanNome.textContent = nomeSalvo;
    }
});