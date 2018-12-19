class Graphics{
    constructor() {
        // Images
        this.bg = new Image();
        this.foodImg = new Image();

        this.bg.src = "img/background.png";
        this.foodImg.src = "img/apple.png";
    }
}

class Sfx{
    constructor() {
        // Sounds
        this.snakeUp = new Audio();
        this.snakeDown = new Audio();
        this.snakeLeft = new Audio();
        this.snakeRight = new Audio();
        this.snakeDead = new Audio();
        this.eat = new Audio();

        this.snakeUp.src = "audio/up.mp3";
        this.snakeDown.src = "audio/down.mp3";
        this.snakeLeft.src = "audio/left.mp3";
        this.snakeRight.src = "audio/right.mp3";
        this.snakeDead.src = "audio/dead.mp3";
        this.eat.src = "audio/eat.mp3";
    }
}

export const graphics = new Graphics();
export const sfx = new Sfx();