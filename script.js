let sequence = [];
let userSequence = [];
let score = 0;
let sequenceLength = 3;

const sequenceDisplay = document.getElementById('sequenceDisplay');
const userInput = document.getElementById('userInput');
const submitButton = document.getElementById('submitButton');
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('score');

function generateSequence() {
    sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        sequence.push(Math.floor(Math.random() * 10));
    }
}

function displaySequence() {
    sequenceDisplay.innerHTML = '';
    let index = 0;

    const interval = setInterval(() => {
        sequenceDisplay.innerHTML = sequence[index];
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
}

function checkSequence() {
    userSequence = userInput.value.split(' ').map(Number);
    if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
        score++;
        sequenceLength++;
        messageDisplay.innerText = 'Helyes! Következő kör.';
        scoreDisplay.innerText = `Score: ${score}`;
        startGame();
    } else {
        messageDisplay.innerText = `Hibás! A helyes sorrend: ${sequence.join(' ')}`;
        userInput.disabled = true;
    }
}

function startGame() {
    generateSequence();
    displaySequence();
}

submitButton.addEventListener('click', checkSequence);

startGame();
