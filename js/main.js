function girarRuleta() {
    return Math.ceil(Math.random() * 36);
}

function determinarGanador(apuesta, resultado) {
    if (apuesta === resultado) {
        return 'Ganaste';
    } else {
        return 'Perdiste';
    }
}

function obtenerImagenDeGato() {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            const imagenGato = data[0].url;
            const imagenGatoElement = document.getElementById('imagenGato');
            imagenGatoElement.src = imagenGato;
        })
        .catch(error => {
            console.error('Error al obtener la imagen de gato:', error);
        });
}

const apuestaInput = document.getElementById('apuestaInput');
const apostarButton = document.getElementById('apostarButton');
const resultadoDiv = document.getElementById('resultado');
const historialUl = document.getElementById('historial');

const historialGuardado = JSON.parse(localStorage.getItem('historial')) || [];

function actualizarHistorial() {
    historialUl.innerHTML = '';
    historialGuardado.forEach((registro) => {
        const li = document.createElement('li');
        li.textContent = `Apuesta: ${registro.apuesta}, Resultado: ${registro.resultado}, ${registro.mensaje}, Fecha: ${registro.fecha}`;
        historialUl.appendChild(li);
    });
}

apostarButton.addEventListener('click', () => {
    const apuesta = apuestaInput.value;

    if (apuesta.toLowerCase() === 'fin de partida') {
        resultadoDiv.textContent = 'Gracias por jugar.';
    } else {
        const apuestaNum = parseInt(apuesta);

        const resultado = girarRuleta();

        resultadoDiv.textContent = `La ruleta ha girado y el resultado es: ${resultado}`;

        const mensaje = determinarGanador(apuestaNum, resultado);

        const datoPartida = {
            apuesta: apuestaNum,
            resultado: resultado,
            mensaje: mensaje,
            fecha: new Date().toLocaleString()
        };

        historialGuardado.push(datoPartida);

        localStorage.setItem('historial', JSON.stringify(historialGuardado));

        actualizarHistorial();

        obtenerImagenDeGato();
    }
});

actualizarHistorial();

