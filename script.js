// Variables del DOM - Página 1
const emailInput = document.getElementById('emailInput');
const enterButton = document.getElementById('enterButton');
const messageContainer = document.getElementById('messageContainer');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');

// Variables del DOM - Página 2 (LILY)
const lilyImage = document.getElementById('lilyImage');
const lilyStars = document.getElementById('lilyStars');
const buyButton = document.getElementById('buyButton');
const successMessage = document.getElementById('successMessage');

// Variables del DOM - Página 2 (PAYASO SORPRESA)
const surpriseImage = document.getElementById('surpriseImage');
const surpriseStars = document.getElementById('surpriseStars');
const buyButtonSurprise = document.getElementById('buyButtonSurprise');
const successMessageSurprise = document.getElementById('successMessageSurprise');

// Sonido de error (usando Web Audio API)
function playErrorSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 150;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Sonido al tocar
function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Sonido de éxito
function playSuccessSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// ========== PÁGINA 1: SLOPDER WEB ==========

// Mostrar el botón cuando hay texto
emailInput.addEventListener('input', (e) => {
    const email = e.target.value.trim();
    
    if (email.length > 0) {
        // Cambiar texto del botón si es el email especial
        if (email === "Hi i'm Elian") {
            enterButton.textContent = 'ENTRAR A CUENTA ADMINISTRADA';
        } else {
            enterButton.textContent = 'ENTRAR AHORA';
        }
        
        enterButton.style.display = 'block';
        // Efecto de aparición
        enterButton.style.animation = 'none';
        setTimeout(() => {
            enterButton.style.animation = 'buttonGlow 1.5s ease-in-out infinite';
        }, 10);
    } else {
        enterButton.style.display = 'none';
    }
});

// Mensajes terroríficos personalizados
const terrorMessages = [
    "Acceso confirmado...",
    "Iniciando verificación de identidad...",
    "Conectando con el servidor central...",
    "Tu información ha sido registrada",
    "Esperando instrucciones...",
    "⚠️ ADVERTENCIA: Sistema comprometido",
    "Los payasos te están esperando...",
    "No intentes desconectarte...",
    "Ya sabemos dónde estás",
    "El acceso es irreversible"
];

// Mensajes para cuenta administrada
const adminMessages = [
    "Acceso de administrador detectado...",
    "Verificando credenciales...",
    "Conexión a servidor de control...",
    "Desbloqueando funciones administrativas...",
    "Panel de control cargando...",
    "⚠️ ACCESO ADMINISTRATIVO OTORGADO ⚠️",
    "Entrando a la cuenta...",
    "Iniciando sesión como JEFE...",
    "Los payasos responden a tus órdenes...",
    "Panel administrativo listo"
];

