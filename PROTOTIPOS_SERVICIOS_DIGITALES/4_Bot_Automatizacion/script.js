const respuestas = {
    'horarios': 'Nuestros horarios son: Lunes a Viernes 9:00 AM - 6:00 PM, Sábado 10:00 AM - 4:00 PM',
    'precios': 'Tenemos diferentes planes según tus necesidades. Te invito a escribir "contacto" para hablar con nuestro equipo de ventas.',
    'contacto': '📞 Teléfono: +1 (555) 123-4567\n📧 Email: info@empresa.com\n💬 WhatsApp: +1 (555) 123-4567',
    'ubicación': '📍 Nos encontramos en: Calle Principal 123, Ciudad - Código Postal 12345',
    'ayuda': 'Puedo ayudarte con:\n✅ Horarios\n✅ Precios\n✅ Contacto\n✅ Ubicación\n✅ Información general',
};

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Event listeners
sendBtn.addEventListener('click', () => enviarMensaje());
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensaje();
});

function enviarMensaje(mensaje = null) {
    const texto = mensaje || chatInput.value.trim();
    
    if (!texto) return;
    
    // Mostrar mensaje del usuario
    agregarMensaje(texto, 'usuario');
    chatInput.value = '';
    
    // Simular respuesta del bot
    setTimeout(() => {
        const respuesta = obtenerRespuesta(texto);
        agregarMensaje(respuesta, 'bot');
    }, 500);
}

function obtenerRespuesta(texto) {
    const textoLower = texto.toLowerCase();
    
    // Búsqueda en respuestas
    for (let clave in respuestas) {
        if (textoLower.includes(clave)) {
            return respuestas[clave];
        }
    }
    
    // Respuesta predeterminada
    return 'Entiendo tu pregunta. Usa los botones rápidos o escribe "ayuda" para ver qué puedo hacer por ti.';
}

function agregarMensaje(texto, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.className = `mensaje ${tipo}`;
    divMensaje.innerHTML = `<p>${texto}</p>`;
    chatMessages.appendChild(divMensaje);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
