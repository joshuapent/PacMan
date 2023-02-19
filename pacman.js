const sprites = new Image();
const gameAreaSetup = document.getElementById('GameArea');
const game = gameAreaSetup.getContext("2d");
class Sprite {
    constructor(row, column, spriteNum, radius) {
        this.row = row;
        this.column = column;
        this.spriteNum = spriteNum;
    }
    dim = 32; // dim = dimensions
    hitbox = 15; //hitbox is slightly less than half dim because of blank space around sprites
};
const pacman = new Sprite(1, 3, 3);

let randomvar = 0;
const pacmanmoves = setInterval(function () {
    if (randomvar < pacman.spriteNum) {
        game.clearRect(0,0,640,800)
        game.drawImage(sprites, randomvar*32, 0, 32, 32, 200, 100, 32, 32)
        randomvar++;
        console.log(randomvar)
    } else {
    game.clearRect(0,0,640,800)
    game.drawImage(sprites, 64, 0, 32, 32, 200, 100, 32, 32)
    randomvar = 0;
    }
},1000); //100 is the sweet spot


document.addEventListener('keydown', (direction) => {
    if (direction.keycode == 38) return console.log('up')
}
);
sprites.src = "images/Pacman.png";