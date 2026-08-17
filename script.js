const photoInput = document.getElementById("photoInput");
const target = document.getElementById("target");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const startButton = document.getElementById("startButton");
const message = document.getElementById("message");
const hitText = document.getElementById("hitText");

let score = 0;
let time = 30;
let timer = null;
let photoReady = false;
let gameRunning = false;

photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    target.src = imageURL;
    target.style.display = "block";

    message.style.display = "none";

    photoReady = true;

    moveTarget();
});

startButton.addEventListener("click", function () {

    if (!photoReady) {
        alert("Önce bir fotoğraf seç!");
        return;
    }

    if (gameRunning) return;

    score = 0;
    time = 30;

    scoreText.textContent = score;
    timeText.textContent = time;

    gameRunning = true;
    startButton.textContent = "OYUN DEVAM EDİYOR";

    moveTarget();

    timer = setInterval(() => {

        time--;

        timeText.textContent = time;

        if (time <= 0) {
            endGame();
        }

    }, 1000);
});

target.addEventListener("pointerdown", function (event) {

    if (!gameRunning) return;

    event.preventDefault();

    score++;
    scoreText.textContent = score;

    // Telefon titreşimi
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    // Vuruş efekti
    hitText.style.left = (event.offsetX - 35) + "px";
    hitText.style.top = (event.offsetY - 35) + "px";

    hitText.style.display = "block";

    setTimeout(() => {
        hitText.style.display = "none";
    }, 250);

    // Fotoğrafı biraz küçültüp büyüt
    target.style.transform = "scale(0.85)";

    setTimeout(() => {
        target.style.transform = "scale(1)";
    }, 100);

    moveTarget();
});

function moveTarget() {

    const gameWidth = game.clientWidth;
    const gameHeight = game.clientHeight;

    const targetSize = target.offsetWidth;

    const maxX = gameWidth - targetSize;
    const maxY = gameHeight - targetSize;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + "px";
    target.style.top = y + "px";
}

function endGame() {

    clearInterval(timer);

    gameRunning = false;

    startButton.textContent = "TEKRAR OYNA";

    alert("Süre bitti!\n\nSkorun: " + score);
}
