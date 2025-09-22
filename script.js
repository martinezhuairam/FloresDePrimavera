// Configuración de flores y efectos
const flowers = ['🌷', '🌹', '🌻', '🌸', '🌼', '🌺', '🌿', '💐', '🌾', '🌱'];
const romanticMessages = [
    "Eres la primavera de mi vida",
    "Mi amor florece como estas flores",
    "Eres más hermosa que cualquier jardín",
    "Mi corazón es tu jardín",
    "Cada día contigo es primavera",
    "Eres mi flor más preciada",
    "Mi amor crece como las flores",
    "Eres la luz de mi primavera"
];

// Variables globales
let particleCount = 0;
let floatingFlowerCount = 0;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeFlowerCards();
    initializeLoveButton();
    initializeFloatingFlowers();
    initializeScrollEffects();
    initializeCentralFlower();
});

// Crear partículas de fondo
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Tamaño aleatorio
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Animación aleatoria
    const duration = Math.random() * 10 + 5;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(particle);
}

// Inicializar tarjetas de flores
function initializeFlowerCards() {
    const flowerCards = document.querySelectorAll('.flower-card');
    
    flowerCards.forEach((card, index) => {
        // Animación escalonada
        card.style.animationDelay = (index * 0.1) + 's';
        
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            createHeartEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efecto de click
        card.addEventListener('click', function() {
            createFlowerBurst(this);
            showRomanticMessage();
        });
    });
}

// Crear efecto de corazones
function createHeartEffect(element) {
    const rect = element.getBoundingClientRect();
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    heart.style.left = (rect.left + rect.width / 2) + 'px';
    heart.style.top = (rect.top + rect.height / 2) + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Crear explosión de flores
function createFlowerBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const flower = document.createElement('div');
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.position = 'fixed';
        flower.style.left = centerX + 'px';
        flower.style.top = centerY + 'px';
        flower.style.fontSize = '2rem';
        flower.style.pointerEvents = 'none';
        flower.style.zIndex = '1000';
        
        document.body.appendChild(flower);
        
        // Animación de explosión
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        flower.animate([
            { 
                transform: 'translate(0, 0) scale(1) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0.5) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            flower.remove();
        };
    }
}

// Mostrar mensaje romántico aleatorio
function showRomanticMessage() {
    const message = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
    
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-family: 'Dancing Script', cursive;
        font-size: 1.3rem;
        color: #d63384;
        font-weight: 600;
        animation: fadeInDown 0.5s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOutUp 0.5s ease-in forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Inicializar botón de amor
function initializeLoveButton() {
    const loveButton = document.getElementById('loveButton');
    let clickCount = 0;
    
    loveButton.addEventListener('click', function() {
        clickCount++;
        
        // Efecto de pulsación
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Crear más flores flotantes
        createFloatingFlowers(5);
        
        // Cambiar mensaje del botón
        const messages = [
            '💕 Toca para más flores 💕',
            '🌸 ¡Más flores para ti! 🌸',
            '🌺 Eres mi jardín favorito 🌺',
            '🌻 Mi amor florece contigo 🌻',
            '🌷 Eres mi primavera eterna 🌷'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.querySelector('.button-text').textContent = randomMessage;
        
        // Efecto especial cada 5 clicks
        if (clickCount % 5 === 0) {
            createHeartRain();
        }
    });
}

// Crear lluvia de corazones
function createHeartRain() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}%;
                font-size: 2rem;
                pointer-events: none;
                z-index: 1000;
                animation: heartFall 3s linear forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}

// Inicializar flores flotantes
function initializeFloatingFlowers() {
    setInterval(createFloatingFlowers, 3000);
}

function createFloatingFlowers(count = 1) {
    const container = document.getElementById('floatingFlowers');
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'floating-flower';
            flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = Math.random() * 100 + '%';
            flower.style.animationDelay = Math.random() * 2 + 's';
            flower.style.animationDuration = (Math.random() * 5 + 5) + 's';
            
            container.appendChild(flower);
            
            setTimeout(() => {
                if (flower.parentNode) {
                    flower.remove();
                }
            }, 10000);
        }, i * 200);
    }
}

// Efectos de scroll
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.particles');
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Efectos de teclado
document.addEventListener('keydown', function(e) {
    // Espacio para crear flores
    if (e.code === 'Space') {
        e.preventDefault();
        createFloatingFlowers(3);
    }
    
    // Enter para mensaje especial
    if (e.code === 'Enter') {
        showRomanticMessage();
    }
});

