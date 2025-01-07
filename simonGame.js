let sysqueue = [];
let userqueue = [];

let start = false;

let level = 0;

document.addEventListener("keypress", beginGame);

function beginGame() {
    start = true;

    let h3 = document.querySelector("h3");
    h3.innerText = "Game starting in";

    let timer = document.querySelector(".timer");
    timer.setAttribute("class", "");

    let n = 4;
    let timerID = setInterval(() => {
        if (n == 0) {
            clearInterval(timerID);
            timer.setAttribute("class", "timer");
        }
        timer.innerText = `${n}`;
        n--;
    }, 1000);

    setTimeout(levelup, 5000);
}

function levelup() {
    level++;
    userqueue = [];

    let h3 = document.querySelector("h3");
    h3.innerText = `Level ${level}`;

    let btns = document.querySelectorAll(".btn");

    let random = Math.floor(Math.random() * 4);
    blink(btns[random]);
    setTimeout(() => {
        btns[random].classList.remove("blink");
    }, 250);

    sysqueue.push(btns[random].getAttribute("id"));

    for (button of btns) {
        button.addEventListener("click", btnPress);
    }
}

function blink(element) {
    element.classList.add("blink");
}

function btnPress() {
    userBlink(this);
    setTimeout(() => {
        this.classList.remove("userBlink");
    }, 250);

    userqueue.push(this.getAttribute("id"));

    let index = userqueue.length - 1;
    if (sysqueue[index] !== userqueue[index]) {
        let body = document.querySelector("body");
        body.classList.add("red");
        setTimeout(() => {
            body.classList.remove("red");
        }, 250);

        let h3 = document.querySelector("h3");
        h3.innerHTML = `<span style="color: red;">GAME OVER!</span> Your score was ${level}.<br /> Press any key to start the Game!`;

        let timer = document.querySelector(".timer");
        timer.innerText = "5";

        start = false;
        level = 0;
        sysqueue = [];
    }

    if (index == level - 1) {
        setTimeout(levelup, 1000);
    }
}

function userBlink(element) {
    element.classList.add("userBlink");
}


