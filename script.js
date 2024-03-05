let intentos = 6;
let palabra;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es";
 let verde= "#79b851";
let amarillo= "#f3c237";
let gris= "#a4aec4";


fetch(API)
    .then((response) => {
        response.json().then((body) => {
            palabra = body[0].toUpperCase();
        });
    })
    .catch((error) => {
        console.log(error);
        palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    });

const ERROR = document.getElementById("Error");
ERROR.style.display = "none";

window.addEventListener('load', init);

function init() {
    console.log('---HECHO POR ALFREDO GARLEPP---');
}

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

function intentar() {
    const INTENTO = leerIntento();

    if (INTENTO.length !== 5) {
        ERROR.style.display = "block";
        return;
    }

    if (INTENTO === palabra) {
        ERROR.style.display = "none";
        terminar("<h1>¡GANASTE!😀</h1>");
        return;
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";

    for (let i in palabra) {
        const SPAN = document.createElement("span");
        SPAN.className = "letter";

        if (INTENTO[i] === palabra[i]) {
            SPAN.style.backgroundColor = verde;
        } else if (palabra.includes(INTENTO[i])) {
            SPAN.style.backgroundColor = amarillo;
        } else {
            SPAN.style.backgroundColor = gris;
        }

        SPAN.innerHTML = INTENTO[i];
        ROW.appendChild(SPAN);
    }

    ERROR.style.display = "none";
    GRID.appendChild(ROW);
    intentos--;

    if (intentos === 0) {
        button.style.display = "none";
        terminar("<h1>¡PERDISTE!😖</h1>");
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
}
