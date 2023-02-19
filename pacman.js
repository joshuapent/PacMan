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
let row = 0;
let column = 0;

sprites.onload = function() {
    game.drawImage(sprites, column*32, row*32, 32, 32, 200, 100, 32, 32);

}


sprites.src = "images/Pacman.png";