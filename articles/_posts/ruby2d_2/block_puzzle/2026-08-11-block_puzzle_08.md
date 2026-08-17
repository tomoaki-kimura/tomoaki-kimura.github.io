---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 8
section_title: Stage クラス — 画面レイアウト
description: 壁・盤面・NEXTエリア・スコア表示など、画面の固定パーツをまとめるクラスを作ります。
---

## {{ page.section_title }}

### Stage の役割

`Stage` は**画面の固定された背景部分**を管理するクラスです。

- 壁（グレーの背景）
- 盤面（黒い矩形）
- ゲート（上端の出入口）
- NEXT 表示エリア
- SCORE / HIGH / LEVEL のテキスト

これらは一度生成したら動かないので、`initialize` で全部描いてしまいます。  
スコアとレベルだけ数値が変わるので、`update_score` で更新します。

### コード全体

```ruby
class Stage
  WALL_COLOR  = [0.25, 0.25, 0.28, 1]
  BOARD_COLOR = [0.08, 0.08, 0.12, 1]
  TEXT_COLOR  = "white"
  TEXT_SIZE   = GRID_SIZE - 4
  GATE_WIDTH  = 1

  attr_reader :score_text, :high_score_text, :level_text

  def initialize
    draw_wall
    draw_board
    draw_gate
    draw_next_area
    draw_next_label
    draw_score_labels
  end

  def update_score(score, high_score, level)
    reflow_text(@score_text,      score.to_s)
    reflow_text(@high_score_text, high_score.to_s)
    reflow_text(@level_text,      level.to_s)
  end

  private

  def draw_wall
    Rectangle.new(x: 0, y: 0, width: SCREEN_WIDTH, height: SCREEN_HEIGHT,
                  color: WALL_COLOR)
  end

  def draw_board
    Rectangle.new(
      x: BOARD_OFFSET_X - Block::MARGIN, y: BOARD_OFFSET_Y - Block::MARGIN,
      width:  GRID_SIZE * GRID_COLS + Block::MARGIN,
      height: GRID_SIZE * GRID_ROWS + Block::MARGIN,
      color: BOARD_COLOR
    )
  end

  def draw_gate
    gate_height = GRID_SIZE * GATE_WIDTH
    # 左ゲート
    Rectangle.new(x: BOARD_OFFSET_X - Block::MARGIN, y: 0,
                  width: GRID_SIZE * GATE_WIDTH, height: gate_height - Block::MARGIN,
                  color: WALL_COLOR)
    # 右ゲート
    Rectangle.new(x: BOARD_OFFSET_X + GRID_SIZE * (GRID_COLS - GATE_WIDTH), y: 0,
                  width: GRID_SIZE * GATE_WIDTH, height: gate_height - Block::MARGIN,
                  color: WALL_COLOR)
  end

  def draw_next_area
    Rectangle.new(x: PANEL_OFFSET_X, y: GRID_SIZE,
                  width: GRID_SIZE * 6, height: GRID_SIZE * 6,
                  color: BOARD_COLOR)
  end

  def draw_next_label
    draw_centered_text("NEXT", GRID_SIZE * 6)
  end

  def draw_score_labels
    draw_centered_text("SCORE", GRID_SIZE * 9)
    @score_text = draw_centered_text("0", GRID_SIZE * 10)
    draw_centered_text("HIGH", GRID_SIZE * 12)
    @high_score_text = draw_centered_text("0", GRID_SIZE * 13)
    draw_centered_text("LEVEL", GRID_SIZE * 15)
    @level_text = draw_centered_text("1", GRID_SIZE * 16)
  end

  def draw_centered_text(str, y)
    t = Text.new(str, size: TEXT_SIZE, color: TEXT_COLOR)
    t.x = PANEL_OFFSET_X + (GRID_SIZE * PANEL_COLS - t.width) / 2
    t.y = y
    t
  end

  def reflow_text(text_obj, new_str)
    text_obj.content = new_str
    text_obj.x = PANEL_OFFSET_X + (GRID_SIZE * PANEL_COLS - text_obj.width) / 2
  end
end
```

### レイアウトの構造

```
┌──────────────────────────────────────┐
│   GATE  │                  │  NEXT   │
│         │                  │ ██████  │
│         │                  │  ████  │
│  BOARD  │                  │ NEXT   │
│         │                  │        │
│         │                  │ SCORE  │
│         │                  │   0    │
│         │                  │ HIGH   │
│         │                  │   0    │
│         │                  │ LEVEL  │
│         │                  │   1    │
└─────────┴──────────────────┴────────┘
```

### テキストの中央寄せ

```ruby
def draw_centered_text(str, y)
  t = Text.new(str, size: TEXT_SIZE, color: TEXT_COLOR)
  t.x = PANEL_OFFSET_X + (GRID_SIZE * PANEL_COLS - t.width) / 2
  t.y = y
  t
end
```

パネル幅の中央に文字を配置するために、`t.width`（文字の幅）を使って x 座標を計算します。

### スコア更新と reflow_text

スコアが変わると文字幅も変わるため、x 座標を計算し直す必要があります。

```ruby
def reflow_text(text_obj, new_str)
  text_obj.content = new_str   # Ruby2D 1.0.0 では .content= で内容を更新
  text_obj.x = PANEL_OFFSET_X + (GRID_SIZE * PANEL_COLS - text_obj.width) / 2
end
```

> **Ruby2D 1.0.0 の注意点:** テキストの内容を変更するには `.content=` を使います。  
> 古いバージョンで使われていた `.text=` はこのバージョンでは存在しません。

`main.rb` のゲームループから毎フレーム `stage.update_score(...)` を呼ぶことで、  
スコアが変わるたびに自動で表示が更新されます。

次のページでは、ゲームの状態管理と落下ロジックを持つ `Game` クラス（前半）を作ります。
