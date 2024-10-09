let viewport = document.getElementById("viewport");
let pacman = document.getElementById("pacman");
let cherry = document.getElementById("cherry");
let scoreSpan = document.getElementById("scoreSpan");
let ghost1 = document.getElementById("ghost1");
let cherryX = 0;
let cherryY = 0;
let score = 0
let widthViewport = viewport.clientWidth;
let heightViewport = viewport.clientHeight;
let pacmanX = 0;
let pacmanY = 0;
let hammertime = new /* Ceci est la bibliothèque -->*/Hammer(viewport);

// Variables posX random cherry
let minX = 0;
let maxX = 0;
let differenceX = 0;
let randomNumberX = 0;
let randomValueX = 0;

// Variables posY random cherry
let minY = 0;
let maxY = 0;
let differenceY = 0;
let randomNumberY = 0;
let randomValueY = 0;

// Variables ghost
let ghost1X = 0;
let ghost1Y = 0;

let minGX = 0;
let maxGX = 0;
let differenceGX = 0;
let randomNumberGX = 0;
let randomValueGX = 0;

let minGY = 0;
let maxGY = 0;
let differenceGY = 0;
let randomNumberGY = 0;
let randomValueGY = 0;

let randomDirection = 0;

// GAME OVER SCREEN
let gameOver = document.getElementById("gameOver");

console.dir(viewport);

// --------- Définition des fonctions

// Generation aléatoire de la pos X et Y de la cerise
function randomCherryX() {
    minX = 0;
    maxX = Math.floor(viewport.clientWidth / 50); // Divide viewport width by 50
    differenceX = maxX - minX + 1;
    randomNumberX = Math.floor(Math.random() * differenceX);
    randomValueX = randomNumberX * 50;
    cherryX = randomValueX;
    if (cherryX !== 0) {
        cherryX -= 50;
    }
}

function randomCherryY() {
    minY = 0;
    maxY = Math.floor(viewport.clientHeight / 50); // Divide viewport height by 50
    differenceY = maxY - minY + 1;
    randomNumberY = Math.floor(Math.random() * differenceY);
    randomValueY = randomNumberY * 50;
    cherryY = randomValueY;
    if (cherryY === 0 || cherryY === 50) {
        cherryY += 100;
    } else {
        cherryY -= 100;
    }
}

// Vérification si la cerise a été manger
function checkCherry() {
    if (pacmanX === cherryX && pacmanY === cherryY) {
        score += 1;
        scoreSpan.innerHTML = score;
        randomCherryX();
        randomCherryY();
        cherry.style.transform = `translateX(${cherryX}px) translateY(${cherryY}px)`;
    }
}

