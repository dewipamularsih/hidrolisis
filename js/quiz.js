// Quiz Module

let currentQuestionIndex = 0;
let currentQuiz = [];
let userScore = 0;
let userName = '';
let userClass = '';

export async function startQuiz(data) {
  currentQuiz = API.generateQuizQuestions(data);
  currentQuestionIndex = 0;
  userScore = 0;
  showQuizSection(true);
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestionIndex >= currentQuiz.length) {
    endQuiz();
    return;
  }
  
  const q = currentQuiz[currentQuestionIndex];
  document.getElementById('quiz-question').textContent = q.question;
  
  const buttonsContainer = document.querySelector('.quiz-buttons');
  buttonsContainer.innerHTML = q.options.map(opt => 
    `<button class="quiz-btn" onclick="Quiz.answer('${opt}')">${opt.charAt(0).toUpperCase() + opt.slice(1)}</button>`
  ).join('');
  
  document.getElementById('quiz-progress').textContent = 
    `Pertanyaan ${currentQuestionIndex + 1} / ${currentQuiz.length}`;
}

export function answer(selected) {
  const q = currentQuiz[currentQuestionIndex];
  if (selected === q.correct) {
    userScore++;
    // Confetti effect (simple CSS)
    confetti();
  }
  
  currentQuestionIndex++;
  setTimeout(nextQuestion, 1000);
}

function confetti() {
  // Simple confetti via CSS particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 10px; height: 10px;
      background: ${['#ff4757', '#ffa502', '#2ed573', '#3742fa'][Math.floor(Math.random()*4)]};
      top: 0; left: ${Math.random()*100}vw;
      animation: confetti-fall 1s linear forwards;
      pointer-events: none;
      z-index: 9999;
    `;
    particle.style.setProperty('--delay', Math.random()*0.5 + 's');
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
  }
}

function endQuiz() {
  saveScore();
  alert(`Quiz selesai! Skor: ${userScore}/${currentQuiz.length}`);
  showQuizSection(false);
  UI.renderLeaderboard(getLeaderboard());
}

function saveScore() {
  if (!userName) {
    userName = prompt('Nama:') || 'Anonim';
    userClass = prompt('Kelas:') || 'X';
  }
  const scores = getLeaderboard();
  scores.push({name: userName, class: userClass, score: userScore});
  scores.sort((a,b) => b.score - a.score);
  localStorage.setItem('phQuizScores', JSON.stringify(scores.slice(0,10)));
}

function getLeaderboard() {
  return JSON.parse(localStorage.getItem('phQuizScores') || '[]');
}

function showQuizSection(show) {
  document.querySelector('.quiz-section').classList.toggle('hidden', !show);
}

// Global exports for onclick (temporary)
window.Quiz = { answer };
