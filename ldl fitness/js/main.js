/* =========================================
   MAIN.JS - Scripts Globais LDL Fitness
   ========================================= */

// Garante que o código só rode depois que a página HTML carregar inteira
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mensagem de teste para desenvolvedor
    console.log("Matilha LDL Fitness: Sistema carregado com sucesso! 🐺");

    // 2. Rolagem suave para links internos (Menu da página inicial)
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    
    linksInternos.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignora se o link for apenas "#"
            if(targetId === '#') return; 
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                e.preventDefault(); // Impede o pulo brusco padrão do HTML
                
                // Faz a tela deslizar suavemente até a sessão
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Efeito de sombra no header ao rolar a página para baixo
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(252, 232, 3, 0.1)'; // Sombra amarela sutil
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

});