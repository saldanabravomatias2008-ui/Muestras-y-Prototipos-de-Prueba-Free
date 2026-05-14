document.querySelectorAll('.btn-registro, .btn-seleccionar').forEach(btn => {
    btn.addEventListener('click', function() {
        const membresia = this.closest('.membresia');
        if (membresia) {
            const tipo = membresia.querySelector('h3').textContent;
            const precio = membresia.querySelector('.precio').textContent.split('/')[0];
            alert(`¡Perfecto! Has seleccionado la membresía ${tipo}\nPrecio: ${precio}\n\nRedirigiendo a registro...`);
        } else {
            alert('¡Excelente! Redirigiendo al registro...');
        }
    });
});

// Animación de números
window.addEventListener('scroll', () => {
    const elementos = document.querySelectorAll('.precio');
    elementos.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.style.animation = 'fadeIn 0.5s ease';
        }
    });
});
