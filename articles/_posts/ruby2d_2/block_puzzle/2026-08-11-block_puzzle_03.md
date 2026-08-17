---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 3
section_title: 定数ファイルで設定を一元管理する
description: settings.rb に画面サイズや速度の定数をまとめて、変更しやすい設計にします。
---

## {{ page.section_title }}

### マジックナンバーを避ける

コードの中に `15` や `60` といった数値が直接書いてあると、**その数字が何を意味するのか**が分かりにくくなります。  
これを**マジックナンバー**と呼び、良くない書き方とされています。

```ruby
# 悪い例 — 15 が何なのか分からない
Rectangle.new(x: 15, y: 0, width: 150, height: 300)

# 良い例 — 定数名で意味が分かる
Rectangle.new(x: BOARD_OFFSET_X, y: BOARD_OFFSET_Y,
              width: GRID_SIZE * GRID_COLS, height: GRID_SIZE * GRID_ROWS)
```

また、後から「グリッドのサイズを変えたい」となったとき、定数が1か所にまとまっていれば **1行変えるだけ**で全体に反映されます。

### settings.rb を作る

`settings.rb` を作り、ゲームの設定値をすべてここに書きます。

```ruby
GRID_SIZE     = 15   # 1マスのピクセルサイズ
GRID_COLS     = 10   # ボードの横マス数
GRID_ROWS     = 20   # ボードの縦マス数
PANEL_COLS    = 7    # 右パネルの横マス数

SCREEN_WIDTH  = GRID_SIZE * (1 + GRID_COLS + 1 + PANEL_COLS)
SCREEN_HEIGHT = GRID_SIZE * (GRID_ROWS + 1)

FALL_INTERVAL      = 60   # 通常落下の間隔（フレーム）
SOFT_DROP_INTERVAL = 6    # ソフトドロップの間隔（フレーム）
LINES_PER_LEVEL    = 10   # 1レベルアップに必要なライン数

FLASH_DURATION = 60   # ライン消去の点滅演出の長さ（フレーム）
FLASH_INTERVAL = 6    # 点滅の切り替え間隔（フレーム）
LOCK_DELAY     = 30   # 着地後に固定するまでの猶予（フレーム）

DAS = 10   # Delayed Auto Shift — 長押し開始までの遅延（フレーム）
ARR = 2    # Auto Repeat Rate  — 長押し中の繰り返し間隔（フレーム）

BOARD_OFFSET_X = GRID_SIZE
BOARD_OFFSET_Y = 0
PANEL_OFFSET_X = GRID_SIZE * (1 + GRID_COLS + 1)
```

### 画面サイズの計算

`SCREEN_WIDTH` の計算を見てみましょう。

```
SCREEN_WIDTH = GRID_SIZE * (1 + GRID_COLS + 1 + PANEL_COLS)
             = 15 * (1 + 10 + 1 + 7)
             = 15 * 19
             = 285 ピクセル
```

| 要素 | マス数 |
|---|---|
| 左の壁 | 1 |
| ボード | 10（GRID_COLS） |
| 右の壁（パネルとの境） | 1 |
| 右パネル | 7（PANEL_COLS） |

こうして画面幅をマス単位で考えると、後からレイアウトを変えやすくなります。

### DAS と ARR

`DAS` と `ARR` はテトリス系ゲームの操作に関わる定数です。

- **DAS（Delayed Auto Shift）**: 方向キーを押し続けたとき、何フレーム後に「連続移動」が始まるか
- **ARR（Auto Repeat Rate）**: 連続移動中、何フレームごとに1マス動くか

DAS を大きくすると「押してすぐ飛ばない」、ARR を小さくすると「飛ぶのが速い」というイメージです。  
この値を調整するだけで操作感が大きく変わります。

### LOCK_DELAY（ロックディレイ）

ブロックが着地したあと、すぐに固定するのではなく **30フレームの猶予**を設けます。  
この間に左右に動かしたり回転させたりできるので、ゲームのテクニック的な奥深さが生まれます。

次のページでは、1マスのブロックを表す `Block` クラスを作ります。
