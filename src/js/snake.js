import { sfx } from "./assets.js";

class Snake {
    constructor() {
        this.d = null;
        this.box = 25;
        this.body = [];

        this.body[0] = {
            x: 9 * this.box,
            y: 10 * this.box
        }
    }

    // Snake movement
    movement(e) {
        e = e || event;

        if(e.keyCode === 37) {
            this.d = "LEFT";
            sfx.snakeLeft.play();
        } else if (e.keyCode === 38) {
            this.d = "UP";
            sfx.snakeUp.play();
        } else if (e.keyCode === 39) {
            this.d = "RIGHT";
            sfx.snakeRight.play();
        } else if (e.keyCode === 40) {
            this.d = "DOWN";
            sfx.snakeDown.play();
        }
    }
    
    // Clear movement
    clearMovement() {
        this.d = "";
    }
}

export const snake = new Snake();