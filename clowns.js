// Script para la página de payasos
document.addEventListener('DOMContentLoaded', () => {
    const lilyCard = document.getElementById('lilyCard');
    const lilyImage = document.getElementById('lilyImage');
    const lilyStars = document.getElementById('lilyStars');
    let clicked = false;

    // Evento cuando tocas la imagen de Lily
    lilyImage.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (!clicked) {
            clicked = true;
            
            // Reproducir sonido
            playClickSound();
            
            // Mostrar estrellas
            lilyStars.style.display = 'flex';
            
            // Animar la imagen
            lilyImage.style.animation = 'imageShake 0.5s ease-in-out';
            
            // Después de 2 segundos, permitir hacer click de nuevo
            setTimeout(() => {
                clicked = false;
            }, 2000);
        }
    });

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

    // Efecto de pantalla glitchy ocasional
    setInterval(() => {
        if (Math.random() > 0.95) {
            document.body.style.filter = 'contrast(1.5) brightness(1.2)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 100);
        }
    }, 2000);
});
