let viewport       = document.getElementById("viewport");
let pacman         = document.getElementById("pacman");
let widthViewport  = viewport.clientWidth;
let heightViewport = viewport.clientHeight;
let pacmanX        = 0;
let pacmanY        = 0;
console.dir(viewport);


// window pour javascript représente "le navigateur"

window.addEventListener("keydown", function(event) {
    switch(event.keyCode) {

        case 37: // gauche
        case 81:
            if (pacmanX > 0) {
                pacmanX -= 50;  
            }
            pacman.style.transform = "translate("+pacmanX+"px,"+pacmanY+"px) rotate(180deg)";
            console.log("Pos X:"+pacmanX,"Pos Y:"+pacmanY);
            break;

        case 38: // haut
        case 90:
            if (pacmanY > 0) {
                pacmanY -= 50;
            }  
            pacman.style.transform = "translate("+pacmanX+"px,"+pacmanY+"px) rotate(270deg)";
            console.log("Pos X:"+pacmanX,"Pos Y:"+pacmanY);
            break;

        case 39: // droite
        case 68:
            if (pacmanX < viewport.clientWidth - 110) {
                pacmanX += 50; 
            } 
            pacman.style.transform = "translate("+pacmanX+"px,"+pacmanY+"px) rotate(0deg)";
            console.log("Pos X:"+pacmanX,"Pos Y:"+pacmanY);
            break;

        case 40: //bas
        case 83:
            if (pacmanY < viewport.clientHeight - 130) {
                pacmanY += 50; 
            }
            pacman.style.transform = "translate("+pacmanX+"px,"+pacmanY+"px) rotate(90deg)";
            console.log("Pos X:"+pacmanX,"Pos Y:"+pacmanY);
            break;

        default :
        console.dir(event);
            break;
    }
});