const navbar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');
const loadingOverlay = document.getElementById('loadingOverlay');
const backToTopBtn = document.getElementById('backToTopBtn');
const rulesBtn = document.getElementById('rulesBtn');
const sections = document.querySelectorAll('section');

// Função para mostrar/esconder loading
function showLoading() {
    loadingOverlay.classList.add('show');
}

function hideLoading() {
    loadingOverlay.classList.remove('show');
}

// Função para scroll suave com loading
function smoothScrollToSection(targetId) {
    showLoading();
    
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        // Simula um pequeno delay para o efeito visual
        setTimeout(() => {
            // Implementa scroll mais lento usando requestAnimationFrame
            const targetPosition = targetSection.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 2000; // 2 segundos para scroll mais lento
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            // Função de easing para scroll mais suave
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
            
            // Esconde o loading após o scroll
            setTimeout(() => {
                hideLoading();
            }, 2200); // Aumentado para dar tempo do scroll completar
        }, 300);
    } else {
        hideLoading();
    }
}

// Adiciona event listeners aos links da navbar
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollToSection(targetId);
        });
    });

    // Event listener para o botão das regras
    rulesBtn.addEventListener('click', () => {
        smoothScrollToSection('#role');
    });

    // Event listener para o botão voltar ao topo
    backToTopBtn.addEventListener('click', () => {
        showLoading();
        
        setTimeout(() => {
            // Scroll suave para o topo
            const startPosition = window.pageYOffset;
            const distance = -startPosition;
            const duration = 1500; // 1.5 segundos
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
            
            setTimeout(() => {
                hideLoading();
            }, 1700);
        }, 300);
    });
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calcula a opacidade baseada no scroll
    // Começa a escurecer logo no início e atinge o máximo no final da primeira section
    const maxScroll = windowHeight * 1.5; // Ajuste este valor para controlar a velocidade
    let opacity = Math.min(scrollPosition / maxScroll, 0.6); // máximo de 0.6 de escurecimento

    // Aplica o escurecimento gradual
    overlay.style.background = `rgba(0, 0, 0, ${opacity})`;

    // Muda a cor do texto da navbar gradualmente
    if (opacity > 0.3) {
        navbar.classList.remove('light-nav');
        navbar.classList.add('dark-nav');
    } else {
        navbar.classList.remove('dark-nav');
        navbar.classList.add('light-nav');
    }

    // Mostra/esconde o botão voltar ao topo
    if (scrollPosition > windowHeight * 0.5) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Função que escolhe o background randomicamente ao carregar a página

const backgrounds = [
    '/assets/img/nobi-nobi-fundo-00.png',
    '/assets/img/nobi-nobi-fundo-01.png'
];

const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

document.body.style.backgroundImage = `url('${randomBg}')`;