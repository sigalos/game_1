const questions = [
  {
    question: "Quem é o atual presidente do Brasil?",
    options: ["Lula", "Bolsonaro", "Dilma", "Temer"],
    answer: 0
  },
  {
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
    answer: 2
  },
  {
    question: "Quantos estados tem o Brasil?",
    options: ["25", "26", "27", "28"],
    answer: 2
  },
  {
    question: "Qual animal é símbolo da páscoa?",
    options: ["Gato", "Coelho", "Cavalo", "Urso"],
    answer: 1
  },
  {
    question: "Qual planeta é o terceiro do Sol?",
    options: ["Marte", "Terra", "Vênus", "Júpiter"],
    answer: 1
  },
  {
    question: "Em que continente está o Brasil?",
    options: ["Europa", "América do Sul", "Ásia", "África"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz");
const gameContainer = document.getElementById("game");
const finalScoreContainer = document.getElementById("final-score");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const shareTwitter = document.getElementById("share-twitter");
const shareFacebook = document.getElementById("share-facebook");

function playSound(isCorrect) {
  (isCorrect ? correctSound : wrongSound).play();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.innerText = q.question;
  optionsElement.innerHTML = "";
  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.setAttribute('aria-label', `Opção ${index + 1}: ${opt}`);
    btn.onclick = () => checkAnswer(index);
    optionsElement.appendChild(btn);
  });
  quizContainer.style.display = "block";
  gameContainer.style.display = "none";
  finalScoreContainer.style.display = "none";
}

// --- JOGO DA VELHA ---
function loadTicTacToe() {
  gameContainer.innerHTML = `
    <p>Jogo da Velha (vs IA)</p>
    <div class="tic-tac-toe-board">
      <div class="tic-tac-toe-cell" onclick="playTicTacToe(0)"></div>
      <div class="tic-tac-toe-cell" onclick="playTicTacToe(1)"></div>
      <div class="tic-tac-toe-cell" onclick="playTicTacToe(2)"></div>
      <div class="tic-tac-toe-cell" onclick="playTicTacToe(3)"></div>
      <div class="tic-tac-toe-cell" onclick="playTicTacToe(4)"></div>
      <div class="tic-tac-toe-cell" onclick="playTicTacToe(5)"></div>
      <div class="tic-tac-toe-cell" onclick="playTicTacToe(6)"></div>
      <div class="tic-tac-toe-cell" onclick="playTicTacToe(7)"></div>
      <div class="tic-tac-toe-cell" onclick="playTicTacToe(8)"></div>
    </div>
    <div id="tic-tac-toe-message"></div>
  `;
  // Aqui você implementaria a lógica do jogo da velha (jogada do jogador, IA, verificação de vitória)
}

function playTicTacToe(cellIndex) {
  const cell = document.querySelectorAll('.tic-tac-toe-cell')[cellIndex];
  if (cell.innerText === '') {
    cell.innerText = 'X';
    // Aqui você chamaria a lógica da IA para fazer sua jogada
    // e depois verificaria se houve um vencedor
  }
}

// --- QUEBRA-CABEÇA ---
function loadPuzzle() {
  gameContainer.innerHTML = `
    <p>Quebra-Cabeça</p>
    <div class="puzzle-container" id="puzzle">
      <div class="puzzle-piece">1</div>
      <div class="puzzle-piece">2</div>
      <div class="puzzle-piece">3</div>
      <div class="puzzle-piece">4</div>
      <div class="puzzle-piece">5</div>
      <div class="puzzle-piece">6</div>
      <div class="puzzle-piece">7</div>
      <div class="puzzle-piece">8</div>
      <div class="puzzle-piece empty"></div>
    </div>
    <div id="puzzle-message"></div>
  `;
  // Aqui você implementaria a lógica do quebra-cabeça (arrastar e soltar, verificar se está completo)
}

// --- JOGO DA MEMÓRIA ---
function loadMemoryGame() {
  const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
  cards.sort(() => 0.5 - Math.random()); // Embaralhar as cartas

  let memoryGridHTML = '<div class="memory-grid">';
  cards.forEach((card, index) => {
    memoryGridHTML += `
      <div class="memory-card" data-card="<span class="math-inline">\{card\}" data\-index\="</span>{index}" onclick="flipCard(this)">?</div>
    `;
  });
  memoryGridHTML += '</div><div id="memory-message"></div>';
  gameContainer.innerHTML = `<p>Jogo da Memória</p>${memoryGridHTML}`;
  // Aqui você implementaria a lógica do jogo da memória (virar cartas, verificar pares)
}

function flipCard(cardElement) {
  cardElement.classList.add('flipped');
  cardElement.innerText = cardElement.dataset.card;
  // Aqui você implementaria a lógica para verificar se é um par
}

function showMiniGameSection(gameIndex) {
  gameContainer.innerHTML = "";
  gameContainer.style.display = "block";
  quizContainer.style.display = "none";
  finalScoreContainer.style.display = "none";

  if (gameIndex === 0) {
    loadTicTacToe();
  } else if (gameIndex === 1) {
    loadPuzzle();
  } else {
    loadMemoryGame();
  }

  setTimeout(() => {
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showFinalScore();
    }
  }, 15000); // Aumentei o tempo para dar tempo de ver a estrutura do jogo
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer === selected;
  playSound(correct);
  if (correct) score++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    if (currentQuestion % 2 === 0) {
      const gameIndex = Math.floor(currentQuestion / 2) % 3;
      showMiniGameSection(gameIndex);
    } else {
      showQuestion();
    }
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  finalScoreContainer.querySelector('h2').innerText = `Parabéns! Você acertou ${score} de ${questions
