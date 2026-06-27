// Variables del DOM
const emailInput = document.getElementById('emailInput');
const enterButton = document.getElementById('enterButton');
const messageContainer = document.getElementById('messageContainer');

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
    await typeMessage(`Los payasos falsos te han aceptado en su red...\n`, 50);
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

// Movimiento de cursor terrorífico (opcional)
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Efecto sutil de distorsión
    if (Math.random() > 0.98) {
        const title = document.querySelector('.title-horror');
        title.style.transform = `translate(${Math.random() * 3}px, ${Math.random() * 3}px)`;
    }
});
