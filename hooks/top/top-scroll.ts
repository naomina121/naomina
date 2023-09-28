// ヘッダーメニュー固定時
export const options = {
  rootMargin: '78px',
  threshold: 1,
};

// カスタムフックに渡すコールバック関数
export const showElements = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    let headerMenuListElement = document.querySelector(
      `[data-ref="${entry.target.id}"]`
    );
    if (entry.isIntersecting && headerMenuListElement !== null) {
      // IntersectionObserver で設定された条件を満たした時に実行する処理
      // 要素に active クラスを適用する
      headerMenuListElement.classList.add('current');
    } else if (headerMenuListElement !== null) {
      headerMenuListElement.classList.remove('current');
    }
  });
};
