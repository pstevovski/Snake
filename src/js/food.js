import { snake } from "./snake.js";

class Food {
    constructor() {
        this.position = {
            x: Math.floor(Math.random() * 20) * snake.box,
            y: Math.floor(Math.random() * 20) * snake.box
        }
    }

    // Random food position
    newFoodPos() {
        this.position = {
            x: Math.floor(Math.random() * 20) * snake.box,
            y: Math.floor(Math.random() * 20) * snake.box
        }
    }
}

export const food = new Food();