const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const scoreContainer = document.querySelector(".score");
const highscoreContainer = document.querySelector(".highscore");
const scoreDisplay = document.getElementById("scoreGame");
const highscoreGame = document.getElementById("highscoreGame");
let score = 0;
let box = 25;
let d; // Direction variable.
let highscore = localStorage.getItem("highscoreSnake");

// Images
const bg = new Image();
bg.src = "img/background.png";
const foodImg = new Image();
foodImg.src = "img/apple.png";

// Sounds
const snakeUp = new Audio();
snakeUp.src = "audio/up.mp3";
const snakeDown = new Audio();
snakeDown.src = "audio/down.mp3";
const snakeLeft = new Audio();
snakeLeft.src = "audio/left.mp3";
const snakeRight = new Audio();
snakeRight.src = "audio/right.mp3";
const snakeDead = new Audio();
snakeDead.src = "audio/dead.mp3";
const eat = new Audio();
eat.src = "audio/eat.mp3";

// Booleans
let easy;
let normal;
let loco;

// Snake
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
}

// Food
let food = {
    x : Math.floor(Math.random() * 20) * box,
    y : Math.floor(Math.random() * 20) * box,
}

// Countdown before the game starts
let countdownTime = 6;
let countdownVar = document.getElementById("countdown");
document.getElementById("start").addEventListener("click", ()=>{
    document.getElementById("start").style.display = "none";
    document.querySelector(".levels").style.display = "flex";
})

let refresh = 100;
let game = setInterval(draw, refresh);

// EASY LEVEL
document.getElementById("easy").addEventListener("click", ()=>{
    refresh = 100;
    easy = true;
    // Hide title
    document.querySelector(".title").style.display = "none";
    // Show canvas
    cvs.style.display = "block";
    countdown();
})

// NORMAL LEVEL
document.getElementById("normal").addEventListener("click", ()=>{
    normal = true;
    refresh = 60;
    // Hide title
    document.querySelector(".title").style.display = "none";
    // Show canvas
    cvs.style.display = "block";
    countdown();
})

// CRAZY LEVEL
document.getElementById("crazy").addEventListener("click", ()=>{
    crazy = true;
    refresh = 30;
    // Hide title
    document.querySelector(".title").style.display = "none";
    // Show canvas
    cvs.style.display = "block";
    countdown();
})
countdownVar.innerHTML = "GET READY: "+countdown;
function countdown(){
    if(countdownTime > 0) {
        countdownTime--;
        countdownVar.classList.add("active")
        setTimeout(() => {
            countdownVar.classList.remove("active");
        }, 950);
        countdownVar.innerHTML = "GET READY: " +countdownTime;
    } else if (countdownTime == 0) {
        game = setInterval(draw, refresh);
        countdownVar.style.display = "none";
        scoreContainer.style.display = "block";
        highscoreContainer.style.display = "block";

        document.getElementById("highscoreGame").innerHTML = highscore;
        document.addEventListener("keydown", direction);

        // Exit the function.
        return countdown;
    }
    setTimeout(countdown, 1000);
}

// Listen for direction
function direction(e){
    let key = e.keyCode;
    if( key == 37 && d != "RIGHT") {
        d = "LEFT";
        snakeLeft.play();
    } else if ( key == 38 && d != "DOWN"){
        d = "UP";
        snakeUp.play();
    } else if ( key == 39 && d != "LEFT") {
        d = "RIGHT";
        snakeRight.play();
    } else if ( key == 40 && d != "UP") {
        d = "DOWN";
        snakeDown.play();
    }
}

// Collision function
function collision(head, snake) {
    for(let i = 0; i < snake.length; i++) {
        if(head.x == snake[i].x && head.y == snake[i].y) {
            return true;
        }
    }
    return false;
}

function draw(){
    // Draw the background.
    ctx.drawImage(bg, 0, 0);

    // Draw the snake
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#f5f5f5" : "#e1302a";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "#111111";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food.
    ctx.drawImage(foodImg, food.x, food.y);

    // Get the old head position.
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move in certain direction.
    if( d === "LEFT") snakeX -= box;
    if( d === "UP") snakeY -= box;
    if( d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

    // Snake eats food.
    if( snakeX == food.x && snakeY == food.y) {
        eat.play();
        if ( easy == true) {
            score += 50;
        } else if ( normal == true ){
            score += 100;
        } else if ( crazy = true ){
            score +=200;
        }
        scoreDisplay.innerHTML = score;
        food = {
            x : Math.floor(Math.random() * 20) * box,
            y : Math.floor(Math.random() * 20) * box,
        }
        if(score > highscore) {
            highscoreGame.innerHTML = score;
        }
    } else {
        snake.pop();
    }
    // Get new head position.
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    // If the food spawns in a position where the body of the snake already is
    for(let i = 0; i < snake.length; i++){
        if( food.x == snake[i].x && food.y == snake[i].y) {
            // Create new food on another location
            food = {
                x : Math.floor(Math.random() * 20) * box,
                y : Math.floor(Math.random() * 20) * box,
            }
        }
    }
    // Detect collision
    if( snakeX < -40|| snakeX > 500 || snakeY < -40 || snakeY > 500|| collision(newHead, snake)) {
        snakeDead.play();
        clearInterval(game);
        gameOver();
    }
    // Add the new head at the start of the snake.
    snake.unshift(newHead);
}

// Game over
function gameOver(){
    // Stop the sound for snake dead from looping over and over again.
    setTimeout(() => {
        snakeDead.pause();
        snakeDead.currentTime = 0;
    }, 500);
    // Hide the game.
    document.querySelector(".container").style.display = "none";
    // Display game over menu
    document.querySelector(".gameOver").style.display = "flex";
    // Display current score.
    document.getElementById("scoreGameOver").innerHTML = score;
    
    document.getElementById("highscore").innerHTML = highscore;
    // Display highscore.
    if ( score > highscore) {
        localStorage.setItem("highscoreSnake", score);
        let newHighscore = localStorage.getItem("highscoreSnake");
        document.getElementById("highscore").innerHTML = newHighscore;
    }
}

// Play again
document.getElementById("playAgain").addEventListener("click", ()=>{
    // Display game menu.
    document.querySelector(".container").style.display = "block";
    // Hide game over menu
    document.querySelector(".gameOver").style.display = "none";
    // Reset score to 0.
    score = 0;
    scoreDisplay.innerHTML = score;
    // Empty the array ( destroy the body parts of the snake accumulated during last game ).
    snake.splice(0, snake.length);
    // Reset snakes head position to the center.
    snake[0] = {
        x : 9 * box,
        y : 10 * box
    }
    // Clear the direction
    d = " ";
    game = setInterval(draw, refresh);
})

// Exit game
document.getElementById("closeGame").addEventListener("click", ()=>{
    location.reload();
})