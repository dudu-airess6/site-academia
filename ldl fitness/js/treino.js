/* =========================================
   TREINO.JS - Memória, Checks e Conclusão
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // Pega todos os checkboxes da tela
    const checkboxes = document.querySelectorAll('.lista-exercicios input[type="checkbox"]');
    
    // Pega os botões pelo ID
    const btnFinalizar = document.getElementById('btnFinalizar');
    const btnSelecionarTodos = document.getElementById('btnSelecionarTodos');

    // Identificador para separar os treinos no localStorage (pega da página)
    const isCut = window.location.pathname.includes('cut');
    const prefixo = isCut ? 'treino_cut_' : 'treino_hipertrofia_';

    // ==========================================
    // 1. CARREGAR PROGRESSO SALVO
    // ==========================================
    checkboxes.forEach(chk => {
        const id = chk.id;
        
        // Se estiver salvo como 'true' na memória, marca o check
        if (localStorage.getItem(prefixo + id) === 'true') {
            chk.checked = true;
        }

        // ==========================================
        // 2. SALVAR CADA CLIQUE EM TEMPO REAL
        // ==========================================
        chk.addEventListener('change', () => {
            localStorage.setItem(prefixo + id, chk.checked);
        });
    });

    // ==========================================
    // 3. FUNÇÃO DE MARCAR TODOS
    // ==========================================
    if (btnSelecionarTodos) {
        btnSelecionarTodos.addEventListener('click', () => {
            checkboxes.forEach(chk => {
                chk.checked = true; // Marca na tela
                chk.dispatchEvent(new Event('change')); // Força o salvamento no localStorage
            });
        });
    }

    // ==========================================
    // 4. FUNÇÃO DE FINALIZAR TREINO
    // ==========================================
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            alert('Treino Concluído! Músculo destruído com sucesso. Agora é descansar e comer! 🐺👊');
            
            // Limpa as caixas marcadas para o treino do dia seguinte
            checkboxes.forEach(chk => {
                chk.checked = false;
                localStorage.removeItem(prefixo + chk.id);
            });
            
            // Retorna o aluno para o painel
            window.location.href = 'aluno-painel.html';
        });
    }
});