const canvas = document.getElementById("game"); //Выбор canvas
const ctx = canvas.getContext("2d"); //Определение типа игры

const ground = new Image(); //Создание объекта поле игры
ground.src = "img/ground.png"; //Путь к изображению

const foodImg = new Image(); //Создание объекта еда
foodImg.src = "img/donut.png"; // Путь к изображению

let box = 32; // Размер 1 клетки

let score = 0; // Счет игры

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up"
    else if (event.keyCode == 39 && dir != "left")
        dir = "right"
    else if (event.keyCode == 40 && dir != "up")
        dir = "down"
}

function drawGame() {  //функция отрисовки поля
    ctx.drawImage(ground, 0, 0); //рисуем поле

    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++) { //рисуем змейку
        if (i>0)
        ctx.fillStyle = "red"; // первый элемент
        else ctx.fillStyle = "green"; //все остальные элементы
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "WHite";
    ctx.font = "40px Arial";
    ctx.fillText(score, 3 * box, 1.7 * box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if (snakeX < 32) {
        snakeX = 576;
    }

    if (snakeX > 576) {
        snakeX = 0;
    }

    if (snakeY < 96) {
        snakeY = 576;
    }

    if (snakeY > 576) {
        snakeY = 64;
    }

    if(dir == "left") snakeX-= box;
    if(dir == "right") snakeX+= box;
    if(dir == "down") snakeY+= box;
    if(dir == "up") snakeY-= box;

    let newHead = {
      x: snakeX,
      y: snakeY
    };

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);