// Fonction pour faire apparaitre le fantome aléatoirement
function randomGhost1Start() {
    minG1X = 0;
    maxG1X = Math.floor(viewport.clientWidth / 50); // Divide viewport width by 50
    differenceG1X = maxG1X - minG1X + 1;
    randomNumberG1X = Math.floor(Math.random() * differenceG1X);
    randomValueG1X = randomNumberG1X * 50;
    ghost1X = randomValueG1X;
    if (ghost1X !== 0) {
        ghost1X -= 50;
    }

    minG1Y = 0;
    maxG1Y = Math.floor(viewport.clientHeight / 50); // Divide viewport height by 50
    differenceG1Y = maxG1Y - minG1Y + 1;
    randomNumberG1Y = Math.floor(Math.random() * differenceG1Y);
    randomValueG1Y = randomNumberG1Y * 50;
    ghost1Y = randomValueG1Y;
    if (ghost1Y === 0 || ghost1Y === 50) {
        ghost1Y += 100;
    } else {
        ghost1Y -= 100;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveGhost1() {
    randomDirection = getRandomInt(1, 4);
    // 1 = left / 2 = up / 3 = right / 4 = down
    if (randomDirection === 1) {
        if (ghost1X <= 0) {
            ghost1X += 150;  
        } else {
            ghost1X -= 100;
        }
        ghost1.style.transform = `translateX(${ghost1X}px) translateY(${ghost1Y}px) scaleX(1)`;
    }
    if (randomDirection === 2) {
        if (ghost1Y <= 0) {
            ghost1Y += 150;  
        } else {
            ghost1Y -= 100;
        }
        ghost1.style.transform = `translateX(${ghost1X}px) translateY(${ghost1Y}px)`;
    }
    if (randomDirection === 3) {
        if (ghost1X >= viewport.clientWidth) {
            ghost1X -= 200;  
        } else {
            ghost1X += 100;
        }
        ghost1.style.transform = `translateX(${ghost1X}px) translateY(${ghost1Y}px) scaleX(-1)`;
    }
    if (randomDirection === 4) {
        if (ghost1Y >= viewport.clientHeight) {
            ghost1Y -= 200;  
        } else {
            ghost1Y += 100;
        }
        ghost1.style.transform = `translateX(${ghost1X}px) translateY(${ghost1Y}px)`;
    } 
}

function checkCollisionG1() {
    if (pacmanX === ghost1X && pacmanY === ghost1Y) {
        gameOver.style.transform = "scaleY(100%)";
        console.log("COLLISION HAPPENED");
    }
}

// Système de mouvement pacman
function movePacman(direction) {
    // condition qui définit les limites de deplacement de pacman
    // direction
    // pacmanX > 0                           = Gauche
    // pacmanY > 0                           = Haut
    // pacmanX < viewport.clientWidth - 110  = Droite
    // pacmanY < viewport.clientHeight - 130 = Bas
    switch (direction) {
        case "gauche":
            if (pacmanX > 0) {
                pacmanX -= 50;
            }
            checkCherry();
            moveGhost1();
            pacman.style.transform = "translate(" + pacmanX + "px," + pacmanY + "px) rotate(180deg)"
            checkCollisionG1();
            break;

        case "haut":
            if (pacmanY > 0) {
                pacmanY -= 50;
            }
            checkCherry();
            moveGhost1();
            pacman.style.transform = "translate(" + pacmanX + "px," + pacmanY + "px) rotate(270deg)"
            checkCollisionG1();
            break;

        case "droite":
            if (pacmanX < viewport.clientWidth - 110) {
                pacmanX += 50;
            }
            checkCherry();
            moveGhost1();
            pacman.style.transform = "translate(" + pacmanX + "px," + pacmanY + "px) rotate(0deg)"
            checkCollisionG1();
            break;

        case "bas":
            if (pacmanY < viewport.clientHeight - 130) {
                pacmanY += 50;
            }
            checkCherry();
            moveGhost1();
            pacman.style.transform = "translate(" + pacmanX + "px," + pacmanY + "px) rotate(90deg)"
            checkCollisionG1();
            break;

        default:
            break;
    }
    console.log("GHOST","Pos X:" + ghost1X, "Pos Y:" + ghost1Y);
    console.log("PACMAN","Pos X:" + pacmanX, "Pos Y:" + pacmanY);
}
// ----------------------------------------------------------------------

// Initialisation de la position du fantome
randomGhost1Start()
ghost1.style.transform = `translateX(${ghost1X}px) translateY(${ghost1Y}px)`;


// Initialisation de la position de la cerise
randomCherryX();
randomCherryY();
cherry.style.transform = `translateX(${cherryX}px) translateY(${cherryY}px)`;


// window pour javascript représente "le navigateur"
window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {

        case 37: // gauche
        case 81:
            movePacman("gauche");
            break;
        // -----------------------------------------------
        case 38: // haut
        case 90:
            movePacman("haut");
            break;
        // -----------------------------------------------
        case 39: // droite
        case 68:
            movePacman("droite");
            break;
        //------------------------------------------------
        case 40: //bas
        case 83:
            movePacman("bas");
            break;
        // -----------------------------------------------
        default:
            console.dir(event);
            break;
    }
});

// GESTION DU TACTILE

hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
hammertime.on("swipeleft swiperight swipeup swipedown", function(ev) {
    console.dir(ev);
    switch (ev.type) {
        case "swipeleft":
            movePacman("gauche");
            break;
        
        case "swipeup":
            movePacman("haut");
            break;

        case "swiperight":
            movePacman("droite");
            break;

        case "swipedown":
            movePacman("bas");
            break;

        default:
            break;
    }
});