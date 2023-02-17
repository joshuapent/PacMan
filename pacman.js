const blueGhostImg = ['images/blueghost1', 'images/blueghost2'];
const brownGhostImg = ['images/brownghost1', 'images/brownghost2'];
const redGhostImg = ['images/redghost1', 'images/redghost2'];
const pinkGhostImg = ['images/pinkghost1', 'images/pinkghost2'];
const pacmanImg = ['images/pacman1.png', 'images/pacman2.png', 'images/pacman3.png']
const darkGhostImg = ['images/darkghost1A.png', 'images/darkghost2A.png', 'images/darkghost1B.png', 'images/darkghost2B.png']
const pacman = document.getElementById('pacman');
const ghost1 = document.getElementById('ghost1');
const ghost2 = document.getElementById('ghost2');
const ghost3 = document.getElementById('ghost3');
const ghost4 = document.getElementById('ghost4');
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
    if (randomvar < ghost1.length) {
        ghost1.setAttribute("src", redGhostImg[0])
    }
}
class character {
    constructor(name) {
        this.name = name
    }
}
