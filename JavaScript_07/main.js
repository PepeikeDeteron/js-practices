'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  // フィッシャー–イェーツのシャッフル
  const shuffle = arr => {
    for (let end_i = arr.length - 1; end_i > 0; end_i--) {
      const random_j = Math.floor(Math.random() * (end_i + 1));
      [arr[random_j], arr[end_i]] = [arr[end_i], arr[random_j]];
    }
    return arr;
  };

  const quizSet = shuffle([ // c[0] に正解を用意
    {q: '原作のサザエさん未来予想図では、アニメとは違いタラちゃんに妹がいる事になっているがその妹の名前は？', c: ['ヒトデちゃん', 'ホタテちゃん', 'アワビちゃん']},
    {q: '医学的にストレスという言葉が使われるようになったのは2020年現在から数えて何年前？', c: ['約80年前', '約200年前', '約30年前']},
    {q: 'アイスクリームの賞味期限はいつまで？', c: ['賞味期限はない', '2年', '5年']},
    {q: '1日2回も収穫できるくらい育つのが早い野菜はどれ？', c: ['アスパラガス', 'キャベツ', 'ねぎ']},
    {q: '救急車を呼ぶか迷っている時に医師や看護師がアドバイスをくれる電話番号はどれ？', c: ['7119', '5119', '114514']},
    {q: '歌舞伎の看板の順番が由来で、色男のことを「二枚目」と言うのは有名であるが、5枚目はどんな役を指していたか？', c: ['敵役', '道化', '座長']},
    {q: 'パソコンの、マウスの移動距離の単位は？', c: ['ミッキー', 'ジェリー', 'ピクセル']},
    {q: '卵と玉子の違いはなに？', c: ['料理の材料として使う場合は玉子と表記する', '殻が白いのは卵、茶色いのは玉子', '特に意味はない']},
    {q: '蝶の正しい数え方は？', c: ['頭', '羽', '足']},
    {q: '中国語では、「手紙」と書くと何を意味する？', c: ['トイレットペーパー', '計算用紙', 'はがき']},
  ]);
  let currentNum = 0;
  let score = 0;
  let isAnswered;

  const setQuiz = () => {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.firstChild.remove();
    }

    /* 正誤判定のためにもとの配列を残したままシャッフルする必要があるので,
    shuffle() には参照ではなく quizSet の配列の値のコピーを渡す
    => 新しい配列(大括弧)の中にスプレット構文で配列の要素を展開する */
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
      for (const choice of shuffledChoices) {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    }

    if (currentNum === quizSet.length - 1) { // 最後の問題の場合
      btn.textContent = 'Show Score';
    }
  };

  const checkAnswer = li => {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  };

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });

}
