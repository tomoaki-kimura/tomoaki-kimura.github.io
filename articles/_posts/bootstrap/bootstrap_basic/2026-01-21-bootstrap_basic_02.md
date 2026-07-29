---
layout: post
part: Bootstrap
title: Bootstrap基礎
categories: [bootstrap, bootstrap_basic]
chapter: 1
section: 2
section_title: グリッドシステムで横並びレイアウトを組む
description: container・row・colを使って、画面幅を12分割するBootstrapのグリッドシステムを学びます。
---

## {{ page.section_title }}

### 12分割のグリッド

Bootstrapは、画面の横幅を**12分割**したマス目（グリッド）に見立てて、そのマス目をいくつ使うかでレイアウトを組む仕組みを持っています。CSSチャプターで学んだ`display: flex`を、内部的にはBootstrapも使っています。

### container・row・col

3つのクラスをセットで使います。

```html
<div class="container">
  <div class="row">
    <div class="col">サービスA</div>
    <div class="col">サービスB</div>
    <div class="col">サービスC</div>
  </div>
</div>
```

- `container` — 内容の幅を画面サイズに応じて適切に制限する、一番外側の箱
- `row` — 横1列の行。この中に`col`を並べる
- `col` — 12分割されたマス目のうち、指定しなければ均等に分け合う1マス

上の例では`col`が3つあるので、12マスを3等分（4マスずつ）した幅で、3つの要素が横並びになります。

### 幅を指定する

`col-4`のように数字をつけると、12マス中いくつ使うかを指定できます。

```html
<div class="row">
  <div class="col-8">メインコンテンツ</div>
  <div class="col-4">サイドバー</div>
</div>
```

`col-8`（8マス）と`col-4`（4マス）で、合計12マスになるように配置しています。

### レスポンシブなグリッド

`col-md-4`のように、`md`（medium、だいたいタブレット以上の幅）などの区分をはさむと、「その画面幅以上のときだけ4マス」という指定になります。

```html
<div class="row">
  <div class="col-12 col-md-4">河内貯水池</div>
  <div class="col-12 col-md-4">遠賀川水源地ポンプ室</div>
  <div class="col-12 col-md-4">官営八幡製鐵所</div>
</div>
```

`col-12`（スマホなどの狭い画面では12マス＝横幅いっぱい＝縦積み）、`col-md-4`（`md`以上の広い画面では4マス＝3等分で横並び）という組み合わせです。CSSチャプターで`@media`を使って自分で書いていたレスポンシブ切り替えを、クラス名を選ぶだけで実現できます。

#### *ここで試したいこと

- `col-md-4`を`col-md-6`に変えて、2等分の横並びになることを確認してみよう。

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
    <div class="row">
      <div class="col-12 col-md-4">河内貯水池</div>
      <div class="col-12 col-md-4">遠賀川水源地ポンプ室</div>
      <div class="col-12 col-md-4">官営八幡製鐵所</div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
