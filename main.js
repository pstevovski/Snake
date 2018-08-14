const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const scoreDisplay = document.getElementById("score");
let score = 0;
let box = 25;
let d; // Direction variable.

// Images
const bg = new Image();
bg.src = "img/background.png";
const foodImg = new Image();
foodImg.src = "img/apple.png";
const starImg = new Image();
starImg.src = "img/star.png";

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

// Star for bonus points
let star = {
    x : Math.floor(Math.random() * 20) * box,
    y : Math.floor(Math.random() * 20) * box
}

// Countdown before game starts
let countdownTime = 6;
let countdownVar = document.getElementById("countdown");
document.getElementById("start").addEventListener("click", ()=>{
    countdown();
})
countdownVar.innerHTML = countdown;
function countdown(){
    if(countdownTime > 0) {
        countdownTime--;
        countdownVar.classList.add("active")
        setTimeout(() => {
            countdownVar.classList.remove("active");
        }, 950);
        countdownVar.innerHTML = countdownTime;
    } else if (countdownTime == 0) {
        countdownVar.style.display = "none";
        document.addEventListener("keydown", direction);

        // Exit the function.
        return test;
    }
    setTimeout(countdown, 1000);
}

// Listen for direction
function direction(e){
    let key = e.keyCode;
    if( key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if ( key == 38 && d != "DOWN"){
        d = "UP";
    } else if ( key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if ( key == 40 && d != "UP") {
        d = "DOWN";
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
        ctx.fillStyle = (i == 0) ? "#f5f5f5" : "lime";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food.
    ctx.drawImage(foodImg, food.x, food.y);

    // // Draw the star
    // ctx.drawImage(starImg, star.x, star.y);

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
        score += 50;
        scoreDisplay.innerHTML = score;
        food = {
            x : Math.floor(Math.random() * 20) * box,
            y : Math.floor(Math.random() * 20) * box,
        }
    } else {
        snake.pop();
    }

    // Snake eats star
    if ( snakeX == star.x && snakeY == star.y) {
        score += 150;
        scoreDisplay.innerHTML = score;
        star = {
            x : Math.floor(Math.random() * 20) * box,
            y : Math.floor(Math.random() * 20) * box,
        }
    }

    // Get new head position.
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // Detect collision
    if( snakeX < -20 || snakeX > 480 || snakeY < 0 || snakeY > 480|| collision(newHead, snake)) {
        clearInterval(game);
        gameOver();
        // alert("you dead")
    }
    // Add the new head at the start of the snake.
    snake.unshift(newHead);
}
let game = setInterval(draw, 60);

// Game over
function gameOver(){
    console.log("game over")
}