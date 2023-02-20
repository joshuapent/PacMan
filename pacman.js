const sprites = new Image();
const gameAreaSetup = document.getElementById('GameArea');
const game = gameAreaSetup.getContext("2d");
class Sprite {
    constructor(name, row, column, spriteNum, movement, xAxis, yAxis, direction, radius) {
        this.name = name; //helps for if/else statements
        this.row = row; // this is for sprite location
        this.column = column; //this is for sprite location
        this.spriteNum = spriteNum; //this is how many imgs to cycle between
        this.movement = movement; // speed of movement
        this.xAxis = xAxis; //marks current location
        this.yAxis = yAxis; 
        this.radius = radius; // this is for hitboxes
        this.direction = direction; //which way are they going
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
            if (pacman.yAxis > 0) {
            if (pacman.yAxis <= pacman.movement) pacman.yAxis -= pacman.yAxis; //if pacman is close to a wall, this ensures he doesnt walk through it
            else pacman.yAxis -= pacman.movement; 
            game.clearRect(this.xAxis,this.yAxis+this.movement,32,32)
            this.directionI = this.column+3;
            }
        }
        else if (this.direction === "down") {
            if (pacman.yAxis < gameAreaSetup.height-pacman.dim) {
            if (pacman.yAxis >= gameAreaSetup.height-pacman.movement) pacman.yAxis = gameAreaSetup.height; 
            else pacman.yAxis += pacman.movement; //using .movement allows game speed to be changed easily
            game.clearRect(this.xAxis,this.yAxis-this.movement,32,32)
            this.directionI = this.column+5;
            }
        }
        else if (this.direction === "left") {
            if (pacman.xAxis > 0) {
            if (pacman.xAxis <= pacman.movement) pacman.xAxis -= pacman.xAxis;
            else pacman.xAxis -= pacman.movement; 
            game.clearRect(this.xAxis+this.movement,this.yAxis,32,32)
            this.directionI = this.column+1;
            }
        }
        else if (this.direction === "right") {
            if (pacman.xAxis < gameAreaSetup.width-pacman.dim) {    
            if (pacman.xAxis >= gameAreaSetup.width-pacman.movement) pacman.xAxis = gameAreaSetup.width; 
            else pacman.xAxis += pacman.movement;
            game.clearRect(this.xAxis-this.movement,this.yAxis,32,32)
            this.directionI = this.column-1;
            }
        };
        if(this.column < this.column + this.spriteNum) {
            game.drawImage(sprites, (this.spriteNum+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
            this.spriteNum--;
            console.log(this.spriteNum)
        } else {
            if (this.name == "pacman") {
                game.drawImage(sprites, 0, 0, 32, 32, this.xAxis, this.yAxis, 32, 32)
                this.spriteNum = 2
            }
            else {
                game.drawImage(sprites, (this.spriteNum+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
                this.spriteNum = 2;
                console.log(this.spriteNum)
            }
        } 
        // setTimeout(100)
    }

};
const pacman = new Sprite("pacman", 0, 1, 2, 8, 200, 200, "up"); //establishing the onscreen characters 
const red = new Sprite("red", 1, 0, 1, 8, 200, 200, "up")

document.addEventListener('keydown', (direction) => { //this function detects arrow pushes for pacman's movement
    pacman.animate();
    if (direction.code == 'KeyW' || direction.code == "ArrowUp") {
            pacman.direction = "up" 
            }
    else if (direction.code == 'KeyS' || direction.code == "ArrowDown") {
            pacman.direction = "down" 
        }
    else if (direction.code == 'KeyA' || direction.code == "ArrowLeft") {
            pacman.direction = "left" 
        }
    else if (direction.code == 'KeyD' || direction.code == "ArrowRight") {
            pacman.direction = "right"
        }
});






sprites.src = "images/Pacman.png";

