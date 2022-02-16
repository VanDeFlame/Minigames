function marcar (cas, signo) {
    if(!cas.ocupada && turno)
    {
        cas.signo = signo;
        cas.boton.innerHTML = cas.signo;
        cas.ocupada = true;
        turno--;

        line();

        if (signo === "X" && turno > 0){
            bot();
        }
    }
}

function bot () { 
    let casBot;
    let i = 50; //Medida anti bucles infinitos 100% efectiva no-fake 1 link MEGA
    if(turno === 8 && !(casillas[4].ocupada)) //Si la casilla del medio está desocupada, la elige
    {
        casBot = casillas[4];
    }
    else if (casillas[4].ocupada) //Cantidad de comprobaciones innecesarias con el único fin de darle un poco de dificultad al bot (TERMINA MAL)
    {
        switch (rng(7,0))
        {
            case 0:
                if (casillas[4].signo === casillas[0].signo && !(casillas[8].ocupada)) {
                    casBot = casillas[8];
                    break;
                }
            case 1:
                if (casillas[4].signo === casillas[1].signo && !(casillas[7].ocupada)) {
                    casBot = casillas[7];
                    break;
                }
            case 2:
                if (casillas[4].signo === casillas[2].signo && !(casillas[6].ocupada)) {
                    casBot = casillas[6];
                    break;
                }
            case 3:
                if (casillas[4].signo === casillas[3].signo && !(casillas[5].ocupada)) {
                    casBot = casillas[5];
                    break;
                }
            case 4:
                if (casillas[4].signo === casillas[8].signo && !(casillas[0].ocupada)) {
                    casBot = casillas[0];
                    break;
                }
            case 5:
                if (casillas[4].signo === casillas[5].signo && !(casillas[3].ocupada)) {
                    casBot = casillas[3];
                    break;
                }
            case 6:
                if (casillas[4].signo === casillas[6].signo && !(casillas[2].ocupada)) {
                    casBot = casillas[2];
                    break;
                }
            case 7:
                if (casillas[4].signo === casillas[7].signo && !(casillas[1].ocupada)) {
                    casBot = casillas[1];
                    break;
                }
            default:
                switch (rng(11,0))
                {
                    //LINEA SUP
                    case 0:
                        if (casillas[1].signo === casillas[0].signo && !(casillas[2].ocupada)) {
                            casBot = casillas[2];
                            // break;
                        }
                    case 1:
                        if (casillas[2].signo === casillas[0].signo && !(casillas[1].ocupada)) {
                            casBot = casillas[1];
                            // break;
                        }
                    case 2:
                        if (casillas[1].signo === casillas[2].signo && !(casillas[0].ocupada)) {
                            casBot = casillas[0];
                            // break;
                        }
                    //LINEA LEFT
                    case 3:
                        if (casillas[0].signo === casillas[3].signo && !(casillas[6].ocupada)) {
                            casBot = casillas[6];
                            // break;
                        }
                    case 4:
                        if (casillas[0].signo === casillas[6].signo && !(casillas[3].ocupada)) {
                            casBot = casillas[3];
                            // break;
                        }
                    case 5:
                        if (casillas[3].signo === casillas[6].signo && !(casillas[0].ocupada)) {
                            casBot = casillas[0];
                            // break;
                        }
                    //LINEA INF
                    case 6:
                        if (casillas[6].signo === casillas[7].signo && !(casillas[8].ocupada)) {
                            casBot = casillas[8];
                            // break;
                        }
                    case 7:
                        if (casillas[6].signo === casillas[8].signo && !(casillas[7].ocupada)) {
                            casBot = casillas[7];
                            // break;
                        }
                    case 8:
                        if (casillas[7].signo === casillas[8].signo && !(casillas[6].ocupada)) {
                            casBot = casillas[6];
                            // break;
                        }
                    //LINEA RIGHT
                    case 9:
                        if (casillas[2].signo === casillas[5].signo && !(casillas[8].ocupada)) {
                            casBot = casillas[8];
                            // break;
                        }
                    case 10:
                        if (casillas[2].signo === casillas[8].signo && !(casillas[5].ocupada)) {
                            casBot = casillas[5];
                            // break;
                        }
                    case 11:
                        if (casillas[5].signo === casillas[8].signo && !(casillas[2].ocupada)) {
                            casBot = casillas[2];
                            // break;
                        }
                    default:
                        do {
                            casBot = casillas[rng(8,0)];
                            i--;
                        } while (casBot.ocupada && i>0)
                        break;
                }
        }
    }
    else
    {
        do {
            casBot = casillas[rng(8,0)];
            i--;
        } while (casBot.ocupada && i>0)
    }
    marcar(casBot, "O");
}

