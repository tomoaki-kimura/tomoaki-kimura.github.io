---
layout: post
part: WebAssembly
title: ブロックパズルをWASM公開する
categories: [wasm, wasm_block_puzzle]
chapter: 3
section: 1
section_title: このチャプターについて・複数ファイル構成の課題
description: 複数ファイルに分かれたRuby2Dアプリをブラウザに公開するための準備と、requireが使えない問題を理解します。
---

## {{ page.section_title }}

### このチャプターについて

前のチャプターでは、1ファイルで完結しているアプリをWASM化しました。  
このチャプターでは、**複数ファイルに分かれた**ブロックパズルゲームをWASM化して、GitHub Pages で公開するところまでを扱います。

ブロックパズルのプロジェクト構成はこうなっています。

```
ruby2d_tetrominos/
├── app/
│   ├── main.rb
│   └── models/
│       ├── blocks/
│       ├── game/
│       ├── stage/
│       └── tetrominos/
├── settings.rb
├── config.rb
├── web/
│   └── index.html
├── Gemfile
└── Rakefile
```

`main.rb` が `require` で各ファイルを読み込む構成です。

### 複数ファイル構成の課題

`ruby2d build --web main.rb` は渡した1ファイルだけをコンパイルします。  
他のファイルは一緒にビルドされないため、実行時に以下のエラーになります。

```
undefined method 'require' for main:Object (NoMethodError)
```

**なぜ `require` が使えないのか**

Ruby2D の WASM ビルドは **mruby**（組み込み向けの軽量Ruby）を使います。  
mruby は通常の CRuby と異なり、`require` によるファイルの動的読み込みをサポートしていません。

| | CRuby（通常のRuby） | mruby（WASM） |
|---|---|---|
| `require` | 使える | 使えない |
| ファイル分割 | 自由 | 1ファイルに結合が必要 |

### 解決策：1ファイルに結合してからビルドする

複数のファイルを**1つの `.rb` ファイルに結合**してから `ruby2d build --web` に渡します。  
手作業でコピペするのは大変なので、**Rakefile にバンドルタスクを作って自動化**します。

次のセクションでその実装を見ていきましょう。

#### *ここで試したいこと

- `ruby2d_tetrominos` ディレクトリで `ruby2d build --web app/main.rb` を実行して、実際にエラーになることを確認しよう。
