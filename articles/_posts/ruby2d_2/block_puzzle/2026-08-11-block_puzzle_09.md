---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 9
section_title: Game クラス（前半）— 状態機械と落下ロジック
description: ゲームの状態遷移・テトロミノの落下・衝突・固定の仕組みを作ります。
---

## {{ page.section_title }}

### ゲームの「状態」を管理する

このゲームは、常にいくつかの「状態」のどれかにいます。

| 状態 | 意味 |
|---|---|
| `:waiting` | スタート待ち（タイトル画面） |
| `:playing` | テトロミノが落下中 |
| `:landing` | テトロミノが着地・固定待ち（ロックディレイ） |
| `:flashing` | ライン消去の点滅演出中 |
| `:game_over` | ゲームオーバー |

状態によって `update` の処理を切り替えることで、複雑なゲームロジックが整理されます。  
この設計パターンを**ステートマシン（状態機械）**と呼びます。

### 初期化と主要な変数

```ruby
class Game
  TETROMINO_CLASSES = [
    TetrominoI, TetrominoJ, TetrominoL,
    TetrominoO, TetrominoS, TetrominoT, TetrominoZ
  ].freeze

  attr_reader :current, :next_tetromino, :score, :high_score, :level

  def initialize
    @bag           = []
    @score         = 0
    @high_score    = 0
    @level         = 1
    @lines_cleared = 0
    @frame_count   = 0
    @lock_timer    = 0
    @soft_drop     = false
    @held_dir      = nil
    @das_timer     = 0
    @arr_timer     = 0
    @state         = :playing
    @flash_rows    = []
    @flash_timer   = 0
    @flash_bright  = false
    @block_map     = BlockMap.new
    @game_over_texts = []
    @start_texts   = []
    @next_tetromino = pick
    enter_waiting
  end
```

### update — 状態によって処理を切り替える

```ruby
def update
  case @state
  when :playing  then update_playing
  when :landing  then update_landing
  when :flashing then update_flashing
  when :waiting, :game_over then nil
  end
end
```

`:waiting` と `:game_over` のときはゲームを止めて何もしません。

### 落下ロジック

```ruby
def update_playing
  update_das
  @frame_count += 1
  interval = @soft_drop ? SOFT_DROP_INTERVAL : fall_interval
  if @frame_count >= interval
    @frame_count = 0
    fall
  end
end

def fall
  @current.move_down
  if @block_map.collide?(@current.tetromino_map, @current.grid_col, @current.grid_row)
    @current.move_up           # 衝突したので1つ戻す
    @state      = :landing     # 着地状態へ
    @lock_timer = 0
  end
end

def fall_interval
  [FALL_INTERVAL - (@level - 1) * 5, SOFT_DROP_INTERVAL].max
end
```

毎フレーム `@frame_count` を増やし、`fall_interval` に達したら1マス落下します。  
レベルが上がるほど `fall_interval` が短くなり、速くなります。

### :landing 状態 — ロックディレイ

```ruby
def update_landing
  update_das
  @lock_timer += 1
  settle_current if @lock_timer >= LOCK_DELAY
end
```

着地したあと `LOCK_DELAY`（30フレーム）待ってから固定します。  
この間は左右移動・回転が可能です。

```ruby
def check_grounded
  @current.move_down
  if @block_map.collide?(@current.tetromino_map, @current.grid_col, @current.grid_row)
    @current.move_up
    @lock_timer = 0   # 着地のまま → タイマーリセット
  else
    @current.move_up
    @state = :playing  # 浮いていた → 落下中に戻す
  end
end
```

`check_grounded` は移動・回転後に呼ばれます。  
移動して「浮いた」場合は `:playing` に戻し、まだ着地している場合はタイマーをリセットします。

### settle_current — ブロックの固定

```ruby
def settle_current
  rows = @block_map.settle(@current.tetromino_map,
                            @current.grid_col, @current.grid_row)
  if rows.any?
    @flash_rows  = rows
    @flash_timer = 0
    @state       = :flashing
  else
    advance
  end
end
```

`block_map.settle` が完成したラインの行インデックスを返します。  
ラインが揃っていれば `:flashing` 状態へ、揃っていなければ次のテトロミノを出します。

### advance — 次のテトロミノを出す

```ruby
def advance
  @current        = @next_tetromino
  @next_tetromino = pick
  @current.to_start_position
  @state       = :playing
  @frame_count = 0

  if @block_map.collide?(@current.tetromino_map,
                          @current.grid_col, @current.grid_row)
    enter_game_over
  end
end
```

新しいテトロミノを盤面に出した瞬間にぶつかっていたら、ゲームオーバーです。

次のページでは、操作・演出・スコアのロジック（後半）を作ります。