function rng (max, min) {
    return Math.floor(Math.random() * (max - min + 1));
}

function line () {
    if (turno <= 4) {
        //CENTRO
        //SL-CC-IR  \
        if (casillas[4].signo === casillas[0].signo && casillas[4].signo === casillas[8].signo && casillas[4].ocupada) {
            win(4,0,8);
        }
        //SC-CC-IC  |
        else if (casillas[4].signo === casillas[1].signo && casillas[4].signo === casillas[7].signo && casillas[4].ocupada) {
            win(4,1,7);
        }
        //IL-CC-SR  /
        else if (casillas[4].signo === casillas[2].signo && casillas[4].signo === casillas[6].signo && casillas[4].ocupada) {
            win(4,2,6);
        }
        //CL-CC-CR  ---
        else if (casillas[4].signo === casillas[3].signo && casillas[4].signo === casillas[5].signo && casillas[4].ocupada) {
            win(4,3,5);
        }

        //ESQUINA SUP-LEFT
        //SL-SC-SR ¯¯¯
        else if (casillas[0].signo === casillas[1].signo && casillas[0].signo === casillas[2].signo && casillas[0].ocupada) {
            win(0,1,2);
        }
        //SL-CL-IL |
        else if (casillas[0].signo === casillas[3].signo && casillas[0].signo === casillas[6].signo && casillas[0].ocupada) {
            win(0,6,3);
        }

        //ESQUINA INF-RIGHT
        //SR-CR-IR    |
        else if (casillas[8].signo === casillas[5].signo && casillas[8].signo === casillas[2].signo && casillas[8].ocupada) {
            win(8,5,2);
        }
        //IL-IC-IR  ___
        else if (casillas[8].signo === casillas[7].signo && casillas[8].signo === casillas[6].signo && casillas[8].ocupada) {
            win(8,7,6);
        }
    }
}

function win (cas1,cas2,cas3)
{
    let audio;
    turno = 0;
    if (casillas[cas2].signo === "X") //Caso de victoria
    {
        audio = new Audio("https://www.myinstants.com/media/sounds/kids-saying-yay-sound-effect_3.mp3");
        
        casillas[cas1].boton.className += ` win`;
        casillas[cas2].boton.className += ` win`;
        casillas[cas3].boton.className += ` win`;
    }
    else //Caso de derrota
    {
        //audio = new Audio("https://www.myinstants.com/media/sounds/10-mario-died.mp3");
        audio = new Audio("https://www.myinstants.com/media/sounds/quack_5.mp3");
        casillas[cas1].boton.className += ` lose`;
        casillas[cas2].boton.className += ` lose`;
        casillas[cas3].boton.className += ` lose`;
    }

    audio.volume = 0.2;
    audio.play();
}

let turno = 9;

let casillas = [
    {
        casilla: 0,
        ocupada: false,
        signo: "",
        boton: document.getElementById(`tateti--C0`)
    },
    {
        casilla: 1,
        ocupada: false,
        signo: "",
        boton: document.getElementById(`tateti--C1`)
    },
    {
        casilla: 2,
        ocupada: false,
        signo: "",
        boton: document.getElementById(`tateti--C2`)
    },
    {
        casilla: 3,
        ocupada: false,
        signo: "",
        boton: document.getElementById(`tateti--C3`)
    },
    {
        casilla: 4,
        ocupada: false,
        signo: "",
        boton: document.getElementById(`tateti--C4`)
    },
    {
        casilla: 5,
        ocupada: false,
        signo: "",
        boton: document.getElementById(`tateti--C5`)
    },
    {
        casilla: 6,
        ocupada: false,
        signo: "",
        boton: document.getElementById(`tateti--C6`)
    },
    {
        casilla: 7,
        ocupada: false,
        signo: "",
        boton: document.getElementById(`tateti--C7`)
    },
    {
        casilla: 8,
        ocupada: false,
        signo: "",
        boton: document.getElementById(`tateti--C8`)
    }
];