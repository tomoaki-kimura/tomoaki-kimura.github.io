---
layout: post
part: Bootstrap
title: Bootstrap基礎
categories: [bootstrap, bootstrap_basic]
chapter: 1
section: 4
section_title: カード（card）コンポーネントを使う
description: Bootstrapが用意しているcardクラスを使って、画像・見出し・本文・ボタンをまとめたカードを作ります。
---

## {{ page.section_title }}

### 自分で作っていたパネルとの違い

HTML/CSSの「webサイト」チャプターで、`.panel`という自分だけのクラスを作り、画像・見出し・本文をまとめたカード状のパネルを作りました。Bootstrapには、それとよく似た役割の`card`という部品（コンポーネント）が最初から用意されています。

### cardの基本の形

```html
<div class="card">
  <img src="images/kawachi.jpg" class="card-img-top" alt="河内貯水池の堰堤">
  <div class="card-body">
    <h3 class="card-title">河内貯水池</h3>
    <p class="card-text">
      高さ43.1m・幅189mの石造りの堰堤は、完成当時「東洋一のダム」と
      いわれました。今も工業用水を送り続ける、現役の水源です。
    </p>
    <a href="#" class="btn btn-primary">詳しく見る</a>
  </div>
</div>
```

- `card` — カード全体を囲む箱
- `card-img-top` — カード上部に置く画像
- `card-body` — 画像より下の、余白が確保された本文エリア
- `card-title` / `card-text` — 見出し・本文用の見た目調整
- `btn btn-primary` — Bootstrapのボタンクラス（色は`primary`で青系）

自分で`padding`や`border-radius`を1つ1つ指定しなくても、これらのクラス名をつけるだけでカードらしい見た目が完成します。

### グリッドと組み合わせる

前々回学んだ`row`/`col`と組み合わせると、3枚のカードを横並びにできます。

```html
<div class="container">
  <div class="row g-4">
    <div class="col-12 col-md-4">
      <div class="card">
        <img src="images/kawachi.jpg" class="card-img-top" alt="河内貯水池の堰堤">
        <div class="card-body">
          <h3 class="card-title">河内貯水池</h3>
          <p class="card-text">1927年完成。堰堤は高さ43.1m、貯水量約700万トン。</p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="card">
        <img src="images/pump.jpg" class="card-img-top" alt="遠賀川水源地ポンプ室の外観">
        <div class="card-body">
          <h3 class="card-title">遠賀川水源地ポンプ室</h3>
          <p class="card-text">1910年建設・操業開始。今も工業用水の約7割を送り続けています。</p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="card">
        <img src="images/yahata.jpg" class="card-img-top" alt="官営八幡製鐵所旧本事務所">
        <div class="card-body">
          <h3 class="card-title">官営八幡製鐵所</h3>
          <p class="card-text">1901年操業開始。日本で最初の本格的な官営製鉄所です。</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

自分で書いた`.panels`/`.panel`のCSSが、`container`・`row g-4`・`col-md-4`・`card`というクラス名の組み合わせだけで再現できていることに注目してください。

#### *ここで試したいこと

- `card-img-top`の画像を`card`の中の一番下に移動させて（`card-img-bottom`は無いので、`card-body`の後に置くだけでOK）、見た目がどう変わるか確認してみよう。

### ここまでのコード

index.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>コーポレートサイト</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <div class="row g-4">
      <div class="col-12 col-md-4">
        <div class="card">
          <img src="images/kawachi.jpg" class="card-img-top" alt="河内貯水池の堰堤">
          <div class="card-body">
            <h3 class="card-title">河内貯水池</h3>
            <p class="card-text">1927年完成。堰堤は高さ43.1m、貯水量約700万トン。</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card">
          <img src="images/pump.jpg" class="card-img-top" alt="遠賀川水源地ポンプ室の外観">
          <div class="card-body">
            <h3 class="card-title">遠賀川水源地ポンプ室</h3>
            <p class="card-text">1910年建設・操業開始。今も工業用水の約7割を送り続けています。</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card">
          <img src="images/yahata.jpg" class="card-img-top" alt="官営八幡製鐵所旧本事務所">
          <div class="card-body">
            <h3 class="card-title">官営八幡製鐵所</h3>
            <p class="card-text">1901年操業開始。日本で最初の本格的な官営製鉄所です。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex gap-3 mt-4">
      <button class="btn btn-primary">送信する</button>
      <button class="btn btn-secondary">キャンセル</button>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
