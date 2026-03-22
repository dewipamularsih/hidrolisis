// Main App Entry Point

import { getData, filterData } from './api.js';
import { renderItems, showResult, showModal, showLoading, renderLeaderboard, closeModal } from './ui.js';
import { startQuiz } from './quiz.js';

document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
  showLoading(true);
  const data = await getData();
  showLoading(false);
  
  // Buah-buahan mode default
  let fruitsData = data;
  renderItems(fruitsData, document.querySelector('.items-grid'));
  renderLeaderboard(getLeaderboard());
  
  // Icon toggle
  document.getElementById('fruit-toggle').addEventListener('click', async () => {
    fruitsData = await import('./data_fruits.json').then(m => m.default);
    renderItems(fruitsData, document.querySelector('.items-grid'));
  });
  
  setupEventListeners(data);
}

function setupEventListeners(data) {
  // Search
  document.getElementById('search').addEventListener('input', (e) => {
    const filtered = filterData(e.target.value);
    renderItems(filtered, document.querySelector('.items-grid'));
  });
  
  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  
  // Delegation for cards
  document.querySelector('.items-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
      const itemName = card.dataset.item;
      const item = data.find(i => i.name === itemName);
      showResult(item);
      showModal(item); // Bonus modal
    }
  });
  
  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  
  // Quiz button
  document.getElementById('start-quiz').addEventListener('click', () => startQuiz(data));
}

// Theme management
function toggleTheme() {
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Load saved theme
if (localStorage.getItem('theme')) {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
}

// Polyfill for older browsers (fetch)
if (!window.fetch) {
  // Simple fetch polyfill if needed
  console.warn('Fetch not supported');
}

// Leaderboard helper
function getLeaderboard() {
  return JSON.parse(localStorage.getItem('phQuizScores') || '[]');
}

// Global UI for onclick compatibility
window.UI = { closeModal };
