---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 11
section_title: 完成・動作確認
description: main.rb で全パーツを繋いでゲームを完成させ、動作を確認します。
---

## {{ page.section_title }}

### main.rb — 全体を繋ぐ

`main.rb` はゲームのエントリーポイントです。  
`config.rb` を読み込んで画面設定・オブジェクト生成・ゲームループを書きます。

```ruby
require "./config"

set width: SCREEN_WIDTH, height: SCREEN_HEIGHT

stage = Stage.new
game  = Game.new

on :key_down do |event|
  game.on_key_down(event.key)
end

on :key_up do |event|
  game.on_key_up(event.key)
end

update do
  game.update
  stage.update_score(game.score, game.high_score, game.level)
end

show
```

シンプルです。`main.rb` にはゲームロジックは一切書かず、  
「オブジェクトを作って繋ぐ」だけの役割に徹しています。

### ゲームを起動する

```bash
bundle exec rake
```

`SPACE` キーでゲームスタート、操作してみましょう。

### 動作確認チェックリスト

| 確認項目 | ✓ |
|---|---|
| ゲーム起動後、「BLOCK GAME」と「SPACE to start」が表示される | |
| `SPACE` でゲームが始まり、テトロミノが落ちてくる | |
| `A`/`D` で左右に動く | |
| `S` で加速して落ちる | |
| `J`/`K` で回転し、壁・他のブロックに当たると回転できない | |
| テトロミノが着地後、少し待ってから固定される（ロックディレイ） | |
| 着地直後に左右移動・回転ができる | |
| 横一列が揃うと点滅してから消える | |
| スコア・ハイスコア・レベルが右パネルに表示される | |
| レベルアップで落下が速くなる | |
| ブロックが上端に達するとゲームオーバー | |
| `R` でリスタートできる | |
| NEXT エリアに次のテトロミノが表示される | |
| 固定されたブロックはアクティブなものより少し暗い | |

### ファイル構成の最終確認

```
ruby2d_tetris/
├── app/
│   ├── main.rb
│   └── models/
│       ├── blocks/
│       │   ├── block.rb
│       │   └── block_map.rb
│       ├── tetrominos/
│       │   ├── tetromino_base.rb
│       │   ├── tetromino_i.rb
│       │   ├── tetromino_j.rb
│       │   ├── tetromino_l.rb
│       │   ├── tetromino_o.rb
│       │   ├── tetromino_s.rb
│       │   ├── tetromino_t.rb
│       │   └── tetromino_z.rb
│       ├── stage/
│       │   └── stage.rb
│       └── game/
│           └── game.rb
├── settings.rb
├── config.rb
├── web/
│   └── index.html
├── Gemfile
└── Rakefile
```

### このチャプターで学んだこと

- **継承** を使って共通ロジックを基底クラスにまとめる
- **ファイル分割** でコードの責任を明確にする
- **ステートマシン** でゲームの状態を整理する
- **定数管理** でマジックナンバーを排除する
- リリースを意識した **アプリ構成** を作る

---

次のチャプターでは、このゲームを **WebAssembly（WASM）** でブラウザ向けにビルドして、  
GitHub Pages に公開するところまでを扱います。
