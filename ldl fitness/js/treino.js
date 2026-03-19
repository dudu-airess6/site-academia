/* =========================================
   TREINO.JS - Memória, Checks e Conclusão
   ========================================= */

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todos os checkboxes da lista de exercícios
    const checkboxes = document.querySelectorAll('.lista-exercicios input[type="checkbox"]');
    
    // Seleciona os botões pelos IDs
    const btnFinalizar = document.getElementById('btnFinalizar');
    const btnSelecionarTodos = document.getElementById('btnSelecionarTodos');

    // Detecta se a URL contém "cut" para diferenciar os treinos
    const isCut = window.location.pathname.includes('cut');

    // Define um prefixo para salvar no localStorage (separa os tipos de treino)
    const prefixo = isCut ? 'treino_cut_' : 'treino_hipertrofia_';

    // ==========================================
    // 1. LOAD PROGRESS (localStorage → UI)
    // ==========================================

    // Percorre todos os checkboxes
    checkboxes.forEach(chk => {

        const id = chk.id; // Pega o id do checkbox
        
        // Se estiver salvo como 'true', marca o checkbox automaticamente
        if (localStorage.getItem(prefixo + id) === 'true') {
            chk.checked = true;
        }


        // ==========================================
        // 2. REAL-TIME SAVE (UI → localStorage)
        // ==========================================

        // Adiciona event listener de mudança (check/uncheck)
        chk.addEventListener('change', () => {

            // Salva o estado atual (true/false) no localStorage
            localStorage.setItem(prefixo + id, chk.checked);
        });
    });


    // ==========================================
    // 3. SELECT ALL FUNCTION
    // ==========================================

    if (btnSelecionarTodos) {

        // Adiciona event listener no botão
        btnSelecionarTodos.addEventListener('click', () => {

            // Marca todos os checkboxes
            checkboxes.forEach(chk => {

                chk.checked = true; // Atualiza a UI

                // Dispara manualmente o evento "change"
                // Isso garante que o localStorage também seja atualizado
                chk.dispatchEvent(new Event('change'));
            });
        });
    }


    // ==========================================
    // 4. FINALIZAR TREINO
    // ==========================================

    if (btnFinalizar) {

        // Adiciona event listener no botão
        btnFinalizar.addEventListener('click', () => {

            // Feedback para o usuário
            alert('Treino Concluído! Músculo destruído com sucesso. Agora é descansar e comer! 🐺👊');
            
            // Reseta todos os checkboxes
            checkboxes.forEach(chk => {

                chk.checked = false; // Desmarca na UI

                // Remove o item correspondente do localStorage
                localStorage.removeItem(prefixo + chk.id);
            });
            
            // Redireciona de volta para o painel do aluno
            window.location.href = 'aluno-painel.html';
        });
    }
});