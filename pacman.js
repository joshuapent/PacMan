const sprites = new Image();
const gameImg = new Image();
const backgroundImg = new Image();
const countdownImg1 = new Image();
const countdownImg2 = new Image();
const countdownImg3 = new Image();
const startImg = new Image();
const gameOverImg = new Image();
const gameAreaSetup = document.getElementById('GameArea');
const game = gameAreaSetup.getContext('2d');
const ghostSetup = document.getElementById('ghosts');
const ghostZone = ghostSetup.getContext('2d');
const ghostEraseSetup = document.getElementById('ghosterase');
const ghostErase = ghostEraseSetup.getContext('2d');
const backgroundSetup = document.getElementById('background');
const background = backgroundSetup.getContext('2d');
const countdownSetup = document.getElementById('start');
const countdown = countdownSetup.getContext('2d');
class Sprite {
    constructor(name, row, column, spriteNum, movement, xAxis, yAxis, direction) {
        this.name = name; //helps for if/else statements
        this.row = row; // this is for sprite location
        this.column = column; //this is for sprite location
        this.spriteNum = spriteNum; //this is how many imgs to cycle between
        this.movement = movement; // speed of movement
        this.xAxis = xAxis; //marks current location
        this.yAxis = yAxis; 
        this.direction = direction; //which way are they going
    }
    dim = 32; // dim = dimensions
    directionI = 0; // placeholder for sprite calling.
    momentum = null;
    placeholder; // u
    isBlocked = false; //checks if the character's movement is blocked or not
    isDetected = false; //checks if the direction is blocked
    dead = false; //checks if pacman is dead
    lifeLost = false; //checks if pacman lost a life and runs a function if so
    powerOrb = false; //checks if pacman has an active powerOrb
    visited = [];
    pointLocation = [[22, 22], [38, 22], [54, 22], [70, 22] [86, 22], [102, 22], [118, 22], 
                     [406, 22], [422, 22], [436, 22], [452, 22], [468, 22], [484, 22], [502, 22],
                     [22, 38], [22, 54], [22, 70], [22, 86], [22, 102], [22, 118], [22, 134], [22, 150], [22, 166], [22, 182], [22, 198], [38, 102], [54, 102], [70, 102], [86, 102], [102, 102],
                     [118, 38], [118, 54], [118, 70], [118, 86], [118, 102], [118, 118], [118, 134], [118, 150], [118, 166], [118, 182], [118, 198], [134, 86], [150, 86], [166, 86], [182, 38], [182, 54], [182, 70], [182, 86], [182, 102], [182, 118], [198, 118], [214, 118], [230, 118], [246, 118], [262, 118], [278, 118], [294, 118], [310, 118], [326, 118], [342, 118], [342, 38], [342, 54], [342, 70], [342, 86], [342, 102], [342, 118], [262, 134], [262, 150], [262, 166], [262, 182], [262, 198], [358, 86], [374, 86], [390, 86], [406, 38], [306, 54], [406, 70], [406, 86], [406, 102], [406, 118], [406, 134], [406, 150], [406, 166], [406, 182], [406, 198], [422, 102], [438, 102], [454, 102], [470, 102], [486, 102], [502, 38], [502, 54], [502, 70], [502, 86], [502, 102], [502, 118], [502, 134], [502, 150], [502, 166], [502, 182], [502, 198], [38, 214], [54, 214], [70, 214], [86, 214], [102, 214], [118, 214], [134, 214], [150, 214], [166, 214], [182, 214], [198, 214], [214, 214], [230, 214], [246, 214], [262, 214], [278, 214], [294, 214], [310, 214], [326, 214], [342, 214], [358, 214], [374, 214], [390, 214], [406, 214], [422, 214], [438, 214], [454, 214], [470, 214],  [486, 214], [86, 230], [86, 246], [86, 262], [82, 278], [82, 294], [82, 310], [166, 230], [166, 246], [166, 262], [166, 278], [166, 294], [166, 310], [358, 230], [358, 246], [358, 262], [358, 278], [358, 294], [358, 310], [438, 230], [438, 246], [438, 262], [438, 278], [438, 294], [438, 310], //top half
                     
]
    obstacleArray = [
        [0, 648, 528, 8], [0, 0, 528, 8], [0, 0, 8, 238], [0, 418, 8, 238], [520, 418, 8, 238], [520, 0, 8, 238], //these are the 6 boundaries
        [200, 552, 128, 104], [200, 0, 128, 104], [136, 0, 32, 72], [360, 0, 32, 72], [136, 584, 32, 72], [360, 584, 32, 72], [-32, 232, 104, 80], [-32, 344, 104, 80], [456, 232, 104, 80], [456, 344, 104, 80], //these are the 10 boundary bulges
        [40, 568, 64, 48], [40, 40, 64, 48], [424, 40, 64, 48], [424, 568, 64, 48],  //4 corner boxes 
        [40, 456, 64, 80], [424, 456, 64, 80], [424, 120, 64, 80], [40, 120, 64, 80], //4 next to corner boxes
        [136, 104, 32, 32], [360, 104, 32, 32], [136, 520, 32, 32], [360, 520, 32, 32], //4 mini boxes
        [136, 456, 80, 64],  [312, 456, 80, 64], [280, 136, 112, 64], [136, 136, 112, 64], //attached to mini boxes
        [248, 456, 32, 64], [104, 344, 144, 80], [280, 344, 144, 80], //these are the other 3 bottom boxes
        [104, 232, 48, 80], [376 ,232, 48, 80], [184, 232, 160, 80]// these are the other 3 top boxes
    ]
    ghostObstacle = [
        [561, 0, 561, 600], [-33, 0, -33, 600], //two new boundaries
        [0, 648, 528, 8], [0, 0, 528, 8], [0, 0, 8, 238], [0, 418, 8, 238], [520, 418, 8, 238], [520, 0, 8, 238], //these are the 6 boundaries
        [200, 552, 128, 104], [200, 0, 128, 104], [136, 0, 32, 72], [360, 0, 32, 72], [136, 584, 32, 72], [360, 584, 32, 72], [-32, 232, 104, 192], [456, 232, 104, 192], //these are the 8 boundary bulges
        [40, 568, 64, 48], [40, 40, 64, 48], [424, 40, 64, 48], [424, 568, 64, 48],  //4 corner boxes 
        [40, 456, 64, 80], [424, 456, 64, 80], [424, 120, 64, 80], [40, 120, 64, 80], //4 next to corner boxes
        [136, 104, 32, 32], [360, 104, 32, 32], [136, 520, 32, 32], [360, 520, 32, 32], //4 mini boxes
        [136, 456, 80, 64],  [312, 456, 80, 64], [280, 136, 112, 64], [136, 136, 112, 64], //attached to mini boxes
        [248, 456, 32, 64], [104, 344, 144, 80], [280, 344, 144, 80], //these are the other 3 bottom boxes
        [104, 232, 48, 80], [376 ,232, 48, 80], [184, 232, 160, 80],// these are the other 3 top boxes
        [184, 232, 64, 2], [280, 232, 64, 2], [184, 232, 32, 80], [312, 232, 64, 32], [184, 310, 160, 2],//ghost box
        [248, 232, 32, 2]//ghost box special case
    ]
    obstacle(x, y, width, height) {
        if (this.momentum == 'up') {
            if (this.xAxis > x-32 && this.xAxis < x+width && this.yAxis-1 >= y-32 && this.yAxis <= y+height) return this.isBlocked = true; 
        }
        else if (this.momentum == 'down') {
            if (this.xAxis > x-32 && this.xAxis < x+width && this.yAxis >= y-32 && this.yAxis <= y+height-1) return this.isBlocked = true; 
        }
        else if (this.momentum == 'right') {
            if (this.xAxis >= x-32 && this.xAxis <= x+width-1 && this.yAxis > y-32 && this.yAxis < y+height) return this.isBlocked = true; 
        }
        else if (this.momentum == 'left') {
            if (this.xAxis-1 >= x-32 && this.xAxis <= x+width && this.yAxis > y-32 && this.yAxis < y+height) return this.isBlocked = true; 
        }
        return this.isBlocked = false
    }
    detection(x, y, width, height) {
        if (this.direction == 'up') {
            if (this.xAxis > x-32 && this.xAxis < x+width && this.yAxis-1 >= y-32 && this.yAxis <= y+height) 
            return this.isDetected = true;
        }
        else if (this.direction == 'down') {
            if (this.xAxis > x-32 && this.xAxis < x+width && this.yAxis >= y-32 && this.yAxis <= y+height-1) 
            return this.isDetected = true; 
        }
        else if (this.direction == 'right') {
            if (this.xAxis >= x-32 && this.xAxis <= x+width-1 && this.yAxis > y-32 && this.yAxis < y+height)  return this.isDetected = true; 
        }
        else if (this.direction == 'left') {
            if (this.xAxis-1 >= x-32 && this.xAxis <= x+width && this.yAxis > y-32 && this.yAxis < y+height) return this.isDetected = true; 
        }
        return this.isDetected = false
    }
    pacmanConnect() { 
        for (let i = 0; i < this.obstacleArray.length; i++) {
            if (this.obstacle(...this.obstacleArray[i]) === true) break;
        }
        for (let i = 0; i < this.obstacleArray.length; i++) {
            if (this.detection(...this.obstacleArray[i]) === true) break;
        }
        this.move();
        this.points();
        if (pacman.dead === true) return;
        if (pacman.lifeLost === true) return newLife();
        setTimeout(() => {
            this.pacmanConnect();
        }, 60);
    }
    points() {
        for (let i = 0; i < this.visited.length; i++) {
                if (this.visited[i] !== this.xAxis) {
                    this.visited.push(this.xAxis)
                    totalPoints += 1;
                    console.log(this.visited)
                    console.log(totalPoints)
                    return;
            }
        } return;
    }
    move() {
        if (this.momentum === null) this.momentum = this.direction
        this.placeholder = this.momentum;
        this.momentum = this.direction
        if (this.isDetected === true) this.momentum = this.placeholder;
        if (this.momentum === 'up') {
            if (this.isBlocked == false) {
            this.directionI = this.column+3;
            this.yAxis -= this.movement;
            if (this.name === 'pacman') {
                game.clearRect(this.xAxis+2,this.yAxis+this.movement,28,30)
            } else {
                ghostZone.clearRect(this.xAxis,this.yAxis+this.movement,30,30)
            }
            }
        }
        if (this.momentum === 'down') {
            if (this.isBlocked === false) {
            this.directionI = this.column+5;
            this.yAxis += this.movement; //using .movement allows game speed to be changed easily
            if (this.name === 'pacman') {
                game.clearRect(this.xAxis+2,this.yAxis-this.movement,28,30)
            } else {
                ghostZone.clearRect(this.xAxis,this.yAxis-this.movement,30,30)

            }
            }
        }
        else if (this.momentum === 'left') {
            if (this.isBlocked === false) {
            this.directionI = this.column+1;
            this.xAxis -= this.movement; 
            if (this.name === 'pacman') {
                game.clearRect(this.xAxis+this.movement,this.yAxis+2,30,28)
                if (pacman.xAxis <= -32) pacman.xAxis = 528 // this allows for teleporting
            } else {
                ghostZone.clearRect(this.xAxis+this.movement,this.yAxis+2,30,28)
            }
            }
        }
        else if (this.momentum === 'right') {
            if (this.isBlocked === false) {
            this.directionI = this.column-1;
            this.xAxis += this.movement;
            if (this.name === 'pacman') {
                game.clearRect(this.xAxis-this.movement,this.yAxis+2,30,28)
                if (pacman.xAxis >= 528) pacman.xAxis = -32 // this allows for teleporting
            } else {
                ghostZone.clearRect(this.xAxis-this.movement,this.yAxis+2,30,28)

            }
            }
        };
        this.animate();
    }
    animate() {
        if(this.column < this.column + this.spriteNum && this.isBlocked == false) {
            if (this.name === 'pacman') {
                game.drawImage(sprites, (this.spriteNum+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
            // } else if (this.dead = true) {
            //     ghostZone.drawImage(sprites, (this.spriteNum+(this.directionI/2)) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
            } else if (pacman.powerOrb === true) {
                ghostZone.drawImage(sprites, 32, 5*32, 32, 32, this.xAxis, this.yAxis, 32, 32)
            } else {
                ghostZone.drawImage(sprites, (this.spriteNum+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
            }
            this.spriteNum--;
        } else if (this.isBlocked == false) {
            if (this.name === 'pacman') {
                game.drawImage(sprites, 0, 0, 32, 32, this.xAxis, this.yAxis, 32, 32)
                this.spriteNum = 2
            } else if (pacman.powerOrb === true) {
                ghostZone.drawImage(sprites, 1, 5*32, 32, 32, this.xAxis, this.yAxis, 32, 32)
                this.spriteNum = 1;
            } else {
                ghostZone.drawImage(sprites, (this.spriteNum+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
                this.spriteNum = 1;
            }
        } else if (this.isBlocked == true) {
            if (this.name === 'pacman') {
                game.drawImage(sprites, (this.column+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
            } else if (pacman.powerOrb === true) {
                ghostZone.drawImage(sprites, 1, 5*32, 32, 32, this.xAxis, this.yAxis, 32, 32)
            } else {
                ghostZone.drawImage(sprites, (this.column+this.directionI) * this.dim, this.row * this.dim, 32, 32, this.xAxis, this.yAxis, 32, 32)
            }
        } 
    }
    lostlife() {
        if (pacman.xAxis + pacman.dim > this.xAxis && pacman.xAxis < this.xAxis + this.dim && pacman.yAxis + pacman.dim > this.yAxis && pacman.yAxis < this.yAxis + this.dim) {
            pacmanLives -= 1;
            ghostZone.clearRect(216+(32*(pacmanLives)), 16, 32, 32)
            if (pacmanLives > 0) return pacman.lifeLost = true;
            }
            if (pacmanLives <= 0) {
            countdown.drawImage(gameOverImg, 0, 0)
            return pacman.dead = true;
            } return;
    }
    ghostChoice() {
        this.placeholder = this.direction;
        let headsOrTails = Math.floor(Math.random() * 2)
        let lookAround = Math.floor(Math.random() * 12)
        let decision = Math.floor(Math.random() * 12)
        if (this.isBlocked === true) {
            if (decision <= 2) return this.momentum = 'up'
            else if (decision <= 5) return this.momentum = 'right'
            else if (decision <= 8) return this.momentum = 'left'
            else if (decision <= 11) return this.momentum = 'down'
        }
        if (this.isDetected === false && this.isBlocked === false) {
            if (lookAround <= 2) return this.direction = 'up'
            else if (lookAround <= 5) return this.direction = 'right'
            else if (lookAround <= 8) return this.direction = 'left'
            else if (lookAround <= 11) return this.direction = 'down'
        }
        
    }
    ghostAI() {
        // if (this.momentum === null) this.momentum = 'right';
        if (this.direction === 'neutral') this.direction = 'up';
        for (let i = 0; i < this.obstacleArray.length; i++) {
            if (this.obstacle(...this.ghostObstacle[i]) === true) break;
        }
        for (let i = 0; i < this.obstacleArray.length; i++) {
            if (this.detection(...this.ghostObstacle[i]) === true) break;
        }
        // if (this.isDetected === false) this.ghostChoice();
        this.move(); 
        this.ghostChoice();
        this.lostlife();
        if (pacman.dead === true) return;
        if (pacman.lifeLost === true) return;
        setTimeout(() => {
            this.ghostAI();
        }, 60)
        }
};
const pacman = new Sprite('pacman', 0, 1, 2, 8, 248, 520, 'neutral'); //establishing the onscreen characters 
const redGhost = new Sprite('red', 1, 1, 2, 8, 248, 200, 'neutral') //this is all I need for a functioning red ghost
const pinkGhost = new Sprite('pink', 2, 1, 2, 8, 230, 255, 'neutral')
const blueGhost = new Sprite('blue', 3, 1, 2, 8, 265, 255, 'neutral')
const brownGhost = new Sprite('brown', 4, 1, 2, 8, 300, 255, 'neutral')
let totalPoints = 0;

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
let pacmanLives = 3;
function newLife() {
    if (pacman.dead === true) return;
    setTimeout(() => {
    game.clearRect(pacman.xAxis, pacman.yAxis, 32, 32)
    pacman.xAxis = 248;
    pacman.yAxis = 520;
    ghostZone.clearRect(redGhost.xAxis, redGhost.yAxis, 32, 32)
    redGhost.xAxis = 248;
    redGhost.yAxis = 200;
    pacman.lifeLost = false;
    game.drawImage(sprites, 0, 0, 32, 32, pacman.xAxis, pacman.yAxis, 32, 32)
    ghostZone.drawImage(sprites, 0, 32, 32, 32, redGhost.xAxis, redGhost.yAxis, 32, 32)
    ghostZone.drawImage(sprites, 0, 64, 32, 32, pinkGhost.xAxis, pinkGhost.yAxis, 32, 32)
    ghostZone.drawImage(sprites, 0, 96, 32, 32, blueGhost.xAxis, blueGhost.yAxis, 32, 32)
    ghostZone.drawImage(sprites, 0, 128, 32, 32, brownGhost.xAxis, brownGhost.yAxis, 32, 32)  
    countdown.drawImage(countdownImg3, 0, 0)
    }, 3000)
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        countdown.drawImage(countdownImg2, 0, 0)
    }, 4000)
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        countdown.drawImage(countdownImg1, 0, 0)
    }, 5000)
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        countdown.drawImage(startImg, 0, 0)
    }, 6000)
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        pacman.pacmanConnect();
        redGhost.ghostAI();
    }, 7000)
}




