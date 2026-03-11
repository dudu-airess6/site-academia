/* =========================================
   PERFIL.JS - Atualização e Leitura Inteligente
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.querySelector('form');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    const todosOsCampos = form.querySelectorAll('input, select, textarea');

    // ==========================================
    // 1. FUNÇÃO DE MÁSCARA DO CPF
    // ==========================================
    const cpfInput = document.getElementById('cpf');

    function formatarCPF(valor) {
        let v = valor.replace(/\D/g, ''); // Tira tudo que não é número
        if (v.length > 11) v = v.slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return v;
    }

    // Aplica a máscara se o aluno tentar editar o CPF no perfil
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            e.target.value = formatarCPF(e.target.value);
        });
    }

    // ==========================================
    // 2. CARREGAR OS DADOS GUARDADOS NO NAVEGADOR
    // ==========================================
    todosOsCampos.forEach(campo => {
        if (campo.type === 'password') return;

        const chave = 'ldl_' + (campo.id || campo.name);
        const valorSalvo = localStorage.getItem(chave);

        if (valorSalvo !== null) {
            if (campo.type === 'checkbox' || campo.type === 'radio') {
                campo.checked = (valorSalvo === 'true');
            } else {
                campo.value = valorSalvo;
            }
        }
    });

    // ==========================================
    // 3. FORÇAR FORMATAÇÃO AO ABRIR A TELA
    // ==========================================
    // Se o CPF veio "cru" da memória (ex: 10210201222), isso aqui força os pontinhos!
    if (cpfInput && cpfInput.value) {
        cpfInput.value = formatarCPF(cpfInput.value);
    }

    // ==========================================
    // 4. ATUALIZAR DADOS E REDIRECIONAR AO GUARDAR
    // ==========================================
    if (submitBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            todosOsCampos.forEach(campo => {
                if (campo.type === 'password') return; 

                const chave = 'ldl_' + (campo.id || campo.name);
                if (campo.type === 'checkbox' || campo.type === 'radio') {
                    localStorage.setItem(chave, campo.checked);
                } else {
                    localStorage.setItem(chave, campo.value);
                }
            });

            // Efeito visual no botão
            const btnText = submitBtn.querySelector('.btn-text') || submitBtn;
            
            btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A guardar...';
            submitBtn.style.opacity = '0.8';
            submitBtn.style.pointerEvents = 'none';

            setTimeout(() => {
                btnText.innerHTML = '<i class="fas fa-check"></i> Dados Atualizados!';
                submitBtn.style.backgroundColor = '#2ed573'; 
                submitBtn.style.color = '#ffffff';
                submitBtn.style.borderColor = '#2ed573';
                submitBtn.style.opacity = '1';

                // Redireciona de volta para o painel de treino
                setTimeout(() => {
                    window.location.href = 'aluno-painel.html'; 
                }, 1000);

            }, 1000); 
        });
    }
});