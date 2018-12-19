import { ui } from "./ui.js";
import { graphics, sfx } from "./assets.js";
import { food } from "./food.js";
import { snake } from "./snake.js";

const start = document.querySelector("#start");

// Start game
start.addEventListener("click", startGame);

function startGame() {
    // Hide the main menu
    ui.mainMenu.style.display = "none";
    
    // Display the canvas
    ui.cvs.style.display = "block";

    // Initialize stats
    ui.init();

    // Draw the canvas
    draw();
}

function draw() {
    // Draw the canvas
    ui.ctx.drawImage(graphics.bg, 0, 0);

    // Draw snake's head
    ui.ctx.fillRect(snake.body[0].x, snake.body[0].y, snake.box, snake.box);

    // Paint the snake
    for(let i = 0; i < snake.body.length; i++) {
        ui.ctx.fillStyle = ( i === 0) ? "#fff" : "#e1302a";
        ui.ctx.fillRect(snake.body[i].x, snake.body[i].y, snake.box, snake.box);
    }

    // Draw the food
    ui.ctx.drawImage(graphics.foodImg, food.position.x, food.position.y);

    // Save the old head position
    let headX = snake.body[0].x;
    let headY = snake.body[0].y;

    // Move the snake
    if(snake.d === "LEFT")  headX -= snake.box; // left
    if(snake.d === "RIGHT") headX += snake.box; // right
    if(snake.d === "UP")    headY -= snake.box; // up
    if(snake.d === "DOWN")  headY += snake.box; // down

    // If the snake eats the food
    if(headX === food.position.x && headY === food.position.y) {
        // Update the score
        ui.score += 100;
        ui.scoreDisplay.textContent = ui.score;

        // Play sound
        sfx.eat.play();

        // Create a new food at new position    
        food.newFoodPos();

        // If the current score is bigger than the saved highscore
        if(ui.score > ui.highscore) {
            ui.highscoreDisplay = ui.score;
        }

    } else {
        snake.body.pop();
    };

    // Get the new position of the snake's head
    let newPos = {
        x: headX,
        y: headY
    };

    // If the food spawns in the same spot where snake currently is
    for(let i = 0; i < snake.body.length; i++) {
        if(food.position.x === snake.body[i].x && food.position.y === snake.body[i].y) {
            // Create a new food at new position
            food.newFoodPos();
        }
        
        // If the snake collides with it self, end game
        if(newPos.x === snake.body[i].x && newPos.y === snake.body[i].y) {
            ui.endgame();
            return;
        }
    }

    // Teleport snake from one side to other when it reaches the walls
    if(headX <= -20|| headX >= 520 || headY <= -20 || headY >= 520) {
        ui.endgame();
        return;
    }

    snake.body.unshift(newPos);

    ui.update = requestAnimationFrame(draw);
}

// Play again
document.querySelector("#playAgain").addEventListener("click", startGame);

// Move the snake
document.addEventListener("keydown", snake.movement.bind(snake));
document.addEventListener("keyup", snake.clearMovement.bind(snake));