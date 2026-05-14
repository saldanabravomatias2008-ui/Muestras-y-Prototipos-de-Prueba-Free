function agregarDonacion() {
    const nombre = document.getElementById('donor-name').value;
    const monto = document.getElementById('donor-amount').value;
    
    if (!nombre || !monto) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    const donacionesLista = document.getElementById('donaciones-lista');
    const nuevaDonacion = document.createElement('div');
    nuevaDonacion.className = 'donacion-item';
    nuevaDonacion.innerHTML = `<span>${nombre}</span><span class="monto">$${monto}</span>`;
    
    donacionesLista.insertBefore(nuevaDonacion, donacionesLista.firstChild);
    
    // Mantener solo las últimas 5 donaciones
    if (donacionesLista.children.length > 5) {
        donacionesLista.removeChild(donacionesLista.lastChild);
    }
    
    document.getElementById('donor-name').value = '';
    document.getElementById('donor-amount').value = '';
}

function actualizarContadores() {
    const viewers = document.getElementById('viewers-input').value;
    const followers = document.getElementById('followers-input').value;
    
    document.getElementById('viewers').textContent = parseInt(viewers).toLocaleString();
    document.getElementById('followers').textContent = parseInt(followers).toLocaleString();
}

function mostrarAlerta() {
    const nombre = document.getElementById('suscriptor-nombre').value;
    
    if (!nombre) {
        alert('Por favor escribe el nombre del suscriptor');
        return;
    }
    
    const alertaBox = document.getElementById('alerta-box');
    document.getElementById('alerta-nombre').textContent = `¡${nombre} se ha suscrito!`;
    alertaBox.style.display = 'block';
    
    setTimeout(() => {
        alertaBox.style.display = 'none';
    }, 5000);
}

function aplicarMensaje() {
    const select = document.getElementById('mensajes-select');
    const mensaje = select.value;
    
    if (mensaje) {
        alert(`Mensaje mostrado: ${mensaje}`);
        select.value = '';
    }
}

function copiarEnlace() {
    const enlace = window.location.href;
    navigator.clipboard.writeText(enlace);
    alert('Enlace copiado al portapapeles');
}

function alternarPantallaBg() {
    const preview = document.querySelector('.overlay-preview');
    preview.style.background = preview.style.background.includes('rgba(107, 95, 255')
        ? 'linear-gradient(135deg, rgba(255, 95, 109, 0.2), rgba(255, 200, 95, 0.2))'
        : 'linear-gradient(135deg, rgba(107, 95, 255, 0.2), rgba(255, 95, 109, 0.2))';
}
