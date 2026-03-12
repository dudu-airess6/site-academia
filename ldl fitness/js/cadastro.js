/* =========================================
   CADASTRO.JS - Lógica de Matrícula LDL
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DO OLHINHO (UNIVERSAL) ---
    // Pega todos os ícones de olho, não importa a classe da div ao redor
    const iconesDeOlho = document.querySelectorAll('.fa-eye, .fa-eye-slash');

    iconesDeOlho.forEach(icone => {
        icone.addEventListener('click', function () {
            
            // Vamos procurar o input de senha em volta do ícone
            // Tenta pegar o elemento que está colado antes da div do ícone
            let inputDaSenha = this.parentElement.previousElementSibling;
            
            // Se não achar (ou se o HTML for diferente), sobe um nível e procura qualquer input lá dentro
            if (!inputDaSenha || inputDaSenha.tagName !== 'INPUT') {
                const divAgrupadora = this.parentElement.parentElement; 
                inputDaSenha = divAgrupadora.querySelector('input');
            }

            // Se finalmente achou o input, faz a mágica!
            if (inputDaSenha) {
                if (inputDaSenha.type === 'password') {
                    inputDaSenha.type = 'text'; // Mostra a senha
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                    this.style.color = 'var(--amarelo)';
                } else {
                    inputDaSenha.type = 'password'; // Esconde a senha
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                    this.style.color = 'var(--cinza-claro)';
                }
            } else {
                // Se não achou o input, avisa no console para ajudar a debugar
                console.error('JS: Achei o clique no olho, mas não achei o campo de input perto dele! Verifique seu HTML.');
            }
        });
    });

    // --- 2. VALIDAÇÃO DE SENHAS IGUAIS ---
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            
            // Procura todos os inputs de senha no formulário
            // Nota: pegamos pelo nome/tipo para não depender de classes
            const inputs = Array.from(document.querySelectorAll('input')).filter(
                input => input.type === 'password' || input.parentElement.querySelector('.fa-eye, .fa-eye-slash')
            );

            // Se achou os dois campos de senha
            if (inputs.length >= 2) {
                const senha1 = inputs[0].value;
                const senha2 = inputs[1].value;

                if (senha1 !== senha2) {
                    e.preventDefault(); // Trava o cadastro
                    alert("As senhas não coincidem. Digite novamente."); // Alerta simples e direto
                    inputs[1].style.borderColor = '#ff4757'; // Pinta a borda de vermelho
                    return;
                }
            }

            // Se passou, faz a animação de sucesso
            e.preventDefault(); 
            const btnSubmit = document.getElementById('submitBtn');
            if (btnSubmit) {
                btnSubmit.style.opacity = "0.7";
                btnSubmit.textContent = "Processando...";
            }

            setTimeout(() => {
                form.style.display = 'none'; 
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'flex'; 
                }
            }, 1000);
        });
    }

    // --- 3. MÁSCARAS DE INPUT ---
    const cpfInput = document.querySelector('input[name="cpf"], #cpf');
    const telefoneInput = document.querySelector('input[name="telefone"], #telefone');

    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); 
            if (value.length > 11) value = value.slice(0, 11);
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }

    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        });
    }
});
// --- 5. Botão "Continuar" da tela de sucesso ---
    const continueBtn = document.getElementById('continueBtn');
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            // Efeito visual interativo imediato
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
            this.style.opacity = '0.8';
            this.style.pointerEvents = 'none'; // Impede duplo clique
            
            // Aguarda menos de 1 segundo para dar tempo do usuário ver a animação e redireciona
            setTimeout(() => {
                window.location.href = 'login.html'; 
            }, 800);
        });
    }