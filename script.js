// game variables

let inputDir = { x: 0, y: 0 };
let foodSound = new Audio('./Assets/MUSIC/food.mp3');
let gameOverSound = new Audio('./Assets/MUSIC/gameover.mp3');
let moveSound = new Audio('./Assets/MUSIC/move.mp3');
let bgMusic = new Audio('./Assets/MUSIC/music.mp3');
let board = document.body.querySelector("#board");
let HiScoreBox = document.querySelector("#HiScoreBox")
let btn = document.querySelectorAll(".btn")
let noob = document.querySelector("#noob");
let pro = document.querySelector("#pro");
let hecker = document.querySelector("#hecker");

let hiscoreval = 0;
let score = 0;
let speed = 3;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]
let food = { x: 10, y: 15 }

// difficulty level
function level() {
    noob.addEventListener("click" , function (){
        speed=5;
        noob.style.border= "2px solid red"

    })
    pro.addEventListener("click" , function (){
        speed=10;
        pro.style.border= "2px solid red"

    

    })
    hecker.addEventListener("click" , function (){
        speed=15;
        hecker.style.border= "2px solid red"
    
    })

    
}    
    


// Game function

function isColide(snake) {

    // if you bump on you
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }

    // if you bump on the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }

}
function main(cTime) {
    level()
    window.requestAnimationFrame(main);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
}

function gameEngine() {

    // part one update the snake and food 

    if (isColide(snakeArr)) {
        gameOverSound.play();
        bgMusic.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over ! , press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        bgMusic.play();
        score = 0;
        document.querySelector("#Score").innerHTML = 'Score: ' + score;

    }

    // if you have eaten the food , increament the score and regenerate the food

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if (score > hiscore) {
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            HiScoreBox.innerHTML = "HiScore : " + hiscoreval;

        }
        document.querySelector("#Score").innerHTML = 'Score: ' + score

        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //move the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // display the snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index,) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("snakeHead");

        } else {
            snakeElement.classList.add("snakeBody");

        }
        board.appendChild(snakeElement);
    });

    //display the food

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// main logic starts here

let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore)
    HiScoreBox.innerHTML = "HiScore : " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    bgMusic.play();
    inputDir = { x: 0, y: 1 };
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("ArrowUp")

            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown")
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft")
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight")
            break;

        default:
            break;
    }
})

gameEngine();
