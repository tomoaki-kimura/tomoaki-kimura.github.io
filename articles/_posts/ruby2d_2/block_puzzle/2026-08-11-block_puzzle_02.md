---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 2
section_title: アプリ設計・ディレクトリ構成
description: ファイルを役割ごとに分けてリリースを意識した構成を作ります。
---

## {{ page.section_title }}

### ファイルを分ける理由

これまでのゲームは `main.rb` 1ファイルに全部書いてきました。  
それでも動きますが、コードが長くなるにつれて「どこに何が書いてあるか」が分からなくなってきます。

今回は最初からファイルを役割ごとに分けます。  
ファイルを分けることには次のような利点があります。

- 「このファイルは○○の責任」と明確になる
- 修正したいときに探しやすい
- 後からクラスを追加・差し替えしやすい

### ディレクトリ構成

```
ruby2d_tetris/
├── app/
│   ├── main.rb                  # エントリーポイント
│   └── models/
│       ├── blocks/
│       │   ├── block.rb         # 1マスのブロック
│       │   └── block_map.rb     # グリッドの状態管理
│       ├── tetrominos/
│       │   ├── tetromino_base.rb  # テトロミノの基底クラス
│       │   ├── tetromino_i.rb
│       │   ├── tetromino_j.rb
│       │   ├── tetromino_l.rb
│       │   ├── tetromino_o.rb
│       │   ├── tetromino_s.rb
│       │   ├── tetromino_t.rb
│       │   └── tetromino_z.rb
│       ├── stage/
│       │   └── stage.rb         # 画面レイアウト
│       └── game/
│           └── game.rb          # ゲームの状態管理
├── settings.rb                  # 定数（画面サイズ・速度など）
├── config.rb                    # require をまとめる
├── web/
│   └── index.html               # WASM用HTMLテンプレート
├── Gemfile
└── Rakefile
```

### 継承の設計

このゲームのクラス設計のポイントは**継承**です。

```
Square（Ruby2D の標準クラス）
  └── Block（1マスのブロック）
        └── TetrominoBase（テトロミノの共通ロジック）
              ├── TetrominoI
              ├── TetrominoJ
              ├── TetrominoL
              ├── TetrominoO
              ├── TetrominoS
              ├── TetrominoT
              └── TetrominoZ
```

`Square` を継承することで、Ruby2D の描画機能をそのまま使えます。  
`TetrominoBase` に移動・回転などの共通ロジックをまとめ、7種類のテトロミノはそれぞれの形（マップ）だけを定義します。

### config.rb の役割

`config.rb` はファイルの読み込み順を管理します。  
`require "ruby2d"` や各モデルの `require` をここに集めることで、`main.rb` をすっきりさせられます。

```ruby
require "ruby2d"

require "./settings"

require "./app/models/stage/stage"

require "./app/models/blocks/block"
require "./app/models/blocks/block_map"

require "./app/models/tetrominos/tetromino_base"
require "./app/models/tetrominos/tetromino_i"
# ... 他のテトロミノ

require "./app/models/game/game"
```

`main.rb` は `require "./config"` の1行だけで全部読み込めます。

### Rakefile

ゲームの起動や WASM ビルドは `rake` コマンドで行います。

```ruby
task default: %w[game]

task :game do
  ruby "app/main.rb"
end

task :wasm do
  # ファイルを1つに結合して WASM ビルド
  # （詳しくは WASM チャプターで）
end
```

```bash
bundle exec rake        # ゲームを起動
bundle exec rake wasm   # WASM ビルド
```

次のページでは、画面サイズや速度などの定数をまとめた `settings.rb` を作ります。
