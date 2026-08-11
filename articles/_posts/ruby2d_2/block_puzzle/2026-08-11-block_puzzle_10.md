---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 10
section_title: Game クラス（後半）— 操作・演出・スコア
description: キー入力・DAS/ARR・点滅演出・スコア計算・ゲーム開始/終了のロジックを実装します。
---

## {{ page.section_title }}

### キー入力の処理

```ruby
def on_key_down(key)
  if @state == :waiting
    start_game if key == "space"
    return
  end
  if @state == :game_over
    restart if key == "r"
    return
  end

  return unless @state == :playing || @state == :landing

  case key
  when "a"
    @held_dir = :left; @das_timer = 0; @arr_timer = 0
    move_horizontal(:left)
  when "d"
    @held_dir = :right; @das_timer = 0; @arr_timer = 0
    move_horizontal(:right)
  when "s"
    @soft_drop = true if @state == :playing
  when "j"
    @current.left_rotate
    if @block_map.collide?(@current.tetromino_map,
                            @current.grid_col, @current.grid_row)
      @current.right_rotate   # 回転できない → 元に戻す
    else
      check_grounded
    end
  when "k"
    @current.right_rotate
    if @block_map.collide?(@current.tetromino_map,
                            @current.grid_col, @current.grid_row)
      @current.left_rotate
    else
      check_grounded
    end
  end
end

def on_key_up(key)
  @soft_drop = false if key == "s"
  @held_dir  = nil   if key == "a" || key == "d"
end
```

### DAS と ARR の実装

キーを押し続けたときの**長押し移動**を実装します。

```ruby
def update_das
  return unless @held_dir

  @das_timer += 1
  return if @das_timer < DAS   # DAS に達するまでは動かない

  @arr_timer += 1
  if @arr_timer >= ARR
    @arr_timer = 0
    move_horizontal(@held_dir)
  end
end
```

1. `@das_timer` が `DAS`（10フレーム）に達したら連続移動開始
2. それ以降は `ARR`（2フレーム）ごとに1マス移動

キーを押した瞬間は `on_key_down` で即座に1マス動き、長押し時はこちらで動きます。

### 点滅演出

```ruby
def update_flashing
  @flash_timer += 1
  if @flash_timer % FLASH_INTERVAL == 0
    @flash_bright = !@flash_bright
    @block_map.flash(@flash_rows, @flash_bright)
  end
  if @flash_timer >= flash_duration
    @block_map.flash(@flash_rows, false)   # 演出終了 → 元の色に戻す
    count = @block_map.clear_rows(@flash_rows)
    add_score(count)
    advance
  end
end

def flash_duration
  [FLASH_DURATION / @level, FLASH_INTERVAL * 2].max
end
```

`FLASH_INTERVAL` ごとに `flash_bright` を反転させて点滅させます。  
レベルが上がるほど点滅時間が短くなり、テンポが速くなります。

### スコア計算

```ruby
def add_score(line_count)
  points = [0, 100, 300, 500, 800][line_count] * @level
  @score += points
  @high_score = @score if @score > @high_score
  @lines_cleared += line_count
  @level = @lines_cleared / LINES_PER_LEVEL + 1
end
```

| 消えたライン数 | 基本点 |
|---|---|
| 1 | 100 |
| 2 | 300 |
| 3 | 500 |
| 4 | 800 |

基本点 × レベルが加算されるので、レベルが上がるほど高得点が狙えます。

### ゲーム開始・終了・リスタート

```ruby
def enter_waiting
  @state = :waiting
  title = Text.new("BLOCK GAME", size: GRID_SIZE, color: "white")
  title.x = BOARD_OFFSET_X + (GRID_SIZE * GRID_COLS - title.width) / 2
  title.y = GRID_SIZE * GRID_ROWS / 2 - GRID_SIZE * 2
  hint = Text.new("SPACE to start", size: GRID_SIZE - 4, color: "white")
  hint.x = BOARD_OFFSET_X + (GRID_SIZE * GRID_COLS - hint.width) / 2
  hint.y = GRID_SIZE * GRID_ROWS / 2
  @start_texts = [title, hint]
end

def start_game
  @start_texts.each(&:remove)
  @start_texts = []
  advance
end

def enter_game_over
  @state = :game_over
  label = Text.new("GAME OVER", size: GRID_SIZE, color: "white")
  label.x = BOARD_OFFSET_X + (GRID_SIZE * GRID_COLS - label.width) / 2
  label.y = GRID_SIZE * GRID_ROWS / 2 - GRID_SIZE
  hint = Text.new("r: restart", size: GRID_SIZE - 4, color: "white")
  hint.x = BOARD_OFFSET_X + (GRID_SIZE * GRID_COLS - hint.width) / 2
  hint.y = GRID_SIZE * GRID_ROWS / 2 + GRID_SIZE
  @game_over_texts = [label, hint]
end

def restart
  @game_over_texts&.each(&:remove)
  @game_over_texts = []
  @current.tetromino_map.flatten.compact.each(&:remove)
  @next_tetromino.tetromino_map.flatten.compact.each(&:remove)
  @block_map.reset

  @bag = []; @score = 0; @level = 1
  @lines_cleared = 0; @frame_count = 0
  @lock_timer = 0; @soft_drop = false; @flash_rows = []
  @next_tetromino = pick
  advance
end
```

テキストオブジェクトは配列でまとめて管理しておくと、  
`each(&:remove)` で一括削除できて便利です。

次のページでは、`main.rb` を作って全体を繋ぎ、ゲームを完成させます。
