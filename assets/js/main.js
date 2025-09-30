---
---

// ブレイクポイントを設定
const mediaQuery = window.matchMedia('(min-width: 768px)');

// 関数を定義
const checkWindow = (windowSize) => {
    // ウィンドウサイズが768px以上か
    if (windowSize.matches) {
        // 768px以上の時（PCの処理）
        console.log('PC');
    } else {
        // 上記以外の時（SPの処理）
        console.log('SP');
    }
}

// ロード時に判定
checkWindow(mediaQuery);

// ブレイクポイントが切り替わったら判定
mediaQuery.addEventListener('change', checkWindow);
