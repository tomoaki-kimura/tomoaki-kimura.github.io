---
layout: post
part: Bootstrap
title: Bootstrap基礎
categories: [bootstrap, bootstrap_basic]
chapter: 1
section: 7
section_title: テーブルとモバイルの相性・d-*-noneで切り替える
description: 横幅の広いテーブルがスマホで崩れる問題と、画面幅ごとに表示を切り替えるd-noneユーティリティの使い方を学びます。
---

## {{ page.section_title }}

### テーブルはスマホと相性が悪い

前回の`<table>`は、列数が少なければパソコンの画面では綺麗に見えます。しかし、列数が増えたり、スマートフォンの狭い画面で表示したりすると、セルが窮屈になったり、表がはみ出して横スクロールが必要になったりします。CSSチャプターで学んだメディアクエリで文字サイズを小さくするくらいでは、根本的な解決になりません。

### 発想を変える：画面幅ごとに別のレイアウトを用意する

よくある解決方法は、「表を無理に縮めようとせず、パソコンでは表・スマホではカード（縦積み）というように、まったく別のHTMLを両方用意しておいて、画面幅に応じてどちらかだけを表示する」というものです。

Bootstrapの`d-none`と、画面幅ごとの`d-{breakpoint}-block`/`d-{breakpoint}-none`を組み合わせます。

```html
<!-- パソコン（lg以上）でだけ表示する表 -->
<table class="table d-none d-lg-table">
  <thead>
    <tr>
      <th>コース</th>
      <th>所要時間</th>
      <th>料金</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>通常コース</td>
      <td>60分</td>
      <td>無料</td>
    </tr>
    <tr>
      <td>ガイド付きコース</td>
      <td>90分</td>
      <td>500円</td>
    </tr>
  </tbody>
</table>

<!-- スマホ（lg未満）でだけ表示するカード -->
<div class="d-lg-none">
  <div class="card mb-3">
    <div class="card-body">
      <h3 class="card-title">通常コース</h3>
      <p class="card-text">所要時間: 60分 / 料金: 無料</p>
    </div>
  </div>
  <div class="card mb-3">
    <div class="card-body">
      <h3 class="card-title">ガイド付きコース</h3>
      <p class="card-text">所要時間: 90分 / 料金: 500円</p>
    </div>
  </div>
</div>
```

### 読み解き方

- `d-none d-lg-table` — 初期状態は`d-none`（非表示）だが、`lg`（だいたいパソコンの画面幅）以上になると`table`として表示される。`<table>`には`d-lg-block`ではなく`d-lg-table`を使うのがポイントです（`table`要素は`display: table`で表示するのが正しいため）。
- `d-lg-none` — `lg`未満（タブレット・スマホの画面幅）でだけ表示され、`lg`以上では非表示になる

つまり、`lg`を境目に「表」と「カード」がちょうど入れ替わるように、正反対の指定をペアで使っています。CSSチャプターで学んだ`col-md-4`などと同じ、Bootstrapのブレークポイントの考え方の応用です。

### 同じデータを2通り書く手間はある

この方法は、同じ「通常コース」「ガイド付きコース」のデータを、表用とカード用の2箇所に書く必要があります。データが増えるとHTMLの記述量も増えるため、本当に必要な場面（列数が多く、単純に文字を小さくするだけでは読みにくい表）に絞って使うとよいでしょう。列数が少ない表なら、前回学んだ`table-sm`だけで乗り切れることも多いです。

#### *ここで試したいこと

- ブラウザの開発者ツールで画面幅を`992px`（`lg`の境目）をまたいで変えてみて、表とカードが入れ替わる瞬間を確認してみよう。

### ここまでのコード（完成版）

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

    <table class="table table-striped table-hover table-bordered table-sm mt-4 d-none d-lg-table">
      <thead>
        <tr>
          <th>コース</th>
          <th>所要時間</th>
          <th>料金</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>通常コース</td>
          <td>60分</td>
          <td>無料</td>
        </tr>
        <tr>
          <td>ガイド付きコース</td>
          <td>90分</td>
          <td>500円</td>
        </tr>
      </tbody>
    </table>

    <div class="d-lg-none mt-4">
      <div class="card mb-3">
        <div class="card-body">
          <h3 class="card-title">通常コース</h3>
          <p class="card-text">所要時間: 60分 / 料金: 無料</p>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <h3 class="card-title">ガイド付きコース</h3>
          <p class="card-text">所要時間: 90分 / 料金: 500円</p>
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
