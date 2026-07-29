---
layout: post
part: Bootstrap
title: Bootstrap基礎
categories: [bootstrap, bootstrap_basic]
chapter: 1
section: 1
section_title: BootstrapとはCDNで導入する
description: CSSフレームワークBootstrapとは何か、CDN経由で読み込んで使い始める方法を学びます。
---

## {{ page.section_title }}

### Bootstrapとは

CSSチャプターの「クラス設計の考え方」の回で、「汎用的なクラスを組み合わせて画面を組み立てる」という考え方に触れました。Bootstrapは、その考え方をあらかじめ大量のクラスとして用意してくれている、世界で最も使われているCSSフレームワークです。自分で1つ1つ`.btn`や`.card`のようなクラスを設計しなくても、Bootstrapが用意したクラス名をHTMLに書くだけで、それなりに整った見た目になります。

### CDNで読み込む

自分でファイルをダウンロードしなくても、インターネット上に置かれたBootstrapのファイルを`<link>`と`<script>`で読み込むだけで使えます。このような配布方法をCDN（Content Delivery Network）と呼びます。

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
  <h1>Bootstrapを試す</h1>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

- `<link>`（CSS）は`<head>`の中に書きます。これまで学んできた自分のCSSファイル（`style.css`）と同じ役割で、Bootstrapが用意した大量のクラスのスタイル定義が入っています。
- `<script>`（JS）は`</body>`の直前に書きます。ドロップダウンメニューやモーダルなど、クリックで動く部品を動かすための土台になります。今回はCSSのクラス中心に扱うので、JSの中身には深入りしません。

バージョン番号（`5.3.3`の部分）は今後上がっていくので、実際に使うときは[Bootstrap公式サイト](https://getbootstrap.com/){:target="_blank"}で最新のCDNリンクを確認しましょう。

### viewportメタタグを忘れずに

CSSチャプターのメディアクエリの回で学んだ、以下のメタタグは、Bootstrapを使う上でも必須です。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Bootstrapのレスポンシブ機能（この後学ぶグリッドシステムなど）は、このメタタグが無いと正しく機能しません。

#### *ここで試したいこと

- `<h1>`を表示するだけの簡単なHTMLファイルを作り、Bootstrapを読み込んで、文字のフォントが少し変わることを確認してみよう（Bootstrapは読み込むだけで、全体に軽くデフォルトスタイルがあたります）。

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
  <h1>Bootstrapを試す</h1>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
