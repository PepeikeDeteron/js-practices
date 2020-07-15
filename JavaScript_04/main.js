'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  function getCalenderHead() {
    const dates = [];
    // month => 0~11, day => 0~6
    const d = new Date(year, month, 0).getDate(); // 先月の末日(今月の0日目)を取得
    const n = new Date(year, month, 1).getDay(); // disabled になる日数 => 今月の1日が週の何日目かを取得

    for (let i = 0; i < n; i++) {
      dates.unshift({ // d から遡って日付を挿入
        date: d - i, // [30], [29, 30], [28, 29, 30]...
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function getCalenderBody() {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate() // 今月の末日(翌月の0日目)を取得

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  }

  function getCalenderTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay()

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function clearCalender() {
    const tbody = document.querySelector('tbody');

    // tbody の最初の子要素がある限り tbody から削除
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    // padStart(2, '0') => 2桁で表示 満たない場合0の文字列で補填
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalenderHead(), // 1つの配列の中ですべての要素を展開するためのスプレット構文
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7)); // 先頭から7個分を取り出しつつ削除
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');

      week.forEach(date => {
        const td = document.createElement('td');

        // 日付を挿入 (取り出した要素 date に dates オブジェクトの date プロパティを渡す)
        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalender() {
    clearCalender();
    renderTitle();
    renderWeeks();
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }

    createCalender();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }

    createCalender();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalender();
  });

  createCalender();
}