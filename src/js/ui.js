class UI {
    constructor() {
        this.start = document.querySelector("#start");
        this.title = document.querySelector(".title");
        this.cvs = document.querySelector("#canvas");
        this.ctx = this.cvs.getContext("2d");
        this.scoreDisplay = document.querySelector("scoreGame");
        this.highscoreDisplay = document.querySelector("#highscoreGame");
        this.cWidth = this.cvs.width;
        this.cHeight = this.cvs.height;

        // Game over
        this.gameOver = document.querySelector(".gameOver"); // Menu
        this.scoreGameover = document.querySelector("#scoreGameOver");
        this.highscoreGameover = document.querySelector("#highscoreGameOver");
        this.playAgain = document.querySelector("#playAgain");
        this.exitGame = document.querySelector("#closeGame");
    }

    // Start the game
    startGame() {
        // Hide the title section
        this.title.style.display = "none";

        // Display the canvas
        this.cvs.style.display = "block";

        // Run the function
        testFunction();
    }
}

export const ui = new UI();