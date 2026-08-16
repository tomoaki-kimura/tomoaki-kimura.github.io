---
layout: post
part: WebAssembly
title: ブロックパズルをWASM公開する
categories: [wasm, wasm_block_puzzle]
chapter: 3
section: 4
section_title: rake wasm でビルド・ローカルで確認する
description: rake wasm でビルドし、rake serve でローカルサーバーを立ち上げてブラウザで動作確認します。
---

## {{ page.section_title }}

### ビルドする

Emscripten を有効化したターミナルで、プロジェクトルートから実行します。

```bash
ruby2d_tetrominos $ source /path/to/emsdk/emsdk_env.sh
ruby2d_tetrominos $ bundle exec rake wasm
```

以下のような出力が出ればビルド成功です。

```
Bundled → .bundle/bundle.rb
...（Emscripten のコンパイルログ）...
Template applied → build/web/app.html
```

### 生成されたファイルを確認する

```bash
ruby2d_tetrominos $ ls build/web
app.data  app.html  app.js  app.wasm
```

| ファイル | 内容 |
|---|---|
| `app.html` | `web/index.html` のコピー（カスタムテンプレート） |
| `app.js` | WASMを読み込んで実行するJavaScript |
| `app.wasm` | 結合したRubyコードをコンパイルしたバイナリ |
| `app.data` | フォントなどのアセット |

### ローカルで確認する

```bash
ruby2d_tetrominos $ bundle exec rake serve
Serving at http://localhost:8080/app.html
```

ブラウザで `http://localhost:8080/app.html` を開くと、ゲームが動作します。

止めるときはターミナルで `Ctrl + C` を押します。

### うまく動かないときの確認ポイント

**キャンバスが表示されない・1×1になる**

- `body` に `display: flex` が設定されていないか確認する
- `<script>` タグが `</body>` の後にあるか確認する

**ゲームが動かない・エラーになる**

ブラウザの開発者ツール（`F12`）でコンソールを開き、エラーメッセージを確認します。  
よくある原因：

- `.bundle/bundle.rb` にクラスが正しい順序で含まれていない
- `require` 行の削除が不完全（`gsub` の正規表現を確認）
- Emscripten が有効化されていない状態でビルドした

**`emcc not found` エラー**

ターミナルを開き直したときは `source ./emsdk_env.sh` を再実行します。

#### *ここで試したいこと

- ブラウザの開発者ツールでコンソールを開き、エラーが出ていないか確認しよう。
- `.bundle/bundle.rb` を開いて、全ファイルが正しく結合されているか見てみよう。
