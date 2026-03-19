/* =========================================
   MAIN.JS - Scripts Globais LDL Fitness
   ========================================= */

// Garante que o código só execute após o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOG DE INICIALIZAÇÃO (DEBUG) ---

    // Exibe uma mensagem no console para confirmar que o script carregou
    console.log("Matilha LDL Fitness: Sistema carregado com sucesso! 🐺");


    // --- 2. SMOOTH SCROLL (ROLAGEM SUAVE PARA ÂNCORAS) ---

    // Seleciona todos os links internos (href começando com "#")
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    
    // Percorre cada link
    linksInternos.forEach(link => {

        // Adiciona event listener de click
        link.addEventListener('click', function(e) {

            // Pega o valor do href (#id)
            const targetId = this.getAttribute('href');
            
            // Ignora links vazios (#)
            if (targetId === '#') return; 
            
            // Seleciona o elemento alvo no DOM
            const targetElement = document.querySelector(targetId);
            
            // Se o elemento existir
            if (targetElement) {

                e.preventDefault(); // Evita o comportamento padrão (pulo brusco)
                
                // Executa rolagem suave até o elemento
                targetElement.scrollIntoView({
                    behavior: 'smooth', // animação suave
                    block: 'start'      // alinha no topo
                });
            }
        });
    });


    // --- 3. HEADER SHADOW ON SCROLL ---

    // Seleciona o elemento <header>
    const header = document.querySelector('header');

    if (header) {

        // Adiciona event listener de scroll na janela
        window.addEventListener('scroll', () => {

            // Se o scroll vertical for maior que 50px
            if (window.scrollY > 50) {

                // Aplica uma sombra no header
                header.style.boxShadow = '0 4px 20px rgba(252, 232, 3, 0.1)';

            } else {

                // Remove a sombra quando volta ao topo
                header.style.boxShadow = 'none';
            }
        });
    }

});