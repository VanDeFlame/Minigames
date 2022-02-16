function movSnake(mov)
{
    movBody();
    
    switch (mov)
    {
        case 2: //Se mueve hacia abajo
            if (snake[0].y === size-1) {
                snake[0].y = 0;
            }
            else {
                snake[0].y++;
            }
            break;
        case 8: //Se mueve hacia arriba
            if (snake[0].y === 0) {
                snake[0].y = size-1;
            }
            else {
                snake[0].y--;
            }
            break;
        case 4: //Se mueve hacia la izquierda
            if (snake[0].x === 0) {
                snake[0].x = size-1;
            }
            else {
                snake[0].x--;
            }
            break;
        case 6: //Se mueve hacia la derecha
            if (snake[0].x === size-1) {
                snake[0].x = 0;
            }
            else {
                snake[0].x++;
            }
            break;
    }
    
    colision(snake[0].x, snake[0].y)
    board[snake[0].y][snake[0].x] = 1; //Marca en el tablero la posición de la cabeza
    draw();
}

function movBody ()
{
    for(let i = snake.length -1; i > 0; i--)
    {
        if (i === snake.length -1) { //Si es la cola de la serpiente
            board[snake[i].y][snake[i].x] = 0; //Marca como vacia esa posición
        }

        snake[i].x = snake[i-1].x; //Toma la posición de la siguiente parte del cuerpo
        snake[i].y = snake[i-1].y;
        board[snake[i].y][snake[i].x] = 1; //Marca la casilla como ocupada por la serpiente
    }
}

function meat()
{   
    let x = Math.floor(Math.random() * size); //Numeros random
    let y = Math.floor(Math.random() * size);

    if (board[y][x] === 0) { //Comprueba que la casilla esté vacia
        board[y][x] = 2;
        draw();
    }
    else { //Si la casilla está ocupada vuelve a ejecutarse.
        meat();
    }    
}

function colision (x, y) //Colisiones con el cuerpo o con una carne
{
    switch (board[y][x]) {
        case 1: //Choca contra sí misma
            gameOver();
            break;
        case 2: //Come una carne
            points++;
            if (points === size*size) win();
            else {
                snake.push({ //La serpiente crece
                    x: snake[(snake.length) -1].x,
                    y: snake[(snake.length) -1].y,
                });

                meat(); //Reaparece la carne
            }
            break;
    }
}

function draw() { //Dibujar el tablero
    for (let i=0;i<size;i++) {
        for (let j=0;j<size;j++) {
            switch (board[i][j]){
                case 0: //No hay nada
                    document.getElementById(`cell-${i}-${j}`).className = `snake--cell`;
                    break;
                case 1: //Está la serpiente
                    document.getElementById(`cell-${i}-${j}`).className = `snake--cell snake`;
                    break;
                case 2: //Hay una carne
                    document.getElementById(`cell-${i}-${j}`).className = `snake--cell meat`;
                    break;
            }
        }
    }
    document.getElementById(`cell-${snake[0].y}-${snake[0].x}`).className = `snake--cell snake__head`;
}

function win () { //Ganaste, quepro.jpg
    let audio = new Audio("https://www.myinstants.com/media/sounds/kids-saying-yay-sound-effect_3.mp3");
    audio.volume = 0.2;
    audio.play();

    gameRunning = false;
    document.getElementById("snake--msg").innerHTML = "¡GANASTE!<br>"+points;
    document.getElementById("snake--msg").className = "snake--msg win";
}

function gameOver () { //Perdiste kpo
    let audio = new Audio("https://www.myinstants.com/media/sounds/quack_5.mp3");
    audio.volume = 0.2;
    audio.play();

    gameRunning = false;
    document.getElementById("snake--msg").innerHTML = "PERDISTE :c<br>"+points;
    document.getElementById("snake--msg").className = "snake--msg lose";
}

function start () {
    document.getElementById("snake--board").innerHTML = "";
    document.getElementById("snake--msg").innerHTML = "";
    document.getElementById("snake--msg").className = "snake--msg hidden";

    gameRunning = true;
    points = 1;
    snake = [
        { x: 7, y: 7}, //Snake head
        { x: 7, y: 8} //Snake body
    ];

    board = create2DArray();
    board[snake[0].y][snake[0].x] = 1; //Mete la serpiente al tablero
    board[snake[1].y][snake[1].x] = 1;

    meat();
}

function keyCheck (key) {
    key = key || window.event;

    if (gameRunning) 
    {
        if(key.key === `w` || key.key === `W` || key.key === `8`) {
            movSnake(8);
        }
        else if(key.key === `d` || key.key === `D` || key.key === `6`) {
            movSnake(6);
        }
        else if(key.key === `a` || key.key === `A` || key.key === `4`) {
            movSnake(4);
        }
        else if(key.key === `s` || key.key === `S` || key.key === `2`) {
            movSnake(2);
        }
    }
}

//                  VARIABLES
const size = 12;
document.documentElement.style.setProperty(`--size`, "calc("+size+" * 20px)"); //variable para el CSS

let table = document.getElementById(`snake--board`);

//Crear una matriz
let create2DArray = () => {
    let arr = [];
    for (let i=0;i<size;i++) {
       arr[i] = [];

        for (let j=0;j<size;j++) {
           arr[i][j] = 0;
           table.innerHTML += `<span class="snake--cell" id="cell-${i}-${j}"></span>`;
        }
    }
    return arr;
}

let board;

let points;

let snake = [];

let gameRunning = false;

document.addEventListener(`keypress`, keyCheck);