---
layout: post
part: Bootstrap
title: Bootstrap基礎
categories: [bootstrap, bootstrap_basic]
chapter: 1
section: 6
section_title: Bootstrapのテーブル
description: table・table-striped・table-hover・table-borderedなど、Bootstrapのテーブル用クラスを学びます。
---

## {{ page.section_title }}

### tableクラスをつけるだけで整う

HTMLチャプターの`<table>`の回で作った「見学コース」の表を、Bootstrapで整えてみましょう。`<table>`に`class="table"`をつけるだけで、余白や罫線が整った見た目になります。

```html
<table class="table">
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
```

`<thead>`/`<tbody>`/`<tr>`/`<th>`/`<td>`の役割は、HTMLチャプターで学んだものと変わりません。Bootstrapは、その上に見た目だけを重ねてくれます。

### 見た目のバリエーション

よく組み合わせて使うクラスがいくつかあります。

```html
<table class="table table-striped table-hover table-bordered table-sm">
  ...
</table>
```

- `table-striped` — 1行おきに背景色をつけて縞模様にする（行が多い表で見やすくなる）
- `table-hover` — マウスを乗せた行の背景色が変わる
- `table-bordered` — セルの周りすべてに罫線をつける（初期状態は横線のみ）
- `table-sm` — セルの余白を詰めて、コンパクトな表にする

これらは自由に組み合わせられます。今回の「見学コース」のような短い表なら`table`だけで十分ですが、行数の多い表では`table-striped`があると読みやすくなります。

#### *ここで試したいこと

- 「見学コース」の表に`table-striped`と`table-hover`を追加して、見た目と挙動を確認してみよう。

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

    <table class="table table-striped table-hover table-bordered table-sm mt-4">
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

    <div class="d-flex gap-3 mt-4">
      <button class="btn btn-primary">送信する</button>
      <button class="btn btn-secondary">キャンセル</button>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
