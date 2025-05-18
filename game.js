const playerNames = ["Player 1", "Player 2"];
let currentPlayer = 0;
let isSinglePlayer = false;
let playerHealth = [100, 100];
let gameOver = false;


// Get references to the audio elements
const cardFlipSound = document.getElementById('cardFlipSound');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');

// Function to play sound
function playCardFlip() {
    cardFlipSound.currentTime = 0;
    cardFlipSound.play();
}

function playWinSound() {
    winSound.currentTime = 0;
    winSound.play();
}

function playLoseSound() {
    loseSound.currentTime = 0;
    loseSound.play();
}


const healthBars = {
  player1: document.getElementById('player1-health'),
  player2: document.getElementById('player2-health')
};

const healthLabels = {
  player1: document.getElementById('player1-hp'),
  player2: document.getElementById('player2-hp')
};

const turnIndicator = document.getElementById('turn-indicator');
const playerHand = document.getElementById('player-hand');
const log = document.getElementById('log');


function updateHealthBars() {
  healthBars.player1.style.width = playerHealth[0] + "%";
  healthBars.player2.style.width = playerHealth[1] + "%";
  healthLabels.player1.textContent = `${playerHealth[0]}/100`;
  healthLabels.player2.textContent = `${playerHealth[1]}/100`;
}

function updateTurn() {
  turnIndicator.textContent = `${playerNames[currentPlayer]}'s Turn`;
}

function drawCards(n) {
  const drawn = [];
  for (let i = 0; i < n; i++) {
    drawn.push(cards[Math.floor(Math.random() * cards.length)]);
  }
  return drawn;
}

function displayCards() {
  playerHand.innerHTML = '';
  const hand = drawCards(3);
  hand.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${card.type.toLowerCase()}`;

    cardDiv.innerHTML = `<h3>${card.name}</h3><p>${card.type}</p><p>${card.value}</p>`;
    cardDiv.onclick = () => playCard(card);
    playerHand.appendChild(cardDiv);
  });
}

function playCard(card) {
  if (gameOver) return;
  playCardFlip();  
  const opponent = (currentPlayer + 1) % 2;
  let logEntry = `${playerNames[currentPlayer]} played ${card.name}. `;
  
  if (card.type === 'attack') {
    playerHealth[opponent] -= card.value;
    logEntry += `${playerNames[opponent]} lost ${card.value} HP.`;
  } else if (card.type === 'defense') {
    playerHealth[currentPlayer] += card.value;
    if (playerHealth[currentPlayer] > 100) playerHealth[currentPlayer] = 100;
    logEntry += `${playerNames[currentPlayer]} gained ${card.value} HP.`;
  } else if (card.type === 'special' && card.effect === 'double attack') {
    playerHealth[opponent] -= card.value * 2;
    logEntry += `Double attack! ${playerNames[opponent]} lost ${card.value * 2} HP.`;
  }

  log.innerHTML += `<p>${logEntry}</p>`;
  updateHealthBars();
  checkGameOver();

  if (!gameOver) {
    currentPlayer = opponent;
    updateTurn();

    if (isSinglePlayer && currentPlayer === 1) {
      setTimeout(botTurn, 1000);
    } else {
      displayCards();
    }
  }
}

function checkGameOver() {
  if (playerHealth[0] <= 0 || playerHealth[1] <= 0) {
    gameOver = true;
    document.getElementById("game-container").style.display = "none";
    document.getElementById("end-screen").style.display = "flex";

    const winner = playerHealth[0] <= 0 ? "Player 2" : "Player 1";
    document.getElementById("result-message").textContent = `${winner} Wins! Click 'Play Again' to return to home.`;

    if (winner === "Player 1") winSound.play();
    else loseSound.play();
  }
}

function botTurn() {
  const botCard = drawCards(1)[0];
  playCard(botCard);
}

function startGame(mode) {
  isSinglePlayer = mode === 'single';  // ✅ FIXED this line
  playerHealth = [100, 100];
  currentPlayer = 0;
  gameOver = false;

  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("end-screen").style.display = "none";

  updateHealthBars();
  updateTurn();
  displayCards();
}

function endGame() {
  gameOver = true;
  document.getElementById("game-container").style.display = "none";
  document.getElementById("welcome-screen").style.display = "block";
  document.getElementById("end-screen").style.display = "none";
  log.innerHTML = "";
}

function restartGame() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  document.getElementById("end-screen").style.display = "none";

  playerHealth = [100, 100];
  currentPlayer = 0;
  gameOver = false;
  log.innerHTML = "";

  updateHealthBars();
  updateTurn();
  displayCards();
}



