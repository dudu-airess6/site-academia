/* =========================================
   LOGIN.JS - Scripts da página de Login
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Funcionalidade de Mostrar/Ocultar Senha
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            // Verifica o tipo atual do input de senha
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            
            // Troca o tipo (de password para text ou vice-versa)
            passwordInput.setAttribute('type', type);
            
            // Troca o ícone (olho aberto / olho cortado)
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
            
            // Efeito visual no ícone para mostrar que foi clicado
            this.style.color = type === 'text' ? 'var(--amarelo)' : 'var(--cinza-claro)';
        });
    }

    // 2. Validação simples antes de "Entrar"
    const loginBtn = document.querySelector('.login-btn');
    const emailInput = document.querySelector('#email');

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            // Se o e-mail ou a senha estiverem vazios...
            if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
                e.preventDefault(); // Impede de ir para o painel do aluno
                
                // Alerta nativo do navegador (pode ser substituído por um modal no futuro)
                alert('Foco na missão! Preencha seu e-mail e senha para acessar o treino.');
                
                // Dá um destaque visual rápido nos campos vazios
                if (emailInput.value.trim() === '') emailInput.style.borderColor = '#ff4757';
                if (passwordInput.value.trim() === '') passwordInput.style.borderColor = '#ff4757';
                
                setTimeout(() => {
                    emailInput.style.borderColor = '#333';
                    passwordInput.style.borderColor = '#333';
                }, 2000);
            }
        });
    }
});