// Función para mostrar mensajes con efecto de escritura
function typeMessage(message, speed = 50) {
    return new Promise((resolve) => {
        let index = 0;
        const messageDiv = document.createElement('div');
        messageDiv.style.marginBottom = '10px';
        messageContainer.appendChild(messageDiv);
        
        function type() {
            if (index < message.length) {
                messageDiv.textContent += message[index];
                index++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Cambiar a página 2
function showClownsPage() {
    page1.style.display = 'none';
    page2.style.display = 'flex';
}

// Cambiar a página 3 (Panel administrativo)
function showAdminPanel() {
    page1.style.display = 'none';
    page3.style.display = 'flex';
}

// Evento del botón ENTRAR
enterButton.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    
    if (email.length === 0) return;
    
    // Desabilitar input y botón
    emailInput.disabled = true;
    enterButton.disabled = true;
    enterButton.style.opacity = '0.6';
    
    // Mostrar contenedor de mensajes
    messageContainer.style.display = 'block';
    messageContainer.textContent = '';
    
    // Reproducir sonido
    playErrorSound();
    
    // Agregar el email
    await typeMessage(`📧 Email registrado: ${email}\n`, 30);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verificar si es el email especial
    const isAdmin = email === "Hi i'm Elian";
    const messages = isAdmin ? adminMessages : terrorMessages;
    
    // Mostrar mensajes
    for (const message of messages) {
        playErrorSound();
        await typeMessage(`> ${message}\n`, 40);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Mensaje final
    await new Promise(resolve => setTimeout(resolve, 1000));
    playErrorSound();
    
    if (isAdmin) {
        await typeMessage(`\n✓ CONECTADO AL PANEL ADMINISTRATIVO ✓\n`, 60);
        await typeMessage(`Acceso total al sistema de payasos...\n`, 50);
    } else {
        await typeMessage(`\n⚠️ CONEXIÓN ESTABLECIDA ⚠️\n`, 60);
        await typeMessage(`Los payasos te han aceptado en su red...\n`, 50);
    }
    
    // Esperar y cambiar a página correspondiente
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (isAdmin) {
        showAdminPanel();
    } else {
        showClownsPage();
    }
});

// Permitir ENTER para enviar
emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && emailInput.value.trim().length > 0) {
        enterButton.click();
    }
});

// Efecto de pantalla glitchy ocasional
setInterval(() => {
    if (Math.random() > 0.95) {
        document.body.style.filter = 'contrast(1.5) brightness(1.2)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 100);
    }
}, 2000);

// ========== PÁGINA 2: PAYASOS ==========

// Variables de estado para LILY
let lilyClicked = false;
let lilyBought = false;

// Variables de estado para PAYASO SORPRESA
let surpriseClicked = false;
let surpriseBought = false;

// ========== LILY ==========

// Evento cuando tocas la imagen de Lily
lilyImage.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!lilyClicked) {
        lilyClicked = true;
        
        // Reproducir sonido
        playClickSound();
        
        // Mostrar estrellas
        lilyStars.style.display = 'flex';
        
        // Animar la imagen
        lilyImage.style.animation = 'imageShake 0.5s ease-in-out';
        
        // Después de 2 segundos, permitir hacer click de nuevo
        setTimeout(() => {
            lilyClicked = false;
        }, 2000);
    }
});

// Evento del botón COMPRAR de Lily
buyButton.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!lilyBought) {
        lilyBought = true;
        
        // Reproducir sonido de éxito
        playSuccessSound();
        
        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';
        
        // Desabilitar botón
        buyButton.disabled = true;
        buyButton.style.opacity = '0.6';
        buyButton.textContent = 'COMPRADO';
        
        // Mostrar estrellas automáticamente
        lilyStars.style.display = 'flex';
    }
});

// ========== PAYASO SORPRESA ==========

// Evento cuando tocas la imagen del Payaso Sorpresa
surpriseImage.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!surpriseClicked) {
        surpriseClicked = true;
        
        // Reproducir sonido
        playClickSound();
        
        // Mostrar estrellas
        surpriseStars.style.display = 'flex';
        
        // Animar la imagen
        surpriseImage.style.animation = 'imageShake 0.5s ease-in-out';
        
        // Después de 2 segundos, permitir hacer click de nuevo
        setTimeout(() => {
            surpriseClicked = false;
        }, 2000);
    }
});

// Evento del botón COMPRAR del Payaso Sorpresa
buyButtonSurprise.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!surpriseBought) {
        surpriseBought = true;
        
        // Reproducir sonido de éxito
        playSuccessSound();
        
        // Mostrar mensaje de éxito
        successMessageSurprise.style.display = 'block';
        
        // Desabilitar botón
        buyButtonSurprise.disabled = true;
        buyButtonSurprise.style.opacity = '0.6';
        buyButtonSurprise.textContent = 'COMPRADO';
        
        // Mostrar estrellas automáticamente
        surpriseStars.style.display = 'flex';
    }
});

// ========== PÁGINA 3: PANEL ADMINISTRATIVO ==========

// Animaciones épicas
const epicAnimations = {
    explosion: function() {
        createExplosion();
    },
    matrix: function() {
        createMatrixRain();
    },
    fire: function() {
        createFireEffect();
    },
    psycho: function() {
        createPsychoEffect();
    },
    glitch: function() {
        createGlitchEffect();
    },
    earthquake: function() {
        createEarthquakeEffect();
    }
};

