import { sfx } from "./assets.js";

class Snake {
    constructor() {
        this.d = null;
        this.box = 25;
        this.body = [];
        this.alive = true;
    }

    // Snake movement
    movement(e) {
        e = e || event;
        // If snake is alive, move and play sounds
        if(this.alive) {
            if(e.keyCode === 37 && this.d !== "RIGHT") {
                this.d = "LEFT";
                sfx.snakeLeft.play();
            } else if (e.keyCode === 38 && this.d !== "DOWN") {
                this.d = "UP";
                sfx.snakeUp.play();
            } else if (e.keyCode === 39 && this.d !== "LEFT") {
                this.d = "RIGHT";
                sfx.snakeRight.play();
            } else if (e.keyCode === 40 && this.d !== "UP") {
                this.d = "DOWN";
                sfx.snakeDown.play();
            }
        }
    }
    
    // Clear movement
    clearMovement() {
        this.d = "";
    }
}

export const snake = new Snake();