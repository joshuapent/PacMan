const sprites = new Image();
const gameAreaSetup = document.getElementById('GameArea');
const game = gameAreaSetup.getContext("2d");

// const pacman = {
//     width: 16,
//     height: 16,
//     row: 1, 
//     column: 3
// }

// game.drawImage(sprites, 3*16, 16, 16, 
//     16, 10, 30, 16, 16);
let frameWidth = 16;
let frameHeight = 16;

// Rows and columns start from 0
let row = 1;
let column = 3;

sprites.onload = function() {
    game.drawImage(sprites, column*frameWidth, row*frameHeight, frameWidth, frameHeight, 16, 16, frameWidth, frameHeight);

}


sprites.src = "images/PacManSprites.png";