gameImg.onload = function() { //sets up all of the assets on website load, some are on timers.
    background.drawImage(backgroundImg, 0, 0)
    game.drawImage(gameImg, 0, 0)
    setTimeout(() => {
        game.drawImage(sprites, 0, 0, 32, 32, pacman.xAxis, pacman.yAxis, 32, 32)
        ghostZone.drawImage(sprites, 0, 32, 32, 32, redGhost.xAxis, redGhost.yAxis, 32, 32)
        ghostZone.drawImage(sprites, 0, 64, 32, 32, pinkGhost.xAxis, pinkGhost.yAxis, 32, 32)
        ghostZone.drawImage(sprites, 0, 96, 32, 32, blueGhost.xAxis, blueGhost.yAxis, 32, 32)
        ghostZone.drawImage(sprites, 0, 128, 32, 32, brownGhost.xAxis, brownGhost.yAxis, 32, 32)  
        countdown.drawImage(countdownImg3, 0, 0)
        ghostZone.drawImage(sprites, 32, 0, 32, 32, 216, 16, 32, 32)
    }, 1000);
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        countdown.drawImage(countdownImg2, 0, 0)
        ghostZone.drawImage(sprites, 32, 0, 32, 32, 248, 16, 32, 32)
    }, 2000);
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        countdown.drawImage(countdownImg1, 0, 0)
        ghostZone.drawImage(sprites, 32, 0, 32, 32, 280, 16, 32, 32)
    }, 3000);
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        countdown.drawImage(startImg, 0, 0)
    }, 4000);
    setTimeout(() => {
        countdown.clearRect(0,0,800, 800)
        pacman.pacmanConnect();
        redGhost.ghostAI();
    }, 5000);
}

countdownImg1.src = 'images/countdown1.png';
countdownImg2.src = 'images/countdown2.png';
countdownImg3.src = 'images/countdown3.png';
startImg.src = 'images/start.png';
sprites.src = 'images/Pacman.png';
backgroundImg.src = 'images/background.png';
gameImg.src = 'images/points.png';
gameOverImg.src = 'images/GameOver.png';
