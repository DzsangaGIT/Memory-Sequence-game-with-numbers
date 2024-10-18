let sequence = [];
let userSequence = [];
let score = 0;
let sequenceLength = 3;

const sequenceDisplay = document.getElementById('sequenceDisplay');
const userInput = document.getElementById('userInput');
const submitButton = document.getElementById('submitButton');
const restartButton = document.getElementById('restartButton');
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const difficultySelect = document.getElementById('difficultySelect');

const endModal = document.getElementById('endModal');
const finalScore = document.getElementById('finalScore');

function generateSequence() {
    sequenceLength = parseInt(difficultySelect.value);
    sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        sequence.push(Math.floor(Math.random() * 10));
    }
}

function displaySequence() {
    sequenceDisplay.innerHTML = '';
    let index = 0;

    const interval = setInterval(() => {
        sequenceDisplay.innerHTML = `<span class="fade-in">${sequence[index]}</span>`;
        index++;
        if (index >= sequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                sequenceDisplay.innerHTML = '';
                getUserInput();
            }, 1000);
        }
    }, 1000);
}

function getUserInput() {
    userInput.value = '';
    userInput.focus();
    userInput.disabled = false;
}

function checkSequence() {
    userSequence = userInput.value.split(' ').map(Number);
    if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
        score++;
        messageDisplay.innerText = 'Helyes! Következő kör.';
        scoreDisplay.innerText = `Pont: ${score}`;
        if (score > 0) createConfetti();
        startGame();
    } else {
        showEndModal();
    }
}

function showEndModal() {
    userInput.disabled = true;
    finalScore.innerText = `Pont: ${score}`;
    endModal.style.display = 'flex';
    if (score > 0) createConfetti();
}

function createConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        gravity: 0.5,
        colors: ['#ff0a0a', '#0ab0ff', '#00ff00', '#ff00ff', '#ffff00'],
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
            ...defaults,
            particleCount: Math.floor(particleCount),
            origin: {
                x: randomInRange(0.1, 0.9),
                y: Math.random() - 0.2,
            },
        });
    }, 250);
}

function startGame() {
    generateSequence();
    displaySequence();
    restartButton.style.display = 'none';
}

function restartGame() {
    score = 0;
    scoreDisplay.innerText = `Pont: ${score}`;
    messageDisplay.innerText = '';
    userInput.disabled = false;
    endModal.style.display = 'none';
    startGame();
}

submitButton.addEventListener('click', checkSequence);
difficultySelect.addEventListener('change', () => {
    userInput.disabled = false;
    startGame();
});
restartButton.addEventListener('click', restartGame);
document.getElementById('restartButtonModal').addEventListener('click', restartGame);
document.getElementById('difficultySelectModal').addEventListener('change', (event) => {
    difficultySelect.value = event.target.value;
});

startGame();
