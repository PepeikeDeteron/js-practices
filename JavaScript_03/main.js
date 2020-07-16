'use strict';

{
  function createColumn(col) {
    const source = [];
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col; // col => line 21. createColumn(i)
    }

    const column = [];
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }
    return column;
  }

  function createColumns() {
    const columns = [];
    for (let i = 0; i < 5; i++) {
      columns[i] = createColumn(i);
    }
    columns[2][2] = 'FREE';
    return columns;
  }

  function renderBingo(columns) {
    for (let row = 0; row < 5; row++) { // 行(Row)
      const tr = document.createElement('tr');
      for (let col = 0; col < 5; col++) { // 列(Column)
        const td = document.createElement('td');
        td.textContent = columns[row][col]; // 反転
        tr.appendChild(td);
      }
      document.querySelector('tbody').appendChild(tr);
    }
  }

  const columns = createColumns();
  renderBingo(columns);
}
