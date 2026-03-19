/* =========================================
   PERFIL.JS - Atualização e Leitura Inteligente
   ========================================= */

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona o form da página
    const form = document.querySelector('form');

    // Seleciona o botão de submit
    const submitBtn = document.getElementById('submitBtn');

    // Se não existir form, interrompe o script
    if (!form) return;

    // Seleciona todos os campos do formulário (inputs, selects, textareas)
    const todosOsCampos = form.querySelectorAll('input, select, textarea');


    // ==========================================
    // 1. FUNÇÃO DE MÁSCARA DO CPF
    // ==========================================

    // Seleciona o input de CPF
    const cpfInput = document.getElementById('cpf');

    // Função que formata o CPF
    function formatarCPF(valor) {

        // Remove tudo que não for número
        let v = valor.replace(/\D/g, '');

        // Limita a 11 dígitos
        if (v.length > 11) v = v.slice(0, 11);

        // Aplica máscara ###.###.###
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');

        // Aplica hífen final
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        return v;
    }

    // Aplica a máscara ao digitar no campo CPF
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {

            // Atualiza o valor já formatado
            e.target.value = formatarCPF(e.target.value);
        });
    }


    // ==========================================
    // 2. LOAD DATA DO localStorage
    // ==========================================

    // Percorre todos os campos do form
    todosOsCampos.forEach(campo => {

        // Ignora campos do tipo password
        if (campo.type === 'password') return;

        // Cria uma key única baseada no id ou name do campo
        const chave = 'ldl_' + (campo.id || campo.name);

        // Busca valor salvo no localStorage
        const valorSalvo = localStorage.getItem(chave);

        // Se existir valor salvo
        if (valorSalvo !== null) {

            // Se for checkbox ou radio
            if (campo.type === 'checkbox' || campo.type === 'radio') {

                // Converte string para boolean
                campo.checked = (valorSalvo === 'true');

            } else {

                // Preenche o campo normalmente
                campo.value = valorSalvo;
            }
        }
    });


    // ==========================================
    // 3. FORÇAR FORMATAÇÃO AO CARREGAR
    // ==========================================

    // Garante que o CPF carregado já venha formatado
    if (cpfInput && cpfInput.value) {
        cpfInput.value = formatarCPF(cpfInput.value);
    }


    // ==========================================
    // 4. SAVE DATA + REDIRECT
    // ==========================================

    if (submitBtn) {

        // Escuta o submit do formulário
        form.addEventListener('submit', function(e) {

            e.preventDefault(); // Evita reload da página

            // Percorre todos os campos para salvar no localStorage
            todosOsCampos.forEach(campo => {

                // Ignora senha (boa prática de segurança)
                if (campo.type === 'password') return; 

                // Cria a key
                const chave = 'ldl_' + (campo.id || campo.name);

                // Salva checkbox/radio como boolean
                if (campo.type === 'checkbox' || campo.type === 'radio') {

                    localStorage.setItem(chave, campo.checked);

                } else {

                    // Salva valor normal
                    localStorage.setItem(chave, campo.value);
                }
            });

            // ==========================================
            // FEEDBACK VISUAL (UX)
            // ==========================================

            // Pega o texto do botão (ou o próprio botão)
            const btnText = submitBtn.querySelector('.btn-text') || submitBtn;
            
            // Mostra loading com spinner
            btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A guardar...';

            submitBtn.style.opacity = '0.8';
            submitBtn.style.pointerEvents = 'none';

            // Simula processamento
            setTimeout(() => {

                // Mostra sucesso
                btnText.innerHTML = '<i class="fas fa-check"></i> Dados Atualizados!';

                // Muda estilo do botão para verde
                submitBtn.style.backgroundColor = '#2ed573'; 
                submitBtn.style.color = '#ffffff';
                submitBtn.style.borderColor = '#2ed573';
                submitBtn.style.opacity = '1';

                // Aguarda um pouco e redireciona
                setTimeout(() => {

                    // Redireciona para o painel do aluno
                    window.location.href = 'aluno-painel.html'; 

                }, 1000);

            }, 1000); 
        });
    }
});