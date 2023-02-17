const ghostsImg = ['images/ghost1.png', 'images/ghost2.png', 'images/ghost3.png', 'images/ghost4.png'];
const pacmanImg = ['images/pacman.png']
const gameArea = document.getElementById('GameArea');
const pacman = document.getElementById('pacman');
const ghost1 = document.getElementById('ghost1');
const ghost2 = document.getElementById('ghost2');
const ghost3 = document.getElementById('ghost3');
const ghost4 = document.getElementById('ghost4');
pacman.setAttribute("src", pacmanImg[0]);
ghost1.setAttribute("src", ghostsImg[0]);
ghost2.setAttribute("src", ghostsImg[1]);
ghost3.setAttribute("src", ghostsImg[2]);
ghost4.setAttribute("src", ghostsImg[3]);


class character {
    constructor(name) {
        this.name = name
    }
}
