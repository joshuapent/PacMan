const sprites = new Image();
const gameAreaSetup = document.getElementById('GameArea');
const game = gameAreaSetup.getContext("2d");
class Sprite {
    constructor(row, column, spriteNum, movement, radius) {
        this.row = row;
        this.column = column;
        this.spriteNum = spriteNum;
        this.movement = movement;
    }
    dim = 32; // dim = dimensions
    hitbox = 15; //hitbox is slightly less than half dim because of blank space around sprites
};
const pacman = new Sprite(1, 3, 3, 16);
let pacmanvar = 0;
const pacmanmoves = setInterval(function () {
    if (pacmanvar < pacman.spriteNum) {
        game.clearRect(0,0,640,800)
        game.drawImage(sprites, pacmanvar*32, 0, 32, 32, 200, 100, 32, 32)
        pacmanvar++;
    } else {
    game.clearRect(0,0,640,800)
    game.drawImage(sprites, 32, 0, 32, 32, 200, 100, 32, 32)
    pacmanvar = 0;
    }
},1000); //100 is the sweet spot


let yAxis = gameAreaSetup.height/2; //using gameAreaSetup allows for this to change with arena size
let xAxis = gameAreaSetup.width/2; 
document.addEventListener('keydown', (direction) => {
    if (direction.code == 'KeyW' || direction.code == "ArrowUp") {
        if (yAxis < gameAreaSetup.height) {
            if (yAxis >= gameAreaSetup.height-pacman.movement) yAxis = gameAreaSetup.height; 
            else yAxis += pacman.movement; //using .movement allows game speed to be changed easily
        }
        console.log(yAxis)
    }
    else if (direction.code == 'KeyS' || direction.code == "ArrowDown") {
        if (yAxis > 0) {
            if (yAxis <= pacman.movement) yAxis -= yAxis;
            else yAxis -= pacman.movement; 
            }
        console.log(yAxis)
    } 
    else if (direction.code == 'KeyA' || direction.code == "ArrowLeft") {
        if (xAxis < gameAreaSetup.width) {
            if (xAxis >= gameAreaSetup.width-pacman.movement) xAxis = gameAreaSetup.width; 
            else xAxis += pacman.movement;
        } // gameAreaSetup.width/height allows for this function to be flexible to arena changes
        console.log(xAxis)
    } 
    else if (direction.code == 'KeyD' || direction.code == "ArrowRight") {
        if (xAxis > 0) {
            if (xAxis <= pacman.movement) xAxis -= xAxis;
            else xAxis -= pacman.movement; 
        }
        console.log(xAxis)
    }
});

sprites.src = "images/Pacman.png";