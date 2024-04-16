// Selct (get) gameBoard element - CANSVAS ELEMENT
// Finished at 12:40(midnight)(20-wednesday) 21/12/2023

const gameBoard = document.getElementById("gameBoard");

const context = gameBoard.getContext("2d");

const scoreText = document.getElementById("scoreVal"); // To display the score

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25; // FOOD  width/height

let foodX;
let foodY;
let xVel = 25; // snake starts x direction from left to right movements, y direction from top to bottom
let yVel = 0;
let score = 0;
let active = true;
let started = false; //to check if the game start or not

// In snake there are lot of squares which is multiples of 25
// For each square To store x and y(in the form of object) create an array
// For each square the values should be equal which is unit of 25
// Below is an initial coordinates for the snake
// below denotes the starting of x & y coodinates for the snake's small square
let snake = [
  { x: UNIT * 3, y: 0 },
  { x: UNIT * 2, y: 0 },
  { x: UNIT, y: 0 },
  { x: 0, y: 0 },
];
window.addEventListener("keydown", keyPress);
startGame();
function startGame() {
  context.fillStyle = "#212121";
  // SYNTAX: fillrectangle(xStart(x co ordinate), yStart(y co ordinate), width, height)
  context.fillRect(0, 0, WIDTH, HEIGHT);
  createFood(); // randomly choose the x, y coordinates to circulate the place
  displayFood(); // ONCE we get the co ordinates , draw a square to the WIDTH and HEIGHT
  //     drawSnake(); // draw the snake
  //     moveSnake(); // move the snake
  //     clearBoard();   //....to clear the board
  //     drawSnake();
  //   nextTick();
  drawSnake();
}

function clearBoard() {
  context.fillStyle = "#212121";
  // SYNTAX: fillrectangle(xStart(x co ordinate), yStart(y co ordinate), width, height)
  context.fillRect(0, 0, WIDTH, HEIGHT);
}

// To craete random values from o to 500 which is I need only the multiples of unit 25...
// USE Math.floor(Math.random()*WIDTH/UNIT)*UNIT - To get random value from 0 to 500

function createFood() {
  foodX = Math.floor((Math.random() * WIDTH) / UNIT) * UNIT;
  foodY = Math.floor((Math.random() * HEIGHT) / UNIT) * UNIT;
}

function displayFood() {
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, UNIT, UNIT); //MULTIPLES OF 25
}

function drawSnake() {
  context.fillStyle = "aqua";
  context.strokeStyle = "#212121";
  //looping the snake coordinates,
  // forEACH will give one by one value from the x,y coordinates
  // snakePart is a parameter to receive
  snake.forEach((snakePart) => {
    context.fillRect(snakePart.x, snakePart.y, UNIT, UNIT);
    context.strokeRect(snakePart.x, snakePart.y, UNIT, UNIT);
  });
}

function moveSnake() {
  const head = {
    x: snake[0].x + xVel,
    y: snake[0].y + yVel,
  };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}

function nextTick() {
  if (active) {
    // snake movement is active not hit on the wall
    setTimeout(() => {
      clearBoard();
      displayFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 200); // 5 sec seconds fast snake will move
  } else {
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over!!", WIDTH / 2, HEIGHT / 2);
  }
}

function keyPress(event) {
  //GOOGLE- arrow keys keycode
  if (!started) {
    started = true;
    nextTick();
  }
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  switch (true) {
    // left key pressed and not going right
    case event.keyCode == LEFT && xVel != UNIT:
      xVel = -UNIT;
      yVel = 0;
      break;
    // right key pressed and not going left
    case event.keyCode == RIGHT && xVel != -UNIT:
      xVel = UNIT;
      yVel = 0;
      break;
    // Up key pressed and not going down
    case event.keyCode == UP && yVel != UNIT:
      xVel = 0;
      yVel = -UNIT;
      break;
    // down key pressed and not going up
    case event.keyCode == DOWN && yVel != -UNIT:
      xVel = 0;
      yVel = UNIT;
      break;
  }
}

function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
    case snake[0].x >= WIDTH:
    case snake[0].y < 0:
    case snake[0].y >= innerHeight:
      active = false; //if snake is hitting on the wall then game will over
      break;
  }
}
