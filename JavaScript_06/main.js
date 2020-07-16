'use strict';

{
  const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
  ];
  let word;
  let loc; // 文字の番目
  let score;
  let miss;
  const timeLimit = 10 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function init() {
    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)]; // ランダム取得
  }

  function updateTarget() {
    // 入力し終えた文字をアンダーバーに変換
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    // substring(loc) => loc 番目の文字列を返戻
    target.textContent = placeholder + word.substring(loc);
  }

  function updateTimer() {
    // 残り時間 = 開始時刻 + 制限時間 - 現在時刻
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timeLeft < 0) {
      isPlaying = false; // リプレイ用の初期化

      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      // ブラウザの仕様によりアラートの処理が終わるまで画面描画処理がブロックされてしまうのを防ぐため、
      // showResult 内のアラートの処理にバッファを設ける
      setTimeout(() => {
        showResult();
      }, 10);

      target.textContent = 'click to replay';
    }
  }

  function showResult() {
    // 除数が0 => 正答率を0%と表示
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy.`);
  }

  window.addEventListener('click', () => {
    if (isPlaying === true) { // 既にゲームが始まっていた場合
      return;
    }
    isPlaying = true;

    init();
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keydown', e => {
    if (isPlaying !== true) { // ゲームが始まっていない場合
      return;
    }
    if (e.key === word[loc]) {
      console.log('score');
      loc++;
      if (loc === word.length) { // 文字数と一致したら次の単語を取得
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}