---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 7
section_title: 7種類のテトロミノクラス
description: TetrominoBase を継承して、7種類のテトロミノをそれぞれ定義します。
---

## {{ page.section_title }}

### 継承の力を活かす

`TetrominoBase` を継承した各テトロミノクラスは、**色と形（mapping）を定義するだけ**です。  
移動・回転などのロジックはすべて基底クラスが持っているので、コードが非常に短くなります。

### 7種類のテトロミノ

```ruby
class TetrominoI < TetrominoBase
  def initialize = super("aqua")
  private
  def mapping
    [[0, 0, 0, 0],
     [1, 1, 1, 1],
     [0, 0, 0, 0],
     [0, 0, 0, 0]]
  end
end

class TetrominoJ < TetrominoBase
  def initialize = super("blue")
  private
  def mapping
    [[0, 0, 0],
     [1, 1, 1],
     [0, 0, 1]]
  end
end

class TetrominoL < TetrominoBase
  def initialize = super("orange")
  private
  def mapping
    [[0, 0, 0],
     [1, 1, 1],
     [1, 0, 0]]
  end
end

class TetrominoO < TetrominoBase
  def initialize = super("yellow")
  private
  def mapping
    [[1, 1],
     [1, 1]]
  end
end

class TetrominoS < TetrominoBase
  def initialize = super("lime")
  private
  def mapping
    [[0, 1, 1],
     [1, 1, 0],
     [0, 0, 0]]
  end
end

class TetrominoT < TetrominoBase
  def initialize = super("purple")
  private
  def mapping
    [[0, 0, 0],
     [1, 1, 1],
     [0, 1, 0]]
  end
end

class TetrominoZ < TetrominoBase
  def initialize = super("red")
  private
  def mapping
    [[0, 0, 0],
     [1, 1, 0],
     [0, 1, 1]]
  end
end
```

### mapping の読み方

`mapping` は `1` が「ブロックあり」、`0` が「空マス」の2次元配列です。

```ruby
# TetrominoT の mapping（T字型）
[[0, 0, 0],
 [1, 1, 1],   ← 横一列
 [0, 1, 0]]   ← 中央1マス
```

視覚的にそのままの形を配列で書けるので、形の確認がしやすいです。

### 一覧

| クラス | 色 | 形のイメージ |
|---|---|---|
| `TetrominoI` | aqua（水色） | `████` |
| `TetrominoJ` | blue（青） | `███`<br>`__█` |
| `TetrominoL` | orange（橙） | `███`<br>`█__` |
| `TetrominoO` | yellow（黄） | `██`<br>`██` |
| `TetrominoS` | lime（黄緑） | `_██`<br>`██_` |
| `TetrominoT` | purple（紫） | `███`<br>`_█_` |
| `TetrominoZ` | red（赤） | `██_`<br>`_██` |

### 7-bag ランダマイザー

ゲームではテトロミノを完全ランダムに出すのではなく、  
**7種類を1セットとしてシャッフルして順番に出す**方式（7-bag）を採用します。

```ruby
TETROMINO_CLASSES = [
  TetrominoI, TetrominoJ, TetrominoL,
  TetrominoO, TetrominoS, TetrominoT, TetrominoZ
].freeze

def pick
  @bag = TETROMINO_CLASSES.shuffle if @bag.empty?
  @bag.pop.new
end
```

7種類を一通り出し切ったら次の袋をシャッフルします。  
これにより「同じ形ばかり続く」という極端な偏りが起きません。

このコードは `Game` クラスに書きますが、テトロミノの定義はここで完成です。

次のページでは、画面レイアウトを担当する `Stage` クラスを作ります。
