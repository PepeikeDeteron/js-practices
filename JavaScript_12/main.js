'use strict';

{
  const menuItems = document.querySelectorAll('.menu li a');
  const contents = document.querySelectorAll('.content');

  //* 取得したひとつひとつの要素に対してイベントを設定
  for (const clickedItem of menuItems) {
    clickedItem.addEventListener('click', e => {
      e.preventDefault(); //* リンク先へのページ遷移をキャンセル

      //* active クラスをつける処理の前に全ての menuItems から active クラスを外す
      for (const item of menuItems) {
        item.classList.remove('active');
      }
      clickedItem.classList.add('active');

      //* いったん全ての content に対して active クラスを削除したあとに、
      //* クリックしたメニュー項目に応じて、対応した content にだけ active クラスを付ける
      for (const content of contents) {
        content.classList.remove('active');
      }

      document.getElementById(clickedItem.dataset.id).classList.add('active');
    });
  }
}