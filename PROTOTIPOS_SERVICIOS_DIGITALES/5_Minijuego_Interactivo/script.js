let score = 0;
let timeLeft = 30;
let gameActive = false;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const gameMessage = document.getElementById('game-message');
const canasta = document.querySelector('.canasta');

startBtn.addEventListener('click', iniciarJuego);
restartBtn.addEventListener('click', iniciarJuego);

document.addEventListener('mousemove', moverCanasta);

function iniciarJuego() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    gameMessage.textContent = '¡Juego iniciado! Recoge todas las monedas';
    scoreDisplay.textContent = '0';
    timerDisplay.textContent = '30';
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    
    document.querySelectorAll('.moneda').forEach(m => m.remove());
    generarMonedas();
    
    const intervalo = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(intervalo);
            finalizarJuego();
        }
    }, 1000);
}

function generarMonedas() {
    if (!gameActive) return;
    
    const moneda = document.createElement('div');
    moneda.className = 'moneda';
    moneda.textContent = '💰';
    
    const x = Math.random() * (gameArea.clientWidth - 40);
    const y = Math.random() * (gameArea.clientHeight - 100);
    
    moneda.style.left = x + 'px';
    moneda.style.top = y + 'px';
    
    moneda.addEventListener('click', (e) => {
        e.stopPropagation();
        if (gameActive) {
            score++;
            scoreDisplay.textContent = score;
            moneda.remove();
            generarMonedas();
        }
    });
    
    gameArea.appendChild(moneda);
}

function moverCanasta(e) {
    if (!gameActive) return;
    
    const rect = gameArea.getBoundingClientRect();
    const x = e.clientX - rect.left - 20;
    
    if (x >= 0 && x <= gameArea.clientWidth - 40) {
        canasta.style.left = x + 'px';
    }
}

function finalizarJuego() {
    gameActive = false;
    gameMessage.textContent = `¡Juego terminado! Puntuación: ${score}`;
    restartBtn.style.display = 'inline-block';
    document.querySelectorAll('.moneda').forEach(m => m.remove());
    
    // Guardar puntuación
    leaderboard.push(score);
    leaderboard.sort((a, b) => b - a);
    leaderboard = leaderboard.slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    
    actualizarLeaderboard();
}

function actualizarLeaderboard() {
    const lista = document.getElementById('leaderboard-list');
    lista.innerHTML = leaderboard.map((p, i) => 
        `<li>#${i+1} - <strong>${p}</strong> puntos</li>`
    ).join('');
}

actualizarLeaderboard();
