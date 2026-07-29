---
layout: post
part: Bootstrap
title: Bootstrap基礎
categories: [bootstrap, bootstrap_basic]
chapter: 1
section: 3
section_title: gap系ユーティリティで余白を整える
description: グリッドの余白を調整するgクラスと、flexboxのgapに対応するgapクラスの違いを学びます。
---

## {{ page.section_title }}

### グリッドの余白（ガター）を調整する

前回作った`row`と`col`の間には、初期状態でも左右に少し余白（ガター）が入っています。この余白の大きさは`g-*`のようなクラスで調整できます。

```html
<div class="row g-4">
  <div class="col-md-4">河内貯水池</div>
  <div class="col-md-4">遠賀川水源地ポンプ室</div>
  <div class="col-md-4">官営八幡製鐵所</div>
</div>
```

`g-4`のように`row`につけると、列と列の間・上下の余白がまとめて広がります。数字は`0`〜`5`まであり、大きいほど余白が広くなります。左右だけ調整したいときは`gx-*`、上下だけなら`gy-*`も使えます。

### flexboxのgap

CSSチャプターの`Flexbox`の回で、`display: flex`にした要素同士の間隔を`gap`プロパティで空ける方法を学びました。Bootstrapにも、それに対応する`gap-*`というクラスがあります。

```html
<div class="d-flex gap-3">
  <button class="btn btn-primary">送信する</button>
  <button class="btn btn-secondary">キャンセル</button>
</div>
```

`d-flex`は`display: flex;`と同じ意味のクラスです。そこに`gap-3`をつけることで、CSSで`gap: 1rem;`（`gap-3`は`1rem`に対応）と書いたのと同じ効果になります。

### g-*とgap-*の違い

どちらも「余白を空ける」クラスですが、使う場所が違います。

- `g-*`（`gx-*`/`gy-*`） — `row`と`col`の**グリッドの中の余白**専用
- `gap-*` — `d-flex`や、この後CSSチャプターで学んだような`display: grid`を使った要素同士の余白全般

「グリッド（row/col）の中ならg、それ以外のflexboxならgap」と覚えておくと混同しません。

#### *ここで試したいこと

- `g-4`の数字を`0`や`5`に変えて、余白の広さがどう変わるか比べてみよう。

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
      <div class="col-12 col-md-4">河内貯水池</div>
      <div class="col-12 col-md-4">遠賀川水源地ポンプ室</div>
      <div class="col-12 col-md-4">官営八幡製鐵所</div>
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