// EXPLOSIÓN
function createExplosion() {
    playSuccessSound();
    const explosions = [];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '30px';
        particle.style.height = '30px';
        particle.style.background = ['#ff0000', '#ff6600', '#ffff00', '#ffffff'][Math.floor(Math.random() * 4)];
        particle.style.left = window.innerWidth / 2 + 'px';
        particle.style.top = window.innerHeight / 2 + 'px';
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '999';
        particle.style.boxShadow = '0 0 20px currentColor';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 5 + Math.random() * 5;
        
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = 1 - (Date.now() % 1000) / 1000;
            
            if ((Date.now() % 1000) < 1000) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
    
    // Efecto de pantalla
    document.body.style.filter = 'brightness(2)';
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 500);
}

// LLUVIA MATRIX
function createMatrixRain() {
    playClickSound();
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '998';
    canvas.style.pointerEvents = 'none';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const chars = '01ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ'.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            drops[i]++;
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }
        }
    }
    
    const interval = setInterval(draw, 50);
    
    setTimeout(() => {
        clearInterval(interval);
        canvas.remove();
    }, 5000);
}

// FUEGO ABRASADOR
function createFireEffect() {
    playErrorSound();
    document.body.style.animation = 'fireFlame 3s ease-out';
    
    for (let i = 0; i < 30; i++) {
        const fire = document.createElement('div');
        fire.style.position = 'fixed';
        fire.style.width = Math.random() * 100 + 50 + 'px';
        fire.style.height = Math.random() * 150 + 100 + 'px';
        fire.style.background = 'radial-gradient(circle, #ffff00, #ff6600, #ff0000)';
        fire.style.left = Math.random() * window.innerWidth + 'px';
        fire.style.top = -50 + 'px';
        fire.style.zIndex = '999';
        fire.style.borderRadius = '50%';
        fire.style.filter = 'blur(10px)';
        fire.style.opacity = '0.6';
        
        document.body.appendChild(fire);
        
        const duration = Math.random() * 2 + 2;
        fire.style.animation = `fireFloat ${duration}s ease-out forwards`;
        
        setTimeout(() => fire.remove(), duration * 1000);
    }
}

// PSICÓDELICO
function createPsychoEffect() {
    playClickSound();
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00', '#0000ff'];
    let colorIndex = 0;
    
    const interval = setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        document.body.style.filter = `hue-rotate(${colorIndex * 60}deg)`;
        colorIndex = (colorIndex + 1) % colors.length;
    }, 100);
    
    setTimeout(() => {
        clearInterval(interval);
        document.body.style.backgroundColor = '#000';
        document.body.style.filter = 'none';
    }, 3000);
}

// GLITCH EXTREMO
function createGlitchEffect() {
    playErrorSound();
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            document.body.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        }, i * 50);
    }
    
    setTimeout(() => {
        document.body.style.transform = 'translate(0)';
        document.body.style.filter = 'none';
    }, 1000);
}

// TERREMOTO
function createEarthquakeEffect() {
    playErrorSound();
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const x = Math.random() * 20 - 10;
            const y = Math.random() * 20 - 10;
            document.body.style.transform = `translate(${x}px, ${y}px)`;
        }, i * 50);
    }
    
    setTimeout(() => {
        document.body.style.transform = 'translate(0)';
    }, 750);
}

// Event listeners para botones de animación
document.querySelectorAll('.animation-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const animation = e.target.getAttribute('data-animation');
        if (epicAnimations[animation]) {
            epicAnimations[animation]();
        }
    });
});

// Agregar animaciones a CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes imageShake {
        0%, 100% { transform: translate(0); }
        25% { transform: translate(-5px, -5px); }
        50% { transform: translate(5px, 5px); }
        75% { transform: translate(-5px, 5px); }
    }
    
    @keyframes fireFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-${window.innerHeight}px) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes fireFlame {
        0% {
            filter: brightness(1);
        }
        50% {
            filter: brightness(1.5);
        }
        100% {
            filter: brightness(1);
        }
    }
`;
document.head.appendChild(style);
