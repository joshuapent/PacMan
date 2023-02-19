// const images = {
//     blue: ['images/blueghost1.png', 'images/blueghost2.png'],
//     brown: ['images/brownghost1.png', 'images/brownghost2.png'],
//     red: ['images/redghost1.png', 'images/redghost2.png'],
//     pink: ['images/pinkghost1.png', 'images/pinkghost2.png'],
//     dark: ['images/darkghost1A.png', 'images/darkghost2A.png', 'images/darkghost1B.png', 'images/darkghost2B.png'],
//     pacman: ['images/pacman1.png', 'images/pacman2.png', 'images/pacman3.png']
// };
// const ghosts = [
//     document.getElementById('ghost1'), 
//     document.getElementById('ghost2'),
//     document.getElementById('ghost3'),
//     document.getElementById('ghost4')
// ];
// const pacman = document.getElementById('pacman')
// const gameAreaSetup = document.getElementById('GameArea');
// const game = gameAreaSetup.getContext("2d");

// // let randomvar = 0;
// function pacManMoves() {
//     if (randomvar < images.pacman.length) {
//         pacman.setAttribute("src", images.pacman[randomvar])
//         randomvar++;
//     } else if (randomvar === images.pacman.length) {
//         pacman.setAttribute("src", images.pacman[1]);
//         randomvar -= 3;
//     }
// }
// // const pacmanmoves = setInterval(pacManMoves, 100); //100 is the sweet spot

// function ghostMoves () {
//     if (randomvar === 0) {
//         ghosts[0].setAttribute("src", images.red[0])
//         randomvar++;
//     } else if (randomvar === 1) {
//         ghosts[0].setAttribute("src", images.red[1])
//         randomvar--;
//     }
// }
// // const ghostMoveTimer = setInterval(ghostMoves, 300); //100 is the sweet spot

// function pacmanMoves() {
//     if (pacmanvar < pacman.spriteNum) {
//         game.clearRect(0,0,640,800)
//         game.drawImage(sprites, pacmanvar*32, 0, 32, 32, xAxis, yAxis, 32, 32)
//         pacmanvar++;
//     } else {
//     game.clearRect(0,0,640,800)
//     game.drawImage(sprites, 32, 0, 32, 32, xAxis, yAxis, 32, 32)
//     pacmanvar = 0;
//     }
//     setTimeout(100)
// }