/* =========================================
   TREINO.JS - Memória e Conclusão de Treinos
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // Pega todos os checkboxes da tela
    const checkboxes = document.querySelectorAll('.lista-exercicios input[type="checkbox"]');
    // Pega o botão de finalizar pelo ID
    const btnFinalizar = document.getElementById('btnFinalizar');

    // ==========================================
    // 1. CARREGAR PROGRESSO SALVO
    // ==========================================
    checkboxes.forEach(chk => {
        const id = chk.id;
        
        // Se estiver salvo como 'true' na memória, marca o check
        if (localStorage.getItem('treino_hipertrofia_' + id) === 'true') {
            chk.checked = true;
        }

        // ==========================================
        // 2. SALVAR CADA CLIQUE EM TEMPO REAL
        // ==========================================
        chk.addEventListener('change', () => {
            localStorage.setItem('treino_hipertrofia_' + id, chk.checked);
        });
    });

    // ==========================================
    // 3. FUNÇÃO DE FINALIZAR TREINO
    // ==========================================
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            alert('Treino Concluído! Músculo destruído com sucesso. Agora é descansar e comer! 🐺👊');
            
            // Limpa as caixas marcadas para o treino do dia seguinte
            checkboxes.forEach(chk => {
                chk.checked = false;
                localStorage.removeItem('treino_hipertrofia_' + chk.id);
            });
            
            // Retorna o aluno para o painel
            window.location.href = 'aluno-painel.html';
        });
    }
});