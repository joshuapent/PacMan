const sprites = new Image();
const gameAreaSetup = document.getElementById('GameArea');
const game = gameAreaSetup.getContext("2d");
class Sprite {
    constructor(row, column, spriteNum, movement, xAxis, yAxis, radius) {
        this.row = row; // this is for sprite location
        this.column = column; //this is for sprite location
        this.spriteNum = spriteNum; //this is how many imgs to cycle between
        this.movement = movement;
        this.xAxis = xAxis;
        this.yAxis = yAxis; 
        this.radius = radius;
    }
    dim = 32; // dim = dimensions
    hitbox = 15; //hitbox is slightly less than half dim because of blank space around sprites
};
const pacman = new Sprite(1, 3, 3, 8);
let pacmanvar = 0;

function pacmanMoves() {
    if (pacmanvar < pacman.spriteNum) {
        game.clearRect(0,0,640,800)
        game.drawImage(sprites, pacmanvar*32, 0, 32, 32, xAxis, yAxis, 32, 32)
        pacmanvar++;
    } else {
    game.clearRect(0,0,640,800)
    game.drawImage(sprites, 32, 0, 32, 32, xAxis, yAxis, 32, 32)
    pacmanvar = 0;
    }
    setTimeout(100)
}


let yAxis = gameAreaSetup.height/2; //using gameAreaSetup allows for this to change with arena size
let xAxis = gameAreaSetup.width/2; 
document.addEventListener('keydown', (direction) => {
    pacmanMoves();
    if (direction.code == 'KeyW' || direction.code == "ArrowUp") {
        if (yAxis > 0) {
            if (yAxis <= pacman.movement) yAxis -= yAxis;
            else yAxis -= pacman.movement; 
            }
        console.log(yAxis)
        rotate()
    }
    else if (direction.code == 'KeyS' || direction.code == "ArrowDown") {
        if (yAxis < gameAreaSetup.height-pacman.dim) {
            if (yAxis >= gameAreaSetup.height-pacman.movement) yAxis = gameAreaSetup.height; 
            else yAxis += pacman.movement; //using .movement allows game speed to be changed easily
        }
        console.log(yAxis)
    } 
    else if (direction.code == 'KeyA' || direction.code == "ArrowLeft") {
        if (xAxis > 0) {
            if (xAxis <= pacman.movement) xAxis -= xAxis;
            else xAxis -= pacman.movement; 
        }
        console.log(xAxis)
    } 
    else if (direction.code == 'KeyD' || direction.code == "ArrowRight") {
        if (xAxis < gameAreaSetup.width-pacman.dim) {
            if (xAxis >= gameAreaSetup.width-pacman.movement) xAxis = gameAreaSetup.width; 
            else xAxis += pacman.movement;
        } // gameAreaSetup.width/height allows for this function to be flexible to arena changes
        console.log(xAxis)
    }
});

function rotate() {
    game.translate(xAxis, yAxis)
    game.rotate(-90 * Math.PI/180)
    game.translate(-xAxis, -yAxis)
    game.clearRect(0,0,640,800)
    game.drawImage(sprites, 32, 0, 32, 32, xAxis-20, yAxis-20, pacman.dim, pacman.dim)
}

sprites.src = "images/Pacman.png";

