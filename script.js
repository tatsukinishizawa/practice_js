const gameContainer = document.getElementById("game-container");
const startButton = document.getElementById("start-button");
const result = document.getElementById("result");
const mouseHistoryCanvas = document.getElementById("mouse-history");
const context = mouseHistoryCanvas.getContext("2d");

let ballCount = 0;
let gameInterval;
let mouseCoordinates = []; // マウス座標の履歴を保存する配列
let recording = false; // マウス座標の記録が有効かどうかを示すフラグ
let previousX, previousY; // 直前の座標

function createBall() {
    // ... ボールの生成コード ...
    const ball = document.createElement("div");
    ball.className = "ball";
    ball.style.left = Math.floor(Math.random() * 310) + "px";
    ball.style.top = Math.floor(Math.random() * 310) + "px";
    ball.style.backgroundColor = "blue";
    gameContainer.appendChild(ball);

    ball.addEventListener("click", () => {
        if (gameContainer.contains(ball)) {
            gameContainer.removeChild(ball);
            ballCount++;
        }
    });

    setTimeout(() => {
        if (gameContainer.contains(ball)) {
            gameContainer.removeChild(ball);
        }
    }, 700);

        
    console.log("ボールが生成されました");

    // マウス座標の記録を始める
    startRecordingMouseCoordinates();
}

function startRecordingMouseCoordinates() {
    recording = true; // マウス座標の記録を開始
}

function recordMouseCoordinates(e) {
    if (recording) {
        const rect = mouseHistoryCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseCoordinates.push({ x, y });
    }
}

function startGame() {
    startButton.style.display = "none";
    result.style.display = "none";

    // マウス座標の記録を開始
    mouseHistoryCanvas.addEventListener("mousemove", recordMouseCoordinates);

    gameInterval = setInterval(() => {
        if (ballCount < 30) {
            createBall();
        } else {
            endGame();
        }
    }, 700);
}

function endGame() {
    clearInterval(gameInterval);
    result.style.display = "block";

    // マウス座標の記録を停止
    recording = false;

    // 直前の座標をリセット
    previousX = undefined;
    previousY = undefined;

    // マウス座標履歴を表示
    showMouseCoordinates();
}

function showMouseCoordinates() {
    if (mouseCoordinates.length > 0) {
        context.clearRect(0, 0, mouseHistoryCanvas.width, mouseHistoryCanvas.height);
        context.beginPath();
        context.moveTo(mouseCoordinates[0].x, mouseCoordinates[0].y);
        for (let i = 1; i < mouseCoordinates.length; i++) {
            context.lineTo(mouseCoordinates[i].x, mouseCoordinates[i].y);
        }
        context.stroke();
    } else {
        result.innerHTML = "<h2>マウス座標履歴</h2><p>座標データはありません。</p>";
    }
}

startButton.addEventListener("click", startGame);
