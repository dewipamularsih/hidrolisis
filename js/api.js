// API Module: Handle data fetching and filtering (simulated API)

const API_BASE = './data.json';

let cachedData = null;

export async function getData() {
  if (cachedData) return cachedData;
  
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('Failed to load data');
    cachedData = await response.json();
    return cachedData;
  } catch (error) {
    console.error('API Error:', error);
    // Fallback data
    return [
      {name: 'Error', ph: 7, type: 'Netral', color: 'Hijau', effect: 'Coba refresh', image: '', description: 'Data gagal dimuat'}
    ];
  }
}

export function filterData(query = '', type = '') {
  return cachedData?.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) &&
    (!type || item.type.includes(type))
  ) || [];
}

export function getRandomItem(data) {
  return data[Math.floor(Math.random() * data.length)];
}

export function generateQuizQuestions(data, count = 5) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    const item = getRandomItem(data);
    questions.push({
      question: `${item.name} termasuk jenis ${item.type.toLowerCase()}?`,
      correct: item.type.toLowerCase().includes('asam') ? 'asam' : 'basa',
      options: ['asam', 'basa', 'netral'],
      item
    });
  }
  return questions;
}
