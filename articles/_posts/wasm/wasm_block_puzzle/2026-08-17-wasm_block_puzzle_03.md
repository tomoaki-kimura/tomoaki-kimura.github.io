---
layout: post
part: WebAssembly
title: ブロックパズルをWASM公開する
categories: [wasm, wasm_block_puzzle]
chapter: 3
section: 3
section_title: カスタム HTML テンプレートを作る
description: デフォルトのHTMLを使わず、操作説明を加えた自分好みのページを作ります。
---

## {{ page.section_title }}

### なぜカスタム HTML が必要か

`ruby2d build --web` が自動生成する `app.html` は、ゲームを動かすのに必要な最低限の内容だけが含まれています。  
操作説明を追加したり、背景色を変えたりするには、自分で HTML を用意する方が簡単です。

### `web/index.html` を作る

プロジェクトルートに `web/` ディレクトリを作り、`index.html` を置きます。

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>BLOCK GAME</title>
    <style>
      body {
        font-family: system-ui;
        background: #111;
        color: #ddd;
        padding-top: 32px;
      }
      #canvas {
        display: block;
        margin: 0 auto;
      }
      .controls {
        width: 220px;
        margin: 20px auto 0;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 6px 16px;
        font-size: 0.9rem;
        line-height: 1.6;
      }
      kbd {
        display: inline-block;
        background: #2a2a2a;
        border: 1px solid #555;
        border-radius: 4px;
        padding: 1px 7px;
        font-family: monospace;
        font-size: 0.85rem;
        color: #eee;
      }
      span { color: #aaa; }
      #output { display: none; }
    </style>
  </head>
  <body>
    <canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>
    <div class="controls">
      <div><kbd>A</kbd> / <kbd>D</kbd></div><span>左右移動</span>
      <div><kbd>S</kbd></div><span>ソフトドロップ</span>
      <div><kbd>J</kbd> / <kbd>K</kbd></div><span>左回転 / 右回転</span>
      <div><kbd>Space</kbd></div><span>スタート</span>
      <div><kbd>R</kbd></div><span>リスタート</span>
    </div>
    <textarea id="output"></textarea>
  </body>
  <script>
    var Module = {
      canvas: (function() {
        return document.getElementById('canvas');
      })(),
      print: (function() {
        var element = document.getElementById('output');
        if (element) element.value = '';
        return function(text) {
          if (arguments.length > 1) {
            text = Array.prototype.slice.call(arguments).join(' ');
          }
          console.log(text);
          if (element) {
            element.value += text + "\n";
            element.scrollTop = element.scrollHeight;
          }
        };
      })()
    };
  </script>
  <script async src="app.js"></script>
</html>
```

### 重要なポイント

**① `<canvas id="canvas">` は必須**

Emscripten はこの ID を持つ `<canvas>` 要素にゲームを描画します。削除したり ID を変えたりすると、何も表示されません。

**② `body` に `display: flex` を使わない**

`display: flex` を `body` に設定すると、Emscripten がキャンバスのサイズを計算するときに影響が出て、1×1ピクセルになってしまいます。  
中央寄せには `margin: 0 auto` を使います。

**③ `<script>` タグは `</body>` の後に書く**

```html
  </body>
  <script>
    var Module = { ... };
  </script>
  <script async src="app.js"></script>
</html>
```

Emscripten の `Module` オブジェクトと `app.js` の読み込みは、`</body>` の**後**に置きます。`<body>` 内に書くと、`<canvas>` の準備が整う前にスクリプトが動いてしまい、正常に動作しません。

**④ `<textarea id="output">` を非表示で残す**

```html
<textarea id="output"></textarea>
```
```css
#output { display: none; }
```

Emscripten のデバッグ出力を受け取るために必要です。`display: none` で非表示にしつつ、削除はしません。

#### *ここで試したいこと

- `.controls` の中の操作説明を、自分のゲームに合わせて書き換えてみよう。
- `background` の色を変えて、好きな配色にしてみよう。
