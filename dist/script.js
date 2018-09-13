"use strict";

;(function () {
  // ターゲット指定
  var targets = document.querySelectorAll("img[data-src]");

  // 実際の画像パス
  var img_path = "data-src";

  // オプション
  var options = {
    // 上下100px手前で発火
    rootMaring: "100px 0"
  };

  // 初期化
  var observer = new IntersectionObserver(callback, options);

  Array.prototype.forEach.call(targets, function (img) {
    // 監視の開始
    observer.observe(img);
  });

  // コールバック
  function callback(entries, object) {
    entries.forEach(function (entry) {

      // 交差していない
      if (!entry.isIntersecting) return;

      // ターゲット要素
      var img = entry.target;

      // 遅延ロード実行
      loading(img);

      // 監視の解除
      object.unobserve(img);
    });
  };

  // 遅延ロード
  function loading(img) {
    // data-srcの値を取得
    var src_val = img.getAttribute(img_path);
    if (src_val) {
      // 画像パスを設定
      img.src = src_val;
      img.onload = function () {
        // data-src属性を削除
        this.removeAttribute(img_path);
        this.className = 'is-show';
      };
    }
  };
})();