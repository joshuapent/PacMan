const images = {
    blue: ['images/blueghost1.png', 'images/blueghost2.png'],
    brown: ['images/brownghost1.png', 'images/brownghost2.png'],
    red: ['images/redghost1.png', 'images/redghost2.png'],
    pink: ['images/pinkghost1.png', 'images/pinkghost2.png'],
    dark: ['images/darkghost1A.png', 'images/darkghost2A.png', 'images/darkghost1B.png', 'images/darkghost2B.png'],
    pacman: ['images/pacman1.png', 'images/pacman2.png', 'images/pacman3.png']
};
const ghosts = [
    document.getElementById('ghost1'), 
    document.getElementById('ghost2'),
    document.getElementById('ghost3'),
    document.getElementById('ghost4')
];
const pacman = document.getElementById('pacman');
const gameArea = document.getElementById('GameArea');

// ghost1.setAttribute("src", ghostsImg[0]);
// ghost2.setAttribute("src", ghostsImg[1]);
// ghost3.setAttribute("src", ghostsImg[2]);
// ghost4.setAttribute("src", ghostsImg[3]);
let randomvar = 0;
function pacManMoves() {
    if (randomvar < pacmanImg.length) {
        pacman.setAttribute("src", pacmanImg[randomvar])
        randomvar++;
    } else if (randomvar === pacmanImg.length) {
        pacman.setAttribute("src", pacmanImg[1]);
        randomvar -= 3;
    }
}
// const pacmanmoves = setInterval(pacManMoves, 1000); //100 is the sweet spot
function ghostMoves () {
    if (randomvar === 0) {
        ghosts[0].setAttribute("src", redGhostImg[0])
        randomvar++;
    } else if (randomvar === 1) {
        ghosts[0].setAttribute("src", redGhostImg[1])
        randomvar--;
    }
}
const ghostMoveTimer = setInterval(ghostMoves, 300); //100 is the sweet spot


class character {
    constructor(name) {
        this.name = name
    }
}
