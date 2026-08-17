---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 5
section_title: BlockMap クラス — グリッドの状態管理
description: 盤面に積み上がったブロックの状態を管理するクラスを作ります。
---

## {{ page.section_title }}

### BlockMap の役割

`BlockMap` は**盤面に固定されたブロック全体**を管理するクラスです。

- 新しいテトロミノが**ぶつかるかどうか**を判定する
- テトロミノが着地したとき盤面に**固定する**
- 横一列が埋まったら**消去する**
- 消去の**点滅演出**を制御する

### 内部データ構造

```ruby
@grid = Array.new(GRID_ROWS) { Array.new(GRID_COLS) }
```

`@grid` は 20×10 の2次元配列です。  
空のマスは `nil`、ブロックが置かれているマスには `Block` オブジェクトが入ります。

```
@grid[行][列]
@grid[0][0]  # 左上
@grid[19][9] # 右下
```

### コード全体

```ruby
class BlockMap
  def initialize
    @grid = Array.new(GRID_ROWS) { Array.new(GRID_COLS) }
  end

  def collide?(tetromino_map, offset_col, offset_row)
    tetromino_map.each.with_index do |row, row_index|
      row.each.with_index do |block, col_index|
        next unless block

        col = offset_col + col_index
        r   = offset_row + row_index

        return true if col < 0 || col >= GRID_COLS
        return true if r >= GRID_ROWS
        return true if r >= 0 && @grid[r][col]
      end
    end
    false
  end

  def settle(tetromino_map, offset_col, offset_row)
    tetromino_map.each.with_index do |row, row_index|
      row.each.with_index do |block, col_index|
        next unless block
        r = offset_row + row_index
        if r >= 0
          block.dim!
          @grid[r][offset_col + col_index] = block
        end
      end
    end
    complete_rows
  end

  def flash(row_indices, bright)
    row_indices.each do |i|
      @grid[i].compact.each { |b| bright ? b.flash_on : b.flash_off }
    end
  end

  def clear_rows(row_indices)
    row_indices.each { |i| @grid[i].compact.each(&:remove) }
    @grid.reject!.with_index { |_, i| row_indices.include?(i) }
    row_indices.size.times { @grid.unshift(Array.new(GRID_COLS)) }
    redraw_all
    row_indices.size
  end

  def reset
    @grid.each { |row| row.compact.each(&:remove) }
    @grid = Array.new(GRID_ROWS) { Array.new(GRID_COLS) }
  end

  private

  def complete_rows
    @grid.each.with_index
         .select { |row, _| row.none?(&:nil?) }
         .map { |_, i| i }
  end

  def redraw_all
    @grid.each.with_index do |row, row_index|
      row.each do |block|
        next unless block
        block.y = BOARD_OFFSET_Y + GRID_SIZE * row_index
      end
    end
  end
end
```

### collide? — 衝突判定

テトロミノを動かす前に「移動先でぶつかるか」を確認します。

```ruby
def collide?(tetromino_map, offset_col, offset_row)
```

- `tetromino_map` — テトロミノの形を表す2次元配列（`nil` か `Block`）
- `offset_col` / `offset_row` — テトロミノの左上隅のグリッド座標

判定は3パターンです。

| 条件 | 意味 |
|---|---|
| `col < 0 \|\| col >= GRID_COLS` | 左右の壁に当たる |
| `r >= GRID_ROWS` | 底に当たる |
| `r >= 0 && @grid[r][col]` | 既存ブロックに当たる |

`r >= 0` の条件は、盤面の上（画面外）にある部分を無視するためです。  
テトロミノは出現時に上端からはみ出して生成されます。

### settle — 盤面への固定

```ruby
def settle(tetromino_map, offset_col, offset_row)
```

テトロミノの各ブロックを `@grid` に書き込みます。  
書き込む前に `block.dim!` で少し暗くして「固定済み」を視覚的に示します。  
固定後、完成した行のインデックスを返します。

### clear_rows — ライン消去

```ruby
def clear_rows(row_indices)
  row_indices.each { |i| @grid[i].compact.each(&:remove) }  # 画面から消す
  @grid.reject!.with_index { |_, i| row_indices.include?(i) }  # 配列から削除
  row_indices.size.times { @grid.unshift(Array.new(GRID_COLS)) }  # 上に空行追加
  redraw_all
end
```

1. 消去する行のブロックを `.remove` で画面から消す
2. `@grid` から該当行を削除
3. 削除した分だけ上に空行を追加（ブロックが「落ちてきた」ように見える）
4. `redraw_all` で残ったブロックの Y 座標を再計算

次のページでは、テトロミノの共通ロジックを持つ `TetrominoBase` クラスを作ります。
