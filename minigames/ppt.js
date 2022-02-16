function PC () 
{
    let rng = Math.floor(Math.random() * (2 + 1)); //Numero random
    let bot = document.getElementById("ppt--battle__bot")
    
    switch (rng) { //Dibuja la opción jugada por la maquina
        case 0:
            bot.className = `ppt--battle--select ppt__piedra`;
            break;
        case 1:
            bot.className = `ppt--battle--select ppt__papel`;
            break;
        case 2:
            bot.className = `ppt--battle--select ppt__tijera`;
            break;
    }

    return rng;
}

function comprobar (jugada)
{
    let rival = PC();
    let player = document.getElementById("ppt--battle__player");
    let bot = document.getElementById("ppt--battle__bot");
    let audio = new Audio("https://www.myinstants.com/media/sounds/ding-sound-effect_1.mp3");

    if (jugada == rival) //Empate
    {
        player.className += ` ppt__draw`;
        bot.className += ` ppt__draw`;

        audio = new Audio("https://www.myinstants.com/media/sounds/klonk.mp3")
    }
    else if (jugada == 0 && rival == 2) //Gana el jugador (Piedra - Tijera)
    {
        player.className += ` ppt__win`;
        bot.className += ` ppt__lose`;
    }
    else if (jugada == 1 && rival == 0) //Gana el jugador (Papel - Piedra)
    {
        player.className += ` ppt__win`;
        bot.className += ` ppt__lose`;
    }
    else if (jugada == 2 && rival == 1) //Gana el jugador (Tijera - Papel)
    {
        player.className += ` ppt__win`;
        bot.className += ` ppt__lose`;
    }
    else //El jugador pierde
    {
        player.className += ` ppt__lose`;
        bot.className += ` ppt__win`;
        
        audio = new Audio("https://www.myinstants.com/media/sounds/quack_5.mp3");
    }

    audio.volume = 0.2;
    audio.play();
}

function jugar (jugador)
{
    let player = document.getElementById("ppt--battle__player")

    switch (jugador) { //Dibuja la opción elegida
        case 0:
            player.className = `ppt--battle--select ppt__piedra`;
            break;
        case 1:
            player.className = `ppt--battle--select ppt__papel`;
            break;
        case 2:
            player.className = `ppt--battle--select ppt__tijera`;
            break;
    }
    
    comprobar(jugador);
}