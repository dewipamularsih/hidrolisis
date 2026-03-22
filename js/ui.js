// UI Module: Render and update DOM elements

export function renderItems(items, container) {
  container.innerHTML = items.map(item => `
    <div class="card" data-item="${item.name}" tabindex="0" role="button" aria-label="Cek ${item.name}">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p>${item.ph} | ${item.type}</p>
      <div class="daily">${item.daily}</div>
    </div>
  `).join('');
}

export function showResult(item) {
  const resultEl = document.getElementById('result');
  resultEl.classList.remove('hidden');
  const colorMap = {
    'Merah': '#ff4757',
    'Kuning': '#ffa502',
    'Hijau': '#2ed573',
    'Biru': '#3742fa',
    'Orange': '#ff9500',
    'Biru Muda': '#a4b0be',
    'Hijau Muda': '#1abc9c',
    'Merah Muda': '#ff6b9d'
  };
  
  resultEl.innerHTML = `
    <h2>${item.name}</h2>
    <div class="daily-tip"><strong>💡 Tips Harian:</strong> ${item.daily}</div>
    <p><strong>pH:</strong> ${item.ph} | <strong>${item.type}</strong></p>
    <p><strong>${item.effect}</strong></p>
    <div class="indikator-box" style="background: ${colorMap[item.color] || '#ccc'}"></div>
    <div class="ph-bar">
      <div id="ph-indicator" style="left: ${(item.ph / 14) * 100}%"></div>
    </div>
    <div class="pro-tip"><strong>✅ Tips Pro:</strong> ${item.tips}</div>
  `;
  
  // Animate
  setTimeout(() => document.getElementById('ph-indicator').style.transition = 'left 1s cubic-bezier(0.25,0.46,0.45,0.94)', 100);
}

export function showModal(item) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-content').innerHTML = `
    <span class="close" onclick="UI.closeModal()">&times;</span>
    <img src="${item.image}" alt="${item.name}" style="width: 100px; border-radius: 50%;">
    <h2>${item.name}</h2>
    <p>${item.description}</p>
    <h3>Info Lengkap:</h3>
    <ul>
      <li>pH: ${item.ph}</li>
      <li>Tipe: ${item.type}</li>
      <li>Indikator: ${item.color}</li>
      <li>Efek: ${item.effect}</li>
    </ul>
  `;
  modal.style.display = 'flex';
}

export function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

export function showLoading(show = true) {
  const grid = document.querySelector('.items-grid');
  grid.innerHTML = show ? '<div class="loading"><div class="spinner"></div><p>Loading data...</p></div>' : '';
}

export function renderLeaderboard(scores) {
  const lbEl = document.getElementById('leaderboard');
  if (!scores.length) {
    lbEl.innerHTML = '<p>Tidak ada skor yet!</p>';
    return;
  }
  lbEl.innerHTML = scores.map((s, i) => `
    <div class="leaderboard-item">
      <span>#${i+1} ${s.name} (${s.class})</span>
      <span>${s.score}</span>
    </div>
  `).join('');
}
