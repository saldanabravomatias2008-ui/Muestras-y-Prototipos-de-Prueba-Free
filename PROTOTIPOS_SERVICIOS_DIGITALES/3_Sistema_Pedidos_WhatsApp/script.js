let historialPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

// Actualizar total
document.querySelectorAll('.productos-lista input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', actualizarTotal);
});

function actualizarTotal() {
    let total = 0;
    document.querySelectorAll('.productos-lista input[type="checkbox"]:checked').forEach(checkbox => {
        total += parseFloat(checkbox.dataset.precio);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

function enviarPorWhatsApp() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const pedido = document.getElementById('pedido').value;
    
    const productosSeleccionados = Array.from(
        document.querySelectorAll('.productos-lista input[type="checkbox"]:checked')
    ).map(cb => cb.value);
    
    const total = document.getElementById('total').textContent;
    
    if (!nombre || !email || !telefono || !pedido) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    const mensaje = `Hola! Quiero realizar un pedido:\n\nNombre: ${nombre}\nEmail: ${email}\nTelefono: ${telefono}\nProductos: ${productosSeleccionados.join(', ') || 'Ninguno seleccionado'}\nDetalles: ${pedido}\nTotal: $${total}`;
    
    const numeroWhatsApp = '1234567890';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    // Guardar en historial
    const pedidoGuardado = {
        nombre,
        email,
        telefono,
        productos: productosSeleccionados,
        detalles: pedido,
        total,
        fecha: new Date().toLocaleString()
    };
    
    historialPedidos.unshift(pedidoGuardado);
    localStorage.setItem('pedidos', JSON.stringify(historialPedidos));
    
    mostrarHistorial();
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    // Limpiar formulario
    document.getElementById('form-pedido').reset();
    actualizarTotal();
}

function mostrarHistorial() {
    const historialDiv = document.getElementById('historial-pedidos');
    historialDiv.innerHTML = historialPedidos.length === 0 ? 
        '<p style="text-align:center; color:#999;">No hay pedidos aún</p>' : 
        historialPedidos.map(p => `
            <div class="pedido-item">
                <strong>${p.nombre}</strong>
                <p>📧 ${p.email}</p>
                <p>📱 ${p.telefono}</p>
                <p>🛍️ ${p.productos.join(', ')}</p>
                <p>💰 Total: $${p.total}</p>
                <p>📅 ${p.fecha}</p>
            </div>
        `).join('');
}

// Mostrar historial al cargar
mostrarHistorial();
