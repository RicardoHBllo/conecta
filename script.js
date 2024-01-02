//Se declaran variables
const canvasSize = 600;
const urlParams = new URLSearchParams(window.location.search);
const canvas = $('#canvas')[0];
const mih1 = $('#miH1')[0];
const ctx = canvas.getContext('2d');
const name1 = urlParams.get('name1');
const name2 = urlParams.get('name2');
const sizeCat = urlParams.get('size');
const size = parseInt(sizeCat, 10);
const GX = "Turno     " + name1;
const GO = "Turno     " + name2;
const X = "Gana " + name1;
const O = "Gana " + name2;
const N = "Nadie gana";
const color = "#228B22";
const cuadro = parseInt(canvasSize / size, 10);
const aux = (canvasSize / (size * 4));
var matriz = [];
var matriz2 = [];
let score1 = 0;
let score2 = 0;
let empates = 0;
const greenLine = canvas.getContext('2d');
var gameOver = false;
var highScores = [
    { name: 'AAA', score: 0 },
    { name: 'BBB', score: 0 },
    { name: 'CCC', score: 0 },
    { name: 'DDD', score: 0 },
    { name: 'EEE', score: 0 }
];

//para testear
console.log(name1, name2, size);
mih1.innerHTML = GX;

for (var i = 0; i < size; i++) {
    matriz[i] = new Array(size).fill(0); // Crea una matriz de ceros
}
for (var i = 0; i < size; i++) {
    matriz2[i] = new Array(size).fill({ x: 0, y: 0 }); // Crea una matriz de ceros
}

n = 0;

//definir el turno para dibujar
function iswhat(x, y, index) {
    if (n % 2 == 0) {
        n++;
        ctx.strokeStyle = "#f36d59";
        ctx.lineWidth = 10;
        drawcircle(x, y);
        mih1.style.backgroundColor = "#DEB887";
        matriz[Math.floor(index / size)][index % size] = 1;

    } else {
        n++;
        ctx.strokeStyle = "#59f38f";
        ctx.lineWidth = 10;
        drawcircle(x, y);
        mih1.style.backgroundColor = "#DEB887";
        matriz[Math.floor(index / size)][index % size] = 2;
    }
    console.log(n);
}

// Dibujar el tablero

console.log(cuadro);

function createCat() {
    ctx.beginPath();
    ctx.strokeStyle = "#6b6b30";
    ctx.lineWidth = 5;
    for (i = 0; i < size - 1; i++) {
        ctx.moveTo(cuadro * (i + 1), 0);
        ctx.lineTo(cuadro * (i + 1), cuadro * size);
    }
    for (i = 0; i < size - 1; i++) {
        ctx.moveTo(0, cuadro * (i + 1));
        ctx.lineTo(cuadro * size, cuadro * (i + 1));
    }
    ctx.stroke();
}
createCat();

function clearMat() {
    for (var i = 0; i < size; i++) {
        matriz[i].fill(0);
    }
}

// Dibujar una equis en la celda 
/*function drawx(z, w) {

    ctx.beginPath();
    ctx.moveTo(z - aux, w - aux);
    ctx.lineTo(z + aux, w + aux);
    ctx.moveTo(z - aux, w + aux);
    ctx.lineTo(z + aux, w - aux);
    ctx.stroke();
}*/

// Dibujar un círculo en la celda 
function drawcircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, (canvasSize / sizeCat) / 4, 0, 2 * Math.PI);
    ctx.stroke();
}

function position(x, y) {
    var width = size;
    var height = size;
    var col = Math.floor(x / (canvasSize / width));
    var index = -1;

    // Buscar la última ficha en la columna
    for (var row = height - 1; row >= 0; row--) {
        if (matriz[row][col] == 0) {
            index = row * width + col;
            break;
        }
    }

    // Si no hay fichas abajo, dibujar en la última fila
    if (index == -1) {
        index = (height - 1) * width + col;
    }

    var centerX = (col * (canvasSize / width)) + (canvasSize / width / 2);
    var centerY = (Math.floor(index / width) * (canvasSize / height)) + (canvasSize / height / 2);
    var newX = matriz2[Math.floor(index / width)][index % width].x = centerX;
    var newY = matriz2[Math.floor(index / width)][index % width].y = centerY;
    if (!gameOver) iswhat(centerX, centerY, index);

    areWinner(index, newX, newY);
}

