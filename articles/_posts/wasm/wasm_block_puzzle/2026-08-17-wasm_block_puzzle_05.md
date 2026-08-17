---
layout: post
part: WebAssembly
title: ブロックパズルをWASM公開する
categories: [wasm, wasm_block_puzzle]
chapter: 3
section: 5
section_title: GitHub Pages に公開する・振り返り
description: build/webの中身をGitHub Pagesにアップロードして、ブロックパズルをブラウザで公開します。
---

## {{ page.section_title }}

### GitHub Pages に公開する

`build/web` の中身（`app.html`・`app.js`・`app.wasm`・`app.data`）は静的ファイルなので、GitHub Pages にそのまま置くだけで公開できます。

### リポジトリを用意する

GitHub に新しいリポジトリを作ります。名前は何でも構いません（例: `block-puzzle`）。

### `build/web` をプッシュする

```bash
ruby2d_tetrominos $ cd build/web
build/web $ git init
build/web $ git add .
build/web $ git commit -m "ブロックパズル WASM 公開"
build/web $ git branch -M main
build/web $ git remote add origin https://github.com/ユーザー名/block-puzzle.git
build/web $ git push -u origin main
```

### GitHub Pages を有効にする

1. GitHub のリポジトリページを開く
2. **Settings** → **Pages** を開く
3. **Branch** を `main` に設定して **Save**

しばらく待つと、以下の URL でゲームが公開されます。

```
https://ユーザー名.github.io/block-puzzle/app.html
```

### URL を友達に送る

インストール不要で、URL を開くだけでゲームが遊べます。  
スマートフォンのブラウザでも動作しますが、キーボード操作が必要なゲームのためPCが推奨です。

### このチャプターで学んだこと

| セクション | 学んだ内容 |
|---|---|
| 1 | 複数ファイル構成と `require` が使えない理由 |
| 2 | Rakefile でファイルをバンドルする仕組み |
| 3 | カスタム HTML テンプレートの作り方と注意点 |
| 4 | `rake wasm` でビルド・`rake serve` でローカル確認 |
| 5 | GitHub Pages への公開手順 |

### まとめ

ブロックパズルのような複数ファイル構成のプロジェクトも、Rakefile でバンドルすることでWASM化できます。  
一度 `rake wasm` の仕組みを作れば、ゲームを更新するたびにコマンド1つで再ビルド・再公開できます。

#### *最後に試したいこと

- ゲームをアップデートして `rake wasm` で再ビルドし、GitHub Pages に再プッシュしてみよう。
- 友達に URL を送って、ブラウザだけで遊んでもらおう。
