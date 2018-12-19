class UI {
    constructor() {
        this.start = document.querySelector("#start");
        this.mainMenu = document.querySelector(".title");
        this.cvs = document.querySelector("#canvas");
        this.ctx = this.cvs.getContext("2d");
        this.scoreDisplay = document.querySelector("scoreGame");
        this.highscoreDisplay = document.querySelector("#highscoreGame");
        this.cWidth = this.cvs.width;
        this.cHeight = this.cvs.height;

        this.update = null;

        // Current score
        this.score = 0;
        
        // Highscore saved in local storage
        this.highscore = localStorage.getItem("snake-highscore");

        // Game over
        this.gameOver = document.querySelector(".gameOver"); // Game over menu
        this.scoreGameover = document.querySelector("#scoreGameOver");
        this.highscoreGameover = document.querySelector("#highscoreGameOver");
        this.playAgain = document.querySelector("#playAgain");
        this.exitGame = document.querySelector("#closeGame");
    }

    // Initialize stats
    init() {
        this.score = 0;
        this.scoreDisplay.textContent = this.score;
        this.update = null;
        this.gameOver.style.display = "none";
    }

    // Display game over menu
    endgame() {
        // Cancel the animation frames
        cancelAnimationFrame(this.update);

        this.gameOver.style.display = "block";

        // Update highscore (if current score is bigger)
        if(this.score > this.highscore) {
            this.highscore = localStorage.setItem("snake-highscore", this.score);
        }
        this.highscore = localStorage.getItem("snake-highscore");

        // Display the current game score and highscore
        document.querySelector("#scoreGameOver").textContent = this.score;
        document.querySelector("#highscoreGameOver").textContent = this.highscore;
    }
}

export const ui = new UI();