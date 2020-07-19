'use strict';

{
  class Panel {
    //* (5). Game クラスのインスタンス (1) を Board クラス経由で受け取る
    constructor(game) {
      this.game = game;
      this.element = document.createElement('li')
      this.element.classList.add('pressed');
      this.element.addEventListener('click', () => {
        this.check();
      });
    }

    getEl() { //* カプセル化
      return this.element;
    }

    activatePanel(num) {
      this.element.classList.remove('pressed');
      this.element.textContent = num;
    }

    check() {
      if (this.game.getCurrentNum() === parseInt(this.element.textContent, 10)) {
        this.element.classList.add('pressed');
        this.game.addCurrentNum();

        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }

  class Board {
    //* (3). Board クラスのコンストラクタで (2) の this を game という名前で受け取る
    constructor(game) {
      this.game = game;
      this.panels = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        //* (4). Panel クラスを作るときに this.game を渡す
        //* => Game クラスのインスタンス (1) を渡せる
        this.panels.push(new Panel(this.game));
      }
      this.setup();
    }

    setup() {
      const board = document.getElementById('board');
      for (const panel of this.panels) {
        board.appendChild(panel.getEl());
      }
    }

    activateBoard() {
      const numbers = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        numbers.push(i);
      }

      for (const panel of this.panels) {
        const num = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
        panel.activatePanel(num);
      }
    }
  }

  class Game {
    constructor(level) {
      this.level = level;
      //* (2). Board クラスのコンストラクタに Game クラスのインスタンス (1) を渡すための引数 this
      this.board = new Board(this);

      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      const btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        this.start();
      });
      this.setup();
    }

    //* 難易度に合わせてレイアウトを動的に変更
    setup() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
    }

    start() {
      //* タイマーが走っていた場合
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }

      this.currentNum = 0;
      this.board.activateBoard();

      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {
      const timer = document.getElementById('timer');
      timer.textContent = ('Time: ' + ((Date.now() - this.startTime) / 1000).toFixed(2));

      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    addCurrentNum() {
      this.currentNum++;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId() {
      return this.timeoutId;
    }

    getLevel() {
      return this.level;
    }
  }

  //* (1). 引数に渡した数値でゲームの難易度をコントロール
  new Game(5);
}