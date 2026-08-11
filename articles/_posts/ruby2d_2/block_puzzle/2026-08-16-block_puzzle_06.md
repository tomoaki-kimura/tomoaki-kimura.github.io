---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 6
section_title: TetrominoBase クラス — テトロミノの共通ロジック
description: 7種類のテトロミノが共通で使う移動・回転・配置ロジックを基底クラスにまとめます。
---

## {{ page.section_title }}

### 基底クラスとは

7種類のテトロミノ（I・J・L・O・S・T・Z）は、形と色が違うだけで  
**移動・回転・衝突判定への渡し方**はまったく同じです。

この共通ロジックを `TetrominoBase` という**基底クラス**にまとめ、  
各テトロミノはそこを継承して「自分の形（マップ）」だけを定義します。

```
TetrominoBase
  ├── TetrominoI
  ├── TetrominoJ
  ...
```

### コード全体

```ruby
class TetrominoBase < Block
  attr_accessor :tetromino_map

  def initialize(color)
    @origin_x  = 0
    @origin_y  = 0
    @grid_col  = 0
    @grid_row  = 0
    self.tetromino_map = mapping.map.with_index do |row, row_index|
      row.map.with_index do |col, col_index|
        if col == 1
          Block.new(
            color,
            @origin_x + Block.size * col_index,
            @origin_y + Block.size * row_index
          )
        end
      end
    end
    to_next_box
  end

  def left_rotate
    self.tetromino_map = rotate(tetromino_map.map(&:reverse).transpose)
  end

  def right_rotate
    self.tetromino_map = rotate(tetromino_map.transpose.map(&:reverse))
  end

  def move_left;  @grid_col -= 1; move_to(@origin_x - GRID_SIZE, @origin_y); end
  def move_right; @grid_col += 1; move_to(@origin_x + GRID_SIZE, @origin_y); end
  def move_down;  @grid_row += 1; move_to(@origin_x, @origin_y + GRID_SIZE); end
  def move_up;    @grid_row -= 1; move_to(@origin_x, @origin_y - GRID_SIZE); end

  def to_next_box
    cols  = tetromino_map[0].size
    rows  = tetromino_map.size
    new_x = PANEL_OFFSET_X + (GRID_SIZE * 6 - GRID_SIZE * cols) / 2
    new_y = GRID_SIZE      + (GRID_SIZE * 5 - GRID_SIZE * rows) / 2
    move_to(new_x, new_y)
  end

  def to_start_position
    @grid_col = (GRID_COLS - tetromino_map[0].size) / 2
    @grid_row = 0
    move_to(BOARD_OFFSET_X + GRID_SIZE * @grid_col,
            BOARD_OFFSET_Y + GRID_SIZE * @grid_row)
  end

  def grid_col = @grid_col
  def grid_row = @grid_row

  private

  def move_to(new_x, new_y)
    dx = new_x - @origin_x
    dy = new_y - @origin_y
    @origin_x = new_x
    @origin_y = new_y
    tetromino_map.each do |row|
      row.each do |block|
        next unless block
        block.x += dx
        block.y += dy
      end
    end
  end

  def rotate(rotated_map)
    rotated_map.map.with_index do |row, row_index|
      row.map.with_index do |block, col_index|
        if block
          block.x = @origin_x + Block.size * col_index
          block.y = @origin_y + Block.size * row_index
        end
        block
      end
    end
  end

  def mapping
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  end
end
```

### tetromino_map — テトロミノの形

`tetromino_map` は `mapping` から生成される2次元配列で、  
`nil` か `Block` オブジェクトが入っています。

```
mapping（形の定義）:        tetromino_map（実際のオブジェクト）:
[0, 0, 0, 0]               [nil, nil,   nil,   nil  ]
[1, 1, 1, 1]    →          [Block, Block, Block, Block]
[0, 0, 0, 0]               [nil, nil,   nil,   nil  ]
[0, 0, 0, 0]               [nil, nil,   nil,   nil  ]
```

`1` のマスには `Block.new` でブロックを生成、`0` のマスは `nil` のままです。

### @origin_x / @origin_y — アンカー座標

テトロミノ全体の「左上の基点」を `@origin_x`, `@origin_y` で管理します。

移動するときは `@origin_x` を更新し、各ブロックを差分（dx, dy）だけずらします。

```ruby
def move_to(new_x, new_y)
  dx = new_x - @origin_x
  dy = new_y - @origin_y
  @origin_x = new_x
  @origin_y = new_y
  tetromino_map.each { |row| row.each { |b| b&.x += dx; b&.y += dy } }
end
```

### 回転の仕組み

行列の転置と反転を組み合わせて回転を実現します。

```ruby
def left_rotate
  self.tetromino_map = rotate(tetromino_map.map(&:reverse).transpose)
end

def right_rotate
  self.tetromino_map = rotate(tetromino_map.transpose.map(&:reverse))
end
```

| 操作 | 処理 |
|---|---|
| 左回転 | 各行を逆順にしてから転置 |
| 右回転 | 転置してから各行を逆順に |

`rotate` メソッドは新しい配列の位置から各ブロックのピクセル座標を計算し直します。  
`@origin_x/@origin_y` を基点にするので、回転してもテトロミノが画面外に飛んでいきません。

### to_next_box と to_start_position

```ruby
def to_next_box      # NEXT 表示エリアに中央寄せで配置
def to_start_position  # 盤面の上部中央に出現
```

テトロミノは生成直後に `to_next_box` で NEXT エリアに表示され、  
前のテトロミノが固定されたタイミングで `to_start_position` に移動します。

次のページでは、7種類のテトロミノクラスを作ります。
