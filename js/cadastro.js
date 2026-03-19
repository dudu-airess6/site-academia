/* =========================================
   CADASTRO.JS - Lógica de Matrícula LDL
   ========================================= */

// Espera o DOM (HTML) carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DO OLHINHO (UNIVERSAL) ---
    
    // Seleciona todos os ícones de olho (mostrar/ocultar senha)
    const iconesDeOlho = document.querySelectorAll('.fa-eye, .fa-eye-slash');

    // Percorre cada ícone encontrado
    iconesDeOlho.forEach(icone => {

        // Adiciona um event listener de click em cada ícone
        icone.addEventListener('click', function () {
            
            // Tenta pegar o input de senha que está antes do ícone
            let inputDaSenha = this.parentElement.previousElementSibling;
            
            // Caso não encontre ou não seja um input, tenta outra estratégia
            if (!inputDaSenha || inputDaSenha.tagName !== 'INPUT') {

                // Sobe um nível no DOM e procura qualquer input dentro da div
                const divAgrupadora = this.parentElement.parentElement; 
                inputDaSenha = divAgrupadora.querySelector('input');
            }

            // Se encontrou o input de senha
            if (inputDaSenha) {

                // Se o tipo for password (senha escondida)
                if (inputDaSenha.type === 'password') {

                    // Troca para texto (mostra a senha)
                    inputDaSenha.type = 'text';

                    // Troca o ícone visual
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');

                    // Muda a cor do ícone
                    this.style.color = 'var(--amarelo)';

                } else {

                    // Volta para password (esconde a senha)
                    inputDaSenha.type = 'password';

                    // Troca o ícone de volta
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');

                    // Cor padrão
                    this.style.color = 'var(--cinza-claro)';
                }

            } else {

                // Caso não encontre o input, mostra erro no console (debug)
                console.error('JS: Achei o clique no olho, mas não achei o campo de input perto dele! Verifique seu HTML.');
            }
        });
    });

    // --- 2. VALIDAÇÃO DE SENHAS IGUAIS ---

    // Seleciona o formulário da página
    const form = document.querySelector('form');
    
    if (form) {

        // Adiciona event listener para submit do formulário
        form.addEventListener('submit', function(e) {
            
            // Pega todos os inputs e filtra os relacionados a senha
            const inputs = Array.from(document.querySelectorAll('input')).filter(
                input => input.type === 'password' || input.parentElement.querySelector('.fa-eye, .fa-eye-slash')
            );

            // Se houver pelo menos dois campos de senha
            if (inputs.length >= 2) {

                const senha1 = inputs[0].value;
                const senha2 = inputs[1].value;

                // Se as senhas forem diferentes
                if (senha1 !== senha2) {

                    e.preventDefault(); // Cancela o submit
                    alert("As senhas não coincidem. Digite novamente."); // Alerta simples

                    // Destaca o segundo campo com borda vermelha
                    inputs[1].style.borderColor = '#ff4757';
                    return;
                }
            }

            // Se passou na validação, inicia feedback visual
            e.preventDefault(); 

            const btnSubmit = document.getElementById('submitBtn');

            if (btnSubmit) {
                btnSubmit.style.opacity = "0.7"; // Diminui opacidade
                btnSubmit.textContent = "Processando..."; // Feedback de loading
            }

            // Simula processamento antes de mostrar sucesso
            setTimeout(() => {

                // Esconde o formulário
                form.style.display = 'none'; 

                // Mostra a mensagem de sucesso
                const successMessage = document.getElementById('successMessage');

                if (successMessage) {
                    successMessage.style.display = 'flex'; 
                }

            }, 1000);
        });
    }

    // --- 3. MÁSCARAS DE INPUT ---

    // Seleciona campo de CPF
    const cpfInput = document.querySelector('input[name="cpf"], #cpf');

    // Seleciona campo de telefone
    const telefoneInput = document.querySelector('input[name="telefone"], #telefone');

    // Máscara de CPF
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {

            // Remove tudo que não for número
            let value = e.target.value.replace(/\D/g, ''); 

            // Limita a 11 dígitos
            if (value.length > 11) value = value.slice(0, 11);

            // Aplica formatação ###.###.###
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');

            // Aplica hífen final
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

            // Atualiza o valor no input
            e.target.value = value;
        });
    }

    // Máscara de telefone
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {

            // Remove tudo que não for número
            let value = e.target.value.replace(/\D/g, '');

            // Limita a 11 dígitos
            if (value.length > 11) value = value.slice(0, 11);

            // Aplica DDD (xx)
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');

            // Aplica hífen final
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');

            e.target.value = value;
        });
    }
});

// --- 5. BOTÃO "CONTINUAR" (FORA DO DOMContentLoaded ⚠️) ---

// Seleciona o botão de continuar
const continueBtn = document.getElementById('continueBtn');

if (continueBtn) {

    // Adiciona evento de click
    continueBtn.addEventListener('click', function() {

        // Feedback visual imediato (loading)
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';

        this.style.opacity = '0.8';
        this.style.pointerEvents = 'none'; // Evita múltiplos cliques
        
        // Aguarda um tempo antes de redirecionar
        setTimeout(() => {

            // Redireciona para login
            window.location.href = 'login.html'; 

        }, 800);
    });
}