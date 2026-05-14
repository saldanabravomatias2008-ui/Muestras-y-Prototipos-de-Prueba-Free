let carrito = [];

// Agregar al carrito
document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', function() {
        const producto = this.closest('.producto');
        const nombre = producto.querySelector('h3').textContent;
        const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
        
        carrito.push({ nombre, precio });
        actualizarCarrito();
        alert(`${nombre} agregado al carrito!`);
    });
});

// Filtrar productos
document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filtro = this.dataset.filtro;
        
        document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('.producto').forEach(producto => {
            if (filtro === 'todos' || producto.dataset.categoria === filtro) {
                producto.style.display = '';
            } else {
                producto.style.display = 'none';
            }
        });
    });
});

function actualizarCarrito() {
    document.getElementById('carrito-count').textContent = carrito.length;
    
    const carritoDiv = document.getElementById('carrito-items');
    carritoDiv.innerHTML = carrito.length === 0 ? 
        '<p style="text-align:center; color:#999;">Tu carrito está vacío</p>' : 
        carrito.map((item, i) => `
            <div class="carrito-item">
                <span>${item.nombre}</span>
                <span>$${item.precio.toFixed(2)}</span>
                <button onclick="eliminarDelCarrito(${i})" style="background:red;color:white;border:none;cursor:pointer;padding:5px 10px;border-radius:3px;">X</button>
            </div>
        `).join('');
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

document.querySelector('.btn-comprar')?.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
    } else {
        alert(`Total a pagar: $${carrito.reduce((sum, item) => sum + item.precio, 0).toFixed(2)}\n¡Procederemos al pago!`);
        carrito = [];
        actualizarCarrito();
    }
});
