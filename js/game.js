const canvas = document.getElementById("game"); //Выбор canvas
const ctx = canvas.getContext("2d"); //Определение типа игры

const ground = new Image(); //Создание объекта поле игры
ground.scr = "img/ground.png"; //Путь к изображению

const food = new Image(); //Создание объекта еда
food.scr = "img/donut.png"; // Путь к изображению

let box = 32;

let score = 0;

function drawGame() {
    ctx.drawImage(ground, 0, 0);
}

let game = setInterval(drawGame, 100);