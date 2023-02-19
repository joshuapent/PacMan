const sprites = new Image();
const gameAreaSetup = document.getElementById('GameArea');
const game = gameAreaSetup.getContext("2d");
class Sprite {
    constructor(name, row, column, spriteNum, movement, xAxis, yAxis, direction, radius) {
        this.name = name;
        this.row = row; // this is for sprite location
        this.column = column; //this is for sprite location
        this.spriteNum = spriteNum; //this is how many imgs to cycle between
        this.movement = movement;
        this.xAxis = xAxis;
        this.yAxis = yAxis; 
        this.radius = radius;
        this.direction = direction;
    }
    dim = 32; // dim = dimensions
    hitbox = 15; //hitbox is slightly less than half dim because of blank space around sprites
    directionI = 0;
    // placeholder = this.spriteNum;
    movement() {
        this.animate();
        }
    animate() { //makes the sprite animated, ex: Pacman moves his mouth.
        if (this.direction === "up") {
            game.clearRect(this.xAxis,this.yAxis+this.movement,32,32)
            this.directionI = this.column+2;
        }
        else if (this.direction === "down") {
            game.clearRect(this.xAxis,this.yAxis-this.movement,32,32)
            this.directionI = this.column+6;
        }
        else if (this.direction === "left") {
            game.clearRect(this.xAxis+this.movement,this.yAxis,32,32)
            this.directionI = this.column+4;
        }
        else if (this.direction === "right") {
            game.clearRect(this.xAxis-this.movement,this.yAxis,32,32)
            this.directionI = this.column;
        };
        if(this.column < this.column + this.spriteNum) {
            game.drawImage(sprites, (this.column+this.spriteNum+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
            this.spriteNum--;
            console.log(this.spriteNum)
        } else {
            if (this.name == "pacman") {
                game.drawImage(sprites, 0, 0, 32, 32, this.xAxis, this.yAxis, 32, 32)
                this.spriteNum = 2
            }
            else {
                game.drawImage(sprites, (this.column+this.spriteNum+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
                this.spriteNum = 2;
                console.log(this.spriteNum)
            }
        } 
        setTimeout(100)
    }

};
const pacman = new Sprite("pacman", 0, 0, 2, 8, 200, 200, "up");
let pacmanvar = 0;

// let yAxis = gameAreaSetup.height/2; //using gameAreaSetup allows for this to change with arena size
// let xAxis = gameAreaSetup.width/2; 



document.addEventListener('keydown', (direction) => {
    pacman.animate();
    if (direction.code == 'KeyW' || direction.code == "ArrowUp") {
        if (pacman.yAxis > 0) {
            if (pacman.yAxis <= pacman.movement) pacman.yAxis -= pacman.yAxis;
            else pacman.yAxis -= pacman.movement; 
            console.log(pacman.yAxis)
            pacman.direction = "up" 
            }
    }
    else if (direction.code == 'KeyS' || direction.code == "ArrowDown") {
        if (pacman.yAxis < gameAreaSetup.height-pacman.dim) {
            if (pacman.yAxis >= gameAreaSetup.height-pacman.movement) pacman.yAxis = gameAreaSetup.height; 
            else pacman.yAxis += pacman.movement; //using .movement allows game speed to be changed easily
            pacman.direction = "down" 
        }
        console.log(pacman.yAxis)
    } 
    else if (direction.code == 'KeyA' || direction.code == "ArrowLeft") {
        if (pacman.xAxis > 0) {
            if (pacman.xAxis <= pacman.movement) pacman.xAxis -= pacman.xAxis;
            else pacman.xAxis -= pacman.movement; 
            pacman.direction = "left" 
        }
        console.log(pacman.xAxis)
    } 
    else if (direction.code == 'KeyD' || direction.code == "ArrowRight") {
        if (pacman.xAxis < gameAreaSetup.width-pacman.dim) {
            if (pacman.xAxis >= gameAreaSetup.width-pacman.movement) pacman.xAxis = gameAreaSetup.width; 
            else pacman.xAxis += pacman.movement;
            pacman.direction = "right"
        } // gameAreaSetup.width/height allows for this function to be flexible to arena changes
        console.log(pacman.xAxis)
    }
});



sprites.src = "images/Pacman.png";

