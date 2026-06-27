// Variables del DOM - Página 1
const emailInput = document.getElementById('emailInput');
const enterButton = document.getElementById('enterButton');
const messageContainer = document.getElementById('messageContainer');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

// Variables del DOM - Página 2
const lilyImage = document.getElementById('lilyImage');
const lilyStars = document.getElementById('lilyStars');

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

// ========== PÁGINA 1: SLOPDER WEB ==========

// Mostrar el botón cuando hay texto
emailInput.addEventListener('input', (e) => {
    if (e.target.value.trim().length > 0) {
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
    
    // Mostrar mensajes terroríficos
    for (const message of terrorMessages) {
        playErrorSound();
        await typeMessage(`> ${message}\n`, 40);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Mensaje final
    await new Promise(resolve => setTimeout(resolve, 1000));
    playErrorSound();
    await typeMessage(`\n⚠️ CONEXIÓN ESTABLECIDA ⚠️\n`, 60);
    await typeMessage(`Los payasos te han aceptado en su red...\n`, 50);
    
    // Esperar un segundo y cambiar a página de payasos
    await new Promise(resolve => setTimeout(resolve, 2000));
    showClownsPage();
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

let lilyClicked = false;

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

// Agregar la animación de shake a CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes imageShake {
        0%, 100% { transform: translate(0); }
        25% { transform: translate(-5px, -5px); }
        50% { transform: translate(5px, 5px); }
        75% { transform: translate(-5px, 5px); }
    }
`;
document.head.appendChild(style);
