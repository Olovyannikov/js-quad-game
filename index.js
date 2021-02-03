let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector("#time");
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $result = document.querySelector('#result');
let $gameTime = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el) {
    $el.classList.remove('hide');
}

function hide($el) {
    $el.classList.add('hide');
}

function startGame() {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true')

    isGameStarted = true;
    hide($start);
    $game.style.background = '#fff';

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent);
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100)

    getRenderBox();
}

function setGameTime() {
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function setGameScore() {
    $result.textContent = score.toString();
}

function endGame() {
    isGameStarted = false;

    $gameTime.removeAttribute('disabled')
    setGameScore();
    show($start);
    $game.style.background = '#ccc';
    $game.innerHTML = '';
    hide($timeHeader);
    show($resultHeader);
}

function handleBoxClick(evt) {
    if (!isGameStarted) {
        return
    }
    if (evt.target && evt.target.dataset.box) {
        getRenderBox();
        score++;
    }
}

function getRenderBox() {
    $game.innerHTML = '';

    let box = document.createElement('div');
    let boxSize = getRandom(30, 100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = `${boxSize}px`;
    box.style.position = 'absolute';
    box.style.background = getRandomColor();
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement("afterbegin", box);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
}