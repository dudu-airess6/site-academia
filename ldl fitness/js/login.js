/* =========================================
   LOGIN.JS - Scripts da página de Login
   ========================================= */

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TOGGLE PASSWORD (mostrar/ocultar senha) ---

    // Seleciona o ícone de toggle (olhinho)
    const togglePassword = document.querySelector('#togglePassword');

    // Seleciona o input de senha
    const passwordInput = document.querySelector('#password');

    // Verifica se ambos existem no DOM
    if (togglePassword && passwordInput) {

        // Adiciona event listener de click no ícone
        togglePassword.addEventListener('click', function () {

            // Verifica o tipo atual do input e define o próximo tipo
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            
            // Atualiza o atributo "type" do input
            passwordInput.setAttribute('type', type);
            
            // Alterna as classes do ícone (eye / eye-slash)
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
            
            // Aplica feedback visual (cor diferente quando visível)
            this.style.color = type === 'text' ? 'var(--amarelo)' : 'var(--cinza-claro)';
        });
    }

    // --- 2. VALIDAÇÃO SIMPLES DO LOGIN ---

    // Seleciona o botão de login
    const loginBtn = document.querySelector('.login-btn');

    // Seleciona o input de email
    const emailInput = document.querySelector('#email');

    if (loginBtn) {

        // Adiciona event listener de click no botão
        loginBtn.addEventListener('click', function(e) {

            // Verifica se email ou senha estão vazios
            if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {

                e.preventDefault(); // Impede ação padrão (ex: submit ou redirect)
                
                // Exibe alerta simples
                alert('Foco na missão! Preencha seu e-mail e senha para acessar o treino.');
                
                // Destaca campos vazios com borda vermelha
                if (emailInput.value.trim() === '') emailInput.style.borderColor = '#ff4757';
                if (passwordInput.value.trim() === '') passwordInput.style.borderColor = '#ff4757';
                
                // Após 2 segundos, volta a cor original
                setTimeout(() => {
                    emailInput.style.borderColor = '#333';
                    passwordInput.style.borderColor = '#333';
                }, 2000);
            }
        });
    }
});