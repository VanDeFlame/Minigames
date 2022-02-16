function changeGame (game) {
    switch (game)
    {
        case `ppt`:
            iframe.title = `Piedra, Papel, Tijera`;
            iframe.src = `./minigames/${game}.html`;
            break;
        case `tateti`:
            iframe.title = `TaTeTi`;
            iframe.src = `./minigames/${game}.html`;
            break;
        case `snake`:
            iframe.title = `Snake`;
            iframe.src = `./minigames/${game}.html`;
            break;
        case `minesweeper`:
            iframe.title = `Buscaminas`;
            iframe.src = `./minigames/${game}.html`;
            break;
    }
}

const iframe = document.querySelector(`#game--iframe`);

let doc = iframe.contentWindow.document;
doc.open();
doc.write(`<h2 style="
color: white;
font-family: sans-serif;
font-weight: bold;
font-size: 40px;
text-align: center;
margin: calc(50% - 20px) 0;
">Elige un juego</h2>`);
doc.close();