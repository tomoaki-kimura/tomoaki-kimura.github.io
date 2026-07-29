---
layout: post
part: Bootstrap
title: Bootstrap基礎
categories: [bootstrap, bootstrap_basic]
chapter: 1
section: 5
section_title: 代表的なユーティリティクラスをざっと知る
description: 余白・文字・背景色・表示/非表示など、Bootstrapによく出てくるユーティリティクラスをひととおり眺めます。
---

## {{ page.section_title }}

### ユーティリティクラスとは

ここまでの`container`/`row`/`col`/`card`のような「部品」に対して、ちょっとした見た目の微調整（余白・文字色・表示/非表示など）を1つのクラスで済ませてくれるものを、ユーティリティクラスと呼びます。ここでは代表的なものだけ、ざっと紹介します。

### 余白（spacing）

CSSチャプターで学んだ`margin`/`padding`を、数値を書かずにクラス名だけで指定できます。

```html
<p class="mt-3 mb-4 p-3">本文</p>
```

- `m` = margin、`p` = padding
- `t`/`b`/`s`/`e` = top/bottom/start（左）/end（右）、何もつけなければ全方向
- 数字（`0`〜`5`）が大きいほど余白が広い

`mt-3`で「margin-topを少し」、`mb-4`で「margin-bottomをもう少し」というイメージです。

### 文字まわり

```html
<p class="text-center text-muted fw-bold">中央寄せ・グレー・太字の文章</p>
```

- `text-center` — 文字を中央寄せ
- `text-muted` — 少し薄いグレーの文字色（補足文言などによく使う）
- `fw-bold` — 文字を太く（font-weight: bold）

### 背景色・文字色

```html
<div class="bg-primary text-white p-3">重要なお知らせ</div>
```

`bg-primary`（背景を青系に）と`text-white`（文字を白に）を組み合わせて使うことが多いです。`primary`の他に`secondary`/`success`/`danger`/`warning`などの色のバリエーションがあります。

### 角丸・影

```html
<img src="images/kawachi.jpg" class="rounded shadow-sm" alt="河内貯水池">
```

`rounded`で角を丸く、`shadow-sm`で軽い影をつけられます。CSSチャプターで書いていた`border-radius`や`box-shadow`を、クラス名だけで済ませられます。

### 画面幅で表示・非表示を切り替える

```html
<p class="d-none d-md-block">パソコンの画面幅でだけ表示される文章です。</p>
```

`d-none`（非表示）を基本にしつつ、`d-md-block`（`md`以上の画面幅では表示）を組み合わせることで、スマホでは隠してパソコンでだけ見せる、といった調整ができます。グリッドの`col-md-4`と同じ考え方の応用です。

### 使いすぎには注意

ユーティリティクラスは便利ですが、1つのタグに`class="mt-3 mb-4 p-3 text-center text-muted fw-bold rounded shadow-sm d-flex gap-3"`のようにクラス名を大量に並べると、HTMLが読みにくくなります。よく使う組み合わせは、CSSチャプターで学んだ考え方に立ち返って、自分の`class`（例:`.notice`）にまとめてしまうのも実務ではよくある選択です。まずは今回学んだクラス名を知っておくだけで十分です。

#### *ここで試したいこと

- 自分の作ったカードの`card-title`に`text-center`を追加して、見出しが中央寄せになることを確認してみよう。

### ここまでのコード

index.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>福岡県の世界遺産</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <div class="row g-4">
      <div class="col-12 col-md-4">
        <div class="card shadow-sm">
          <img src="images/kawachi.jpg" class="card-img-top" alt="河内貯水池の堰堤">
          <div class="card-body">
            <h3 class="card-title text-center">河内貯水池</h3>
            <p class="card-text">1927年完成。堰堤は高さ43.1m、貯水量約700万トン。</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card shadow-sm">
          <img src="images/pump.jpg" class="card-img-top" alt="遠賀川水源地ポンプ室の外観">
          <div class="card-body">
            <h3 class="card-title text-center">遠賀川水源地ポンプ室</h3>
            <p class="card-text">1910年建設・操業開始。今も工業用水の約7割を送り続けています。</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card shadow-sm">
          <img src="images/yahata.jpg" class="card-img-top" alt="官営八幡製鐵所旧本事務所">
          <div class="card-body">
            <h3 class="card-title text-center">官営八幡製鐵所</h3>
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
