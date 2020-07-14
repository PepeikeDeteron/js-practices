'use strict';

{
  const btn = document.getElementById('btn');

  btn.addEventListener('click', () => {
    const n = Math.random();
    if (n < 0.1) {
      btn.textContent = '大吉'; // 10%
    } else if (n < 0.3) {
      btn.textContent = '中吉'; // 20%
    } else if (n < 0.65) {
      btn.textContent = '小吉'; // 35%
    } else if (n < 0.9) {
      btn.textContent = '凶'; // 25%
    } else {
      btn.textContent = '大凶'; // 10%
    }
  });
}