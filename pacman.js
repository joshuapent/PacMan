const ghostsImg = ['images/blueghost1.png', 'images/brownghost1.png', 'images/redghost1.png', 'images/pinkghost1.png'];
const pacmanImg = ['images/pacman1.png']
const gameArea = document.getElementById('GameArea');
const pacman = document.getElementById('pacman');
const ghost1 = document.getElementById('ghost1');
const ghost2 = document.getElementById('ghost2');
const ghost3 = document.getElementById('ghost3');
const ghost4 = document.getElementById('ghost4');
timer
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
