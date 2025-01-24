// Variables
const stimuli = [
    { type: "heart", side: "left", image: "images/heart.png", correctKey: "ShiftLeft" },
    { type: "heart", side: "right", image: "images/heart.png", correctKey: "ShiftRight" },
    { type: "moon", side: "left", image: "images/moon.png", correctKey: "ShiftRight" },
    { type: "moon", side: "right", image: "images/moon.png", correctKey: "ShiftLeft" },
];
let currentTrial = null;
let startTime = null;
let trialActive = false;
let playerName = "";

// DOM Elements
const playButton = document.getElementById("playButton");
const nameInput = document.getElementById("name");
const timestampDisplay = document.getElementById("timestamp");
const leftImage = document.getElementById("leftImage");
const rightImage = document.getElementById("rightImage");
const currentResult = document.getElementById("currentResult");
const resultsBody = document.getElementById("resultsBody");
const resultsContainer = document.getElementById("resultsContainer");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

// Utility Functions
function getRandomStimulus() {
    return stimuli[Math.floor(Math.random() * stimuli.length)];
}

function getCurrentTimestamp() {
    return new Date().toLocaleString();
}

function showStimulus() {
    trialActive = false;
    currentTrial = getRandomStimulus();

    leftImage.style.display = "none";
    rightImage.style.display = "none";

    if (currentTrial.side === "left") {
        leftImage.src = currentTrial.image;
        leftImage.style.display = "block";
    } else {
        rightImage.src = currentTrial.image;
        rightImage.style.display = "block";
    }

    startTime = Date.now();
    currentResult.textContent = "";
    trialActive = true;
}

function checkResponse(responseKey) {
    if (!trialActive || !currentTrial) return;

    const reactionTime = Date.now() - startTime;
    const isCorrect = responseKey === currentTrial.correctKey;
    const correctnessText = isCorrect ? "Correct" : "Wrong";

    currentResult.textContent = `Your response: ${correctnessText} | Reaction Time: ${reactionTime} ms`;

    const newRow = resultsBody.insertRow();
    newRow.innerHTML = `
        <td>${getCurrentTimestamp()}</td>
        <td>${playerName}</td>
        <td>${currentTrial.type}</td>
        <td>${currentTrial.side}</td>
        <td>${currentTrial.correctKey}</td>
        <td>${responseKey}</td>
        <td>${correctnessText}</td>
        <td>${reactionTime}</td>
    `;

    trialActive = false;
    setTimeout(showStimulus, 1000);
}

// Event Listeners
document.addEventListener("keydown", (event) => checkResponse(event.code));
leftButton.addEventListener("click", () => checkResponse("ShiftLeft"));
rightButton.addEventListener("click", () => checkResponse("ShiftRight"));

playButton.addEventListener("click", () => {
    playerName = nameInput.value.trim();
    timestampDisplay.textContent = `Start Time: ${getCurrentTimestamp()}`;
    showStimulus();
});