function drawLine(x1, y1, x2, y2, color) {
    greenLine.beginPath();
    greenLine.strokeStyle = color;
    greenLine.lineWidth = 10;
    greenLine.moveTo(x1, y1);
    greenLine.lineTo(x2, y2);
    greenLine.stroke();
}




//para saber quien gana
function areWinner(index, x, y) {

    const mih1 = document.getElementById("miH1");
    if (matriz[Math.floor(index / size)][index % size] == 2) mih1.innerHTML = GX;
    else mih1.innerHTML = GO;

    // Verificar si hay un ganador en cada una de las filas
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j <= matriz.length - 4; j++) {
            if (matriz[i][j] === 1 && matriz[i][j + 1] === 1 && matriz[i][j + 2] === 1 && matriz[i][j + 3] === 1) {
                mih1.style.backgroundColor = color;
                mih1.innerHTML = X;
                score1++;
                document.getElementById("score1").innerHTML = name1 + ": " + score1;
                gameOver = true;
                clearMat();
                return true;
            } else if (matriz[i][j] === 2 && matriz[i][j + 1] === 2 && matriz[i][j + 2] === 2 && matriz[i][j + 3] === 2) {
                mih1.style.backgroundColor = color;
                mih1.innerHTML = O;
                score2++;
                document.getElementById("score2").innerHTML = name2 + ": " + score2;
                gameOver = true;
                clearMat();
                return true;
            }
        }
    }

    // Verificar si hay un ganador en cada una de las columnas
    for (var j = 0; j < matriz.length; j++) {
        for (var i = 0; i <= matriz.length - 4; i++) {
            if (matriz[i][j] === 1 && matriz[i + 1][j] === 1 && matriz[i + 2][j] === 1 && matriz[i + 3][j] === 1) {
                mih1.style.backgroundColor = color;
                mih1.innerHTML = X;
                score1++;
                document.getElementById("score1").innerHTML = name1 + ": " + score1;
                gameOver = true;
                clearMat();
                return true;
            } else if (matriz[i][j] === 2 && matriz[i + 1][j] === 2 && matriz[i + 2][j] === 2 && matriz[i + 3][j] === 2) {
                mih1.style.backgroundColor = color;
                mih1.innerHTML = O;
                score2++;
                document.getElementById("score2").innerHTML = name2 + ": " + score2;
                gameOver = true;
                clearMat();
                return true;
            }
        }
    }

    // Verificar si hay un ganador en las diagonales
    for (var i = 0; i <= matriz.length - 4; i++) {
        for (var j = 0; j <= matriz.length - 4; j++) {
            if (matriz[i][j] === 1 && matriz[i + 1][j + 1] === 1 && matriz[i + 2][j + 2] === 1 && matriz[i + 3][j + 3] === 1) {
                mih1.style.backgroundColor = color;
                mih1.innerHTML = X;
                score1++;
                document.getElementById("score1").innerHTML = name1 + ": " + score1;
                gameOver = true;
                clearMat();
                return true;
            } else if (matriz[i][j] === 2 && matriz[i + 1][j + 1] === 2 && matriz[i + 2][j + 2] === 2 && matriz[i + 3][j + 3] === 2) {
                mih1.style.backgroundColor = color;
                mih1.innerHTML = O;
                score2++;
                document.getElementById("score2").innerHTML = name2 + ": " + score2;
                gameOver = true;
                clearMat();
                return true;
            } else if (matriz[i][j + 3] === 1 && matriz[i + 1][j + 2] === 1 && matriz[i + 2][j + 1] === 1 && matriz[i + 3][j] === 1) {
                mih1.style.backgroundColor = color;
                mih1.innerHTML = X;
                score1++;
                document.getElementById("score1").innerHTML = name1 + ": " + score1;
                gameOver = true;
                clearMat();
                return true;
            } else if (matriz[i][j + 3] === 2 && matriz[i + 1][j + 2] === 2 && matriz[i + 2][j + 1] === 2 && matriz[i + 3][j] === 2) {
                mih1.style.backgroundColor = color;
                mih1.innerHTML = O;
                score2++;
                document.getElementById("score2").innerHTML = name2 + ": " + score2;
                gameOver = true;
                clearMat();
                return true;
            }
        }

    }

    // Si no hay ganador y no quedan espacios vacíos, es un empate
    if (matriz.flat().indexOf(0) == -1) {
        change = N;
        empates++;
        document.getElementById("empate").innerHTML = "Empates: " + empates;
        gameOver = true;
        clearMat();
        return true;
    }

    if (score1 > score2) {
        // Actualizar las mejores puntuaciones
        var playerName = urlParams.get('name1');
        var playerScore = score1;
        var alreadyExists = false; // Flag para indicar si el jugador ya existe en la lista
        for (var i = 0; i < highScores.length; i++) {
            if (playerScore > highScores[i].score) {
                // Verificar si el jugador ya existe con el mismo puntaje
                if (highScores[i].name === playerName && highScores[i].score === playerScore) {
                    alreadyExists = true;
                    break;
                }
                highScores.splice(i, 0, { name: playerName, score: playerScore });
                highScores.pop();
                break;
            }
        }
        // Agregar el jugador a la lista si no existe
        if (!alreadyExists) {
            highScores.push({ name: playerName, score: playerScore });
        }
    } else if (score2 > score1) {
        // Actualizar las mejores puntuaciones
        var playerName = urlParams.get('name2');
        var playerScore = score2;
        var alreadyExists = false; // Flag para indicar si el jugador ya existe en la lista
        for (var i = 0; i < highScores.length; i++) {
            if (playerScore > highScores[i].score) {
                // Verificar si el jugador ya existe con el mismo puntaje
                if (highScores[i].name === playerName && highScores[i].score === playerScore) {
                    alreadyExists = true;
                    break;
                }
                highScores.splice(i, 0, { name: playerName, score: playerScore });
                highScores.pop();
                break;
            }
        }
        // Agregar el jugador a la lista si no existe
        if (!alreadyExists) {
            highScores.push({ name: playerName, score: playerScore });
        }
    }

    return false;

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    console.log(evt.clientX - rect.left, evt.clientY - rect.top);
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.addEventListener('click', function (evt) {
    const { x, y } = getMousePos(canvas, evt);
    position(x, y);
}, false);

function clearCanvas() {
    gameOver = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // borra todo el contenido del canvas
    clearMat(); // reinicia la matriz
    createCat();
    mih1.innerHTML = GX; // restablece el turno
    mih1.style.backgroundColor = "#DEB887"; // restablece el color de fondo del encabezado
    n = 0; // reinicia el contador de turnos
    document.getElementById("score1").innerHTML = name1 + ": " + score1; // actualiza la puntuación del jugador 1 en la página
    document.getElementById("score2").innerHTML = name2 + ": " + score2; // actualiza la puntuación del jugador 2 en la página
    document.getElementById("empates").innerHTML = "Empates: " + empates; // actualiza la puntuación de empates en la página

}

function reiniciar() {
    showHighScores();
    location.reload();
}

function showHighScores() {
    // Ordenar los puntajes de mayor a menor
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Crear una cadena con las puntuaciones
    var message = "High Scores:\n";
    for (var i = 0; i < 5; i++) {
        if (highScores[i].score > 0) {
            message += (i + 1) + ". " + highScores[i].name + ": " + highScores[i].score + "\n";
        }
    }

    // Mostrar las puntuaciones en una ventana de alerta
    alert(message);
}

