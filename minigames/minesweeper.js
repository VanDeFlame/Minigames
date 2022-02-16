function casilla(i,j) //Liberar casillas
{
    let cell = document.getElementById(`cell-${i}-${j}`);

    if(!gameEnded && cell.dataset.status != `flag`)
    {
        if (board[i][j] === 0) //La casilla estaba libre, menos mal
        {
            cell.dataset.status = `free`;
            cell.innerHTML = cell.dataset.mines; //Esto le escribe a la casilla la cantidad de minas aledañas

            
            let adjacentCells = neighbor(i,j);
            let mines = adjacentCells.filter(t => t.value === 1);
            
            if (mines.length === 0) //Si no hay minas aledañas, libera las casillas en 3x3
            {
                adjacentCells.forEach(casillaExpandibles.bind(null))
            }
        }
        else if (board[i][j] === 1) //Perdiste kpo, explotó todo
        {
            gameEnd(false);
        }
    }
}

function flag (i, j) //Poner y quitar banderitas
{
    let cell = document.getElementById(`cell-${i}-${j}`);

    if (cell.dataset.status == `hidden` && !gameEnded && flagLeftover) //Colocar banderita
    {
        cell.dataset.status = `flag`;
        flagLeftover--; //Descontar las banderitas restantes

        if (cell.dataset.mines == `mine`) mineLeftover--; //Descontar las minas restantes
    }

    else if (cell.dataset.status == `flag` && !gameEnded) //Quitar banderita
    {
        cell.dataset.status = `hidden`;
        flagLeftover++; //Aumenta las banderitas restantes

        if (cell.dataset.mines == `mine`) mineLeftover++; //Aumenta las minas restantes
    }
    
    document.getElementById(`minesweeper--flags`).innerHTML = flagLeftover; //Escribe en el HTML la cantidad de banderas restantes

    if (mineLeftover === 0 && !gameEnded) gameEnd(true); //Comprueba que no se hayan marcado todas las minas
}

function casillaExpandibles(index) //Expande un 3x3 si clickeas una casilla vacia
{
    let cell = document.getElementById(`cell-${index.y}-${index.x}`);
    if (cell.dataset.status == `hidden`)
    {
        cell.dataset.status = `free`;
        cell.innerHTML = cell.dataset.mines; //Esto le escribe a la casilla la cantidad de minas aledañas
    }
    return;
}

function start ()
{
    board = create2DArray();
    
    mineLeftover = mine;
    flagLeftover = mine;
    gameEnded = false;
    document.getElementById(`minesweeper--flags`).innerHTML = flagLeftover; //Escribe en el HTML la cantidad de banderas restantes
    mines();
}

function mines () //Coloca minas de manera random
{
    for(let i = 0; i < mine; i++)
    {
        let x = Math.floor(Math.random() * size); //Numeros random
        let y = Math.floor(Math.random() * size);

        if (board[y][x] === 0) { //Comprueba que la casilla esté vacia
            board[y][x] = 1;
            document.getElementById(`cell-${y}-${x}`).dataset.mines = `mine`;
        }
        else { //Si está ocupada (por una mina) vuelve a ejecutarse.
            i--;
        }  
    }

    marks();
}

function neighbor (i, j) //Comprueba las casillas aledañas
{
    let cells = [];

    for (yOffset = -1; yOffset <= 1; yOffset++)
    {
        for (xOffset = -1; xOffset <= 1; xOffset++)
        {
            let tile = {
                value: board[i + yOffset]?.[j + xOffset],
                y: i + yOffset,
                x: j + xOffset
            }

            if (tile.value != undefined) cells.push(tile);
        }
    }

    return cells;
}

function marks () //Marca en la casilla la cantidad de minas aledañas
{
    for(let i = 0; i < (size); i++)
    {
        for(let j = 0; j < (size); j++)
        {
            if(board[i][j] === 0)
            {
                let k = 0;
                let cells = neighbor(i, j);
                for(let a = 0; a < cells.length; a++)
                {
                    k += cells[a].value;
                }

                document.getElementById(`cell-${i}-${j}`).dataset.mines = `${k}`;
            }
        }        
    }
}

function gameEnd (win)
{
    gameEnded = true;

    let audio;
    if (win) audio = new Audio("https://www.myinstants.com/media/sounds/kids-saying-yay-sound-effect_3.mp3"); //audio de victoria
    else audio = new Audio("https://www.myinstants.com/media/sounds/explode1.mp3"); //audio de derrota
    audio.volume = 0.2;
    audio.play();

    for(let i = 0; i < (size); i++)
    {
        for(let j = 0; j < (size); j++)
        {
            let cell = document.getElementById(`cell-${i}-${j}`);

            if (!win && board[i][j] === 1 && cell.dataset.status != `flag`) //Una mina
            {
                cell.dataset.status = `mine`;
            }
            else if (board[i][j] === 1 && cell.dataset.status == `flag`) //Una mina desactivada
            {
                cell.dataset.status = `flag__correct`;
            }
        }
    }
}

//          VARIABLES
const size = 20; //Tamaño del tablero
const mine = Math.floor(size * 3); //Cantidad de minas

document.documentElement.style.setProperty(`--size`, `calc(`+size+` * 20px)`); //Variable para el CSS

let table = document.getElementById(`minesweeper--board`);

//Crear una matriz
let create2DArray = () => {
    table.innerHTML = ``; //borra el tablero en el HTML
    let arr = [];
    for (let i = 0; i < size; i++) {
       arr[i] = [];

        for (let j = 0; j < size; j++) {
           arr[i][j] = 0;
           table.innerHTML += `<span onclick="casilla(${i},${j})" oncontextmenu="flag(${i},${j}); return false" class="minesweeper--cell" id="cell-${i}-${j}" data-status="hidden"></span>`;
        }
    }
    return arr;
}

let board, mineLeftover, flagLeftover, gameEnded;
start();

window.addEventListener("contextmenu", //Esto hace que no se habra el menu de opciones con el click derecho (O al menos según StackOverflow gg)
    function(e){
        e.stopPropagation()
}, false);