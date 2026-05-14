document.querySelectorAll('.btn-cta, .btn-cta-final, .btn-plan, .btn-nav').forEach(btn => {
    btn.addEventListener('click', function() {
        alert('¡Redirigiendo a registro! Este es un prototipo de demostración.');
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
