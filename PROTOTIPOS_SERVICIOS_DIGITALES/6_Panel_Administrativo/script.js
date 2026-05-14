function mostrarSeccion(seccionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(seccionId).classList.add('active');
    
    // Actualizar botón activo en el menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Actualizar título
    const titulos = {
        'inicio': 'Dashboard Principal',
        'usuarios': 'Gestión de Usuarios',
        'pedidos': 'Pedidos Recientes',
        'ganancias': 'Análisis de Ganancias',
        'reportes': 'Reportes',
        'configuracion': 'Configuración'
    };
    
    document.getElementById('titulo-seccion').textContent = titulos[seccionId];
}

// Eventos en los formularios
document.querySelector('.form-config')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Cambios guardados correctamente!');
});

document.querySelectorAll('.btn-descarga').forEach(btn => {
    btn.addEventListener('click', function() {
        const formato = this.textContent.trim().split('\n')[0];
        alert(`Descargando reporte en ${formato}...`);
    });
});
