const sprites = new Image();
const gameImg = new Image();
const backgroundImg = new Image();
const countdownImg1 = new Image();
const countdownImg2 = new Image();
const countdownImg3 = new Image();
const startImg = new Image();
const gameAreaSetup = document.getElementById('GameArea');
const game = gameAreaSetup.getContext('2d');
const ghostSetup = document.getElementById('ghosts');
const ghostZone = ghostSetup.getContext('2d');
const backgroundSetup = document.getElementById('background');
const background = backgroundSetup.getContext('2d');
const countdownSetup = document.getElementById('start');
const countdown = countdownSetup.getContext('2d');
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
    directionI = 0; // placeholder for sprite calling.d
    isBlocked = false; //checks if the user is blocked or not
    obstacleArray = [
        [0, 648, 528, 8], [0, 0, 528, 8], [0, 0, 8, 238], [0, 418, 8, 238], [520, 418, 8, 238], [520, 0, 8, 238],//these are the 6 boundaries
        [200, 552, 128, 104], [200, 0, 128, 104], [136, 0, 32, 72], [360, 0, 32, 72], [136, 584, 32, 72], [360, 584, 32, 72], [0, 232, 72, 80], [0, 344, 72, 80], [456, 232, 72, 80], [456, 344, 72, 80], //these are the 10 boundary bulges
        [40, 568, 64, 48], [40, 40, 64, 48], [424, 40, 64, 48], [424, 568, 64, 48],  //4 corner boxes 
        [40, 456, 64, 80], [424, 456, 64, 80], [424, 120, 64, 80], [40, 120, 64, 80], //4 next to corner boxes
        [136, 104, 32, 32], [360, 104, 32, 32], [136, 520, 32, 32], [360, 520, 32, 32], //4 mini boxes
        [136, 456, 80, 64],  [312, 456, 80, 64], [280, 136, 112, 64], [136, 136, 112, 64], //attached to mini boxes
        [248, 456, 32, 64], [104, 344, 144, 80], [280, 344, 144, 80], //these are the other 3 bottom boxes
        [104, 232, 48, 80], [376 ,232, 48, 80], [184, 232, 160, 80]// these are the other 3 top boxes
    ]
    obstacle(x, y, width, height) {
        if (this.direction == "up") {
            if (this.xAxis > x-32 && this.xAxis < x+width && this.yAxis-1 >= y-32 && this.yAxis <= y+height) return this.isBlocked = true; 
        }
        else if (this.direction == "down") {
            if (this.xAxis > x-32 && this.xAxis < x+width && this.yAxis >= y-32 && this.yAxis <= y+height-1) return this.isBlocked = true; 
        }
        else if (this.direction == "right") {
            if (this.xAxis >= x-32 && this.xAxis <= x+width-1 && this.yAxis > y-32 && this.yAxis < y+height) return this.isBlocked = true; 
        }
        else if (this.direction == "left") {
            if (this.xAxis-1 >= x-32 && this.xAxis <= x+width && this.yAxis > y-32 && this.yAxis < y+height) return this.isBlocked = true; 
        }
        return this.isBlocked = false
    }
    animate() { //makes the sprite animated, ex: Pacman moves his mouth.
        for (let i = 0; i < this.obstacleArray.length; i++) {
            if (this.obstacle(...this.obstacleArray[i]) === true) break;
        }
        if (this.direction === 'up') {
            this.directionI = this.column+3;
            if (this.isBlocked === true) {
                // this.yAxis += this.movement; 
                // this.yAxis -= this.movement;
                game.clearRect(this.xAxis+2,this.yAxis+2,28,28)
            }
            else { 
                this.yAxis -= this.movement;
                game.clearRect(this.xAxis+2,this.yAxis+this.movement,28,30)
            }
        }
        if (this.direction === 'down') {
            this.directionI = this.column+5;
            if (this.isBlocked === true) {
                // this.yAxis -= this.movement; 
                // this.yAxis += this.movement; 
                game.clearRect(this.xAxis+2,this.yAxis+2,28,28)
            }
            else {
                this.yAxis += this.movement; //using .movement allows game speed to be changed easily
                game.clearRect(this.xAxis+2,this.yAxis-this.movement,28,30)
            }
        }
        else if (this.direction === 'left') {
            this.directionI = this.column+1;
            if (pacman.xAxis <= -32) pacman.xAxis = 528 // this allows for teleporting
            if (this.isBlocked === true) {
                // this.xAxis -= this.movement; 
                // this.xAxis += this.movement; 
                game.clearRect(this.xAxis+2,this.yAxis+2,28,28)
            }
            else {
                this.xAxis -= this.movement; 
                game.clearRect(this.xAxis+this.movement,this.yAxis+2,30,28)
            }
        }
        else if (this.direction === 'right') {
            this.directionI = this.column-1;
            if (pacman.xAxis >= 528) pacman.xAxis = -32 // this allows for teleporting
            if (this.isBlocked === true) {
                // this.xAxis -= this.movement; 
                // this.xAxis += this.movement; 
                game.clearRect(this.xAxis+2,this.yAxis+2,28,28)
            }
            else {
                this.xAxis += this.movement;
                game.clearRect(this.xAxis-this.movement,this.yAxis+2,30,28)
            }
        };
        if(this.column < this.column + this.spriteNum && this.isBlocked == false) {
            game.drawImage(sprites, (this.spriteNum+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
            this.spriteNum--;
        } else if (this.isBlocked == false) {
            if (this.name == 'pacman') {
                game.drawImage(sprites, 0, 0, 32, 32, this.xAxis, this.yAxis, 32, 32)
                this.spriteNum = 2
            }
            else {
                game.drawImage(sprites, (this.spriteNum+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
                this.spriteNum = 1;
            }
        } else if (this.isBlocked == true) {
                game.drawImage(sprites, (this.column+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
        } setTimeout(() => {
 
            this.animate();
        }, 50);
    }
};
const pacman = new Sprite("pacman", 0, 1, 2, 8, 248, 520, "neutral"); //establishing the onscreen characters 
const redGhost = new Sprite("red", 1, 1, 2, 8, 195, 255, "neutral") //this is all I need for a functioning red ghost
const pinkGhost = new Sprite("pink", 2, 1, 2, 8, 230, 255, "neutral")
const blueGhost = new Sprite("blue", 3, 1, 2, 8, 265, 255, "neutral")
const brownGhost = new Sprite("brown", 4, 1, 2, 8, 300, 255, "neutral")

document.addEventListener('keydown', (direction) => { //this function detects arrow pushes for pacman's movement
    if (direction.code == 'KeyW' || direction.code == 'ArrowUp') {
            pacman.direction = 'up'
            }
    else if (direction.code == 'KeyS' || direction.code == 'ArrowDown') {
            pacman.direction = 'down' 
        }
    else if (direction.code == 'KeyA' || direction.code == 'ArrowLeft') {
            pacman.direction = 'left'
        }
    else if (direction.code == 'KeyD' || direction.code == 'ArrowRight') {
            pacman.direction = 'right'
        }
});
function death() {
}




gameImg.onload = function() {
    background.drawImage(backgroundImg, 0, 0)
    game.drawImage(gameImg, 0, 0)

    setTimeout(() => {
        game.drawImage(sprites, 0, 0, 32, 32, pacman.xAxis, pacman.yAxis, 32, 32)
        ghostZone.drawImage(sprites, 0, 32, 32, 32, redGhost.xAxis, redGhost.yAxis, 32, 32)
        ghostZone.drawImage(sprites, 0, 64, 32, 32, pinkGhost.xAxis, pinkGhost.yAxis, 32, 32)
        ghostZone.drawImage(sprites, 0, 96, 32, 32, blueGhost.xAxis, blueGhost.yAxis, 32, 32)
        ghostZone.drawImage(sprites, 0, 128, 32, 32, brownGhost.xAxis, brownGhost.yAxis, 32, 32)  
        countdown.drawImage(countdownImg3, 0, 0)
    }, 1000);
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        countdown.drawImage(countdownImg2, 0, 0)
    }, 2000);
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        countdown.drawImage(countdownImg1, 0, 0)
    }, 3000);
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        countdown.drawImage(startImg, 0, 0)
    }, 4000);
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        pacman.animate();  
    }, 5000);
}

countdownImg1.src = 'images/countdown1.png'
countdownImg2.src = 'images/countdown2.png'
countdownImg3.src = 'images/countdown3.png'
startImg.src = 'images/start.png'
sprites.src = 'images/Pacman.png';
backgroundImg.src = 'images/background.png';
gameImg.src = 'images/points.png';