// Efectos táctiles para móviles
let touchStartY = 0;
let touchStartX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchStartY - touchEndY;
    const deltaX = touchStartX - touchEndX;
    
    // Swipe hacia arriba
    if (deltaY > 50 && Math.abs(deltaX) < 100) {
        createFloatingFlowers(2);
    }
    
    // Swipe hacia abajo
    if (deltaY < -50 && Math.abs(deltaX) < 100) {
        createHeartRain();
    }
});

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFall {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Mensaje de bienvenida
setTimeout(() => {
    showRomanticMessage();
}, 2000);

// Inicializar flor central
function initializeCentralFlower() {
    const centralFlower = document.getElementById('centralFlower');
    let isPressed = false;
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };
    
    // Función para activar la explosión
    function triggerExplosion() {
        if (!isPressed) {
            isPressed = true;
            createFlowerExplosion();
            
            // Efecto visual de pulsación
            centralFlower.style.animation = 'none';
            centralFlower.style.transform = 'translate(-50%, -50%) scale(0.8)';
            
            setTimeout(() => {
                centralFlower.style.animation = 'centralFlowerPulse 3s ease-in-out infinite';
                centralFlower.style.transform = 'translate(-50%, -50%) scale(1)';
                isPressed = false;
            }, 300);
        }
    }
    
    // Evento de click para desktop
    centralFlower.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        triggerExplosion();
    });
    
    // Eventos táctiles optimizados para móvil
    centralFlower.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        touchStartTime = Date.now();
        touchStartPos.x = e.touches[0].clientX;
        touchStartPos.y = e.touches[0].clientY;
        
        // Efecto visual inmediato
        this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        this.style.transition = 'transform 0.1s ease';
        
        // Crear indicador visual de toque
        createTouchIndicator(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    
    centralFlower.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const touchDuration = Date.now() - touchStartTime;
        const touchEndPos = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };
        
        // Calcular distancia del toque
        const distance = Math.sqrt(
            Math.pow(touchEndPos.x - touchStartPos.x, 2) + 
            Math.pow(touchEndPos.y - touchStartPos.y, 2)
        );
        
        // Si el toque fue corto y no se movió mucho, activar explosión
        if (touchDuration < 500 && distance < 50) {
            triggerExplosion();
        }
        
        // Restaurar tamaño normal
        this.style.transform = 'translate(-50%, -50%) scale(1)';
        this.style.transition = 'transform 0.3s ease';
    }, { passive: false });
    
    // Prevenir zoom en doble toque
    centralFlower.addEventListener('touchend', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Efecto hover para desktop (solo si no es táctil)
    let isTouchDevice = false;
    centralFlower.addEventListener('touchstart', function() {
        isTouchDevice = true;
    });
    
    if (!isTouchDevice) {
        centralFlower.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.15)';
            createGoldenSparkles(this);
        });
        
        centralFlower.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
    
    // Agregar indicador visual de que es clickeable
    centralFlower.style.cursor = 'pointer';
    centralFlower.style.userSelect = 'none';
    centralFlower.style.webkitUserSelect = 'none';
    centralFlower.style.webkitTapHighlightColor = 'transparent';
}

// Crear explosión masiva de flores
function createFlowerExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Crear múltiples ondas de flores
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            createFlowerWave(centerX, centerY, wave);
        }, wave * 200);
    }
    
    // Efecto de ondas concéntricas
    createConcentricWaves(centerX, centerY);
    
    // Mensaje especial
    showSpecialMessage();
}

// Crear onda de flores
function createFlowerWave(centerX, centerY, waveNumber) {
    const flowerCount = 12 + (waveNumber * 4);
    const radius = 50 + (waveNumber * 30);
    
    for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('div');
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 2.5rem;
            pointer-events: none;
            z-index: 1000;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(flower);
        
        // Cálculo de posición final
        const angle = (i / flowerCount) * Math.PI * 2;
        const endX = centerX + Math.cos(angle) * radius;
        const endY = centerY + Math.sin(angle) * radius;
        
        // Animación de explosión
        flower.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0.5) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - centerX - 20}px, ${endY - centerY - 20}px) scale(1.2) rotate(720deg)`,
                opacity: 0.8
            },
            { 
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0.8) rotate(1080deg)`,
                opacity: 0
            }
        ], {
            duration: 2000 + (waveNumber * 500),
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            flower.remove();
        };
    }
}

// Crear ondas concéntricas
function createConcentricWaves(centerX, centerY) {
    for (let ring = 0; ring < 3; ring++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 0;
                height: 0;
                border: 3px solid rgba(255, 215, 0, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(wave);
            
            wave.animate([
                { 
                    width: '0px',
                    height: '0px',
                    opacity: 1
                },
                { 
                    width: '200px',
                    height: '200px',
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                wave.remove();
            };
        }, ring * 300);
    }
}

// Crear indicador visual de toque
function createTouchIndicator(x, y) {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 60px;
        height: 60px;
        border: 3px solid rgba(255, 215, 0, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1002;
        transform: translate(-50%, -50%);
        animation: touchRipple 0.6s ease-out;
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.remove();
    }, 600);
}

// Crear chispas doradas
function createGoldenSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1001;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(sparkle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 60;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        sparkle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - centerX - 10}px, ${endY - centerY - 10}px) scale(1) rotate(180deg)`,
                opacity: 0
            }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

// Mostrar mensaje especial
function showSpecialMessage() {
    const specialMessages = [
        "¡Eres mi sol radiante! ☀️",
        "Brillas más que el oro ✨",
        "Mi amor florece como el girasol 🌻",
        "Eres la luz de mi vida 💛",
        "Como el sol, iluminas mi mundo ☀️"
    ];
    
    const message = specialMessages[Math.floor(Math.random() * specialMessages.length)];
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        color: #8b4513;
        padding: 20px 30px;
        border-radius: 30px;
        box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4);
        z-index: 1000;
        font-family: 'Dancing Script', cursive;
        font-size: 1.8rem;
        font-weight: 700;
        text-align: center;
        animation: specialMessageAppear 0.8s ease-out;
        border: 3px solid #ffed4e;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'specialMessageDisappear 0.5s ease-in forwards';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Efecto de carga inicial
window.addEventListener('load', function() {
    document.body.classList.add('fade-in');
    
    // Crear flores iniciales
    setTimeout(() => {
        createFloatingFlowers(3);
    }, 1000);
});
