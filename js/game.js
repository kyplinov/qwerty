const canvas = document.getElementById("game"); //Выбор canvas
const ctx = canvas.getContext("2d"); //Определение типа игры

const ground = new Image(); //Создание объекта поле игры
ground.src = "img/ground.png"; //Путь к изображению

const foodImg = new Image(); //Создание объекта еда
foodImg.src = "img/donut.png"; // Путь к изображению

let box = 32; // Размер 1 клетки

let score = 0; // Счет игры

let food = { // случайное появление еды
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = { // начальная позиция змейки
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction); // начинаем отслеживать нажатие клавишь

let dir; // переменная нажатия клавиши

function direction(event) { // смотрим какая клавиша нажата и нет движения змейки в противоположное направление
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

    ctx.drawImage(foodImg, food.x, food.y); // рисуем еду

    for(let i = 0; i < snake.length; i++) { //рисуем змейку
        if (i>0)
        ctx.fillStyle = "red"; // первый элемент
        else ctx.fillStyle = "green"; //все остальные элементы
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // рисуем квадрат в координатах
    }

    for (let k = 1; k < snake.length; k++) { // проверяем столкновение головы змейки с телом
        if (snake[0].x == snake[k].x && snake[0].y == snake[k].y) {// сравниваем координаты первого квадрата с координатами других квадратов
            document.getElementById("game-over").style.display = "block"; // выслывающее окно конца игры
            clearInterval(game); // очищаем интервал(остановка игры)
        }
    }


    ctx.fillStyle = "White"; // цвет шрифта
    ctx.font = "40px Arial"; // шрифт
    ctx.fillText(score, 3 * box, 1.7 * box); // позиция счета игры

    let snakeX = snake[0].x; // запоминаем позицию первого элемента змейки
    let snakeY = snake[0].y; // для сравнивания с позицией еды

    if(snakeX == food.x && snakeY == food.y) { // сравнение позиции первого жлемента змейки и еды
        score++; // прибавляем счет игры
        food = { // получаем новые координаты еды
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop(); // удаляем последний элемент массива
    }

    if (snakeX < 32) { // переход змейки из крайне левого квадрата в крайне правый
        snakeX = 576;
    }

    if (snakeX > 576) { // переход змейки из крайне правого квадрата в крайне левый
        snakeX = 0;
    }

    if (snakeY < 96) { // переход змейки из крайне верхенго квадрата в крайне нижний
        snakeY = 576;
    }

    if (snakeY > 576) { // переход змейки из крайне нижнего квадрата в крайне верхний
        snakeY = 64;
    }

    if(dir == "left") snakeX-= box; // сравниваем нажатую клавишу и перемещаем змейку
    if(dir == "right") snakeX+= box;
    if(dir == "down") snakeY+= box;
    if(dir == "up") snakeY-= box;

    let newHead = { // новые координаты перого элемента змейки
      x: snakeX,
      y: snakeY
    };

    snake.unshift(newHead); // перемещаем массив из элементов змейки
}

let game = setInterval(drawGame, 100); // отрисовываем игру с интервалом