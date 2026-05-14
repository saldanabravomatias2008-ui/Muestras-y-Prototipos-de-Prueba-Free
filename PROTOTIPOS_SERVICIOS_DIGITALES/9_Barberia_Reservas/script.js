let citasReservadas = JSON.parse(localStorage.getItem('citasBarberia')) || [];

document.getElementById('form-reserva')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const form = e.target;
    const nombre = form.querySelector('input[type="text"]').value;
    const telefono = form.querySelector('input[type="tel"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const servicio = form.querySelector('select').value;
    const fecha = form.querySelectorAll('input[type="date"]')[0].value;
    const hora = form.querySelector('input[type="time"]').value;
    const barbero = form.querySelectorAll('select')[1].value;
    
    const cita = {
        nombre,
        telefono,
        email,
        servicio,
        fecha,
        hora,
        barbero
    };
    
    citasReservadas.push(cita);
    localStorage.setItem('citasBarberia', JSON.stringify(citasReservadas));
    
    alert(`¡Cita reservada para ${nombre}!\nFecha: ${fecha} a las ${hora}`);
    mostrarCitas();
    form.reset();
});

function mostrarCitas() {
    const citasList = document.getElementById('citas-list');
    
    if (citasReservadas.length === 0) {
        citasList.innerHTML = '<p style="text-align:center; color:#999;">No hay citas reservadas</p>';
        return;
    }
    
    citasList.innerHTML = citasReservadas.map((cita, i) => `
        <div class="cita-item">
            <strong>${cita.nombre}</strong>
            <p>📅 ${cita.fecha} a las ${cita.hora}</p>
            <p>✂️ ${cita.servicio}</p>
            <p>👨 Barbero: ${cita.barbero}</p>
            <p>📱 ${cita.telefono}</p>
            <button onclick="cancelarCita(${i})" style="background:#e74c3c;color:white;border:none;padding:5px 10px;cursor:pointer;border-radius:3px;margin-top:0.5rem;">Cancelar</button>
        </div>
    `).join('');
}

function cancelarCita(index) {
    citasReservadas.splice(index, 1);
    localStorage.setItem('citasBarberia', JSON.stringify(citasReservadas));
    mostrarCitas();
}

mostrarCitas();
