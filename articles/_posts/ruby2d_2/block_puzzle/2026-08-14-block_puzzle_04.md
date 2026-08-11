---
layout: post
part: Ruby2D(2)
title: ブロックパズル
categories: [ruby2d_2, block_puzzle]
chapter: 1
section: 4
section_title: Block クラス — Square を継承する
description: Ruby2D の Square を継承して、1マス分のブロッククラスを作ります。
---

## {{ page.section_title }}

### Block クラスの役割

`Block` はゲーム盤面の **1マス分のブロック**を表すクラスです。  
Ruby2D の `Square` クラスを継承することで、描画機能をそのまま使えます。

```
Square（Ruby2D）
  └── Block  ← ここを作る
```

`Block` に追加するのは次の3つです。

1. マス間に隙間を作る（`MARGIN`）
2. 固定されたとき少し暗くする（`dim!`）
3. ライン消去の点滅に対応する（`flash_on` / `flash_off`）

### コード全体

```ruby
class Block < Square
  MARGIN = 1

  def initialize(color, x, y)
    @base_color = color
    super(color: color, x: x, y: y, size: GRID_SIZE - MARGIN)
  end

  def self.size
    GRID_SIZE
  end

  def dim!
    c = self.color
    self.color = [c.r * 0.85, c.g * 0.85, c.b * 0.85, c.a]
  end

  def flash_on
    self.color = [1, 1, 1, 1]
  end

  def flash_off
    self.color = @base_color
  end
end
```

### MARGIN と super への渡し方

`MARGIN = 1` はブロック同士の隙間（ピクセル）です。

```ruby
super(color: color, x: x, y: y, size: GRID_SIZE - MARGIN)
```

`Square` の `initialize` に `size: GRID_SIZE - MARGIN`（= 14）を渡すことで、  
**描画サイズを1ピクセル小さく**して隙間を作っています。

> **ポイント:** Ruby2D 1.0.0 では `Square` が `width=` と `height=` を `private` にしています。  
> `self.size -= MARGIN` のように後から変更しようとするとエラーになるため、  
> `super` に渡す段階でサイズを決めておくのが正しいやり方です。

### グリッド単位のサイズ

`def self.size` はクラスメソッドです。  
グリッド計算では「1マス = GRID_SIZE px」として扱いたいので、  
描画サイズ（14px）ではなくグリッドサイズ（15px）を返します。

```ruby
def self.size
  GRID_SIZE   # 15
end
```

インスタンスの描画サイズ（14px）とグリッド単位（15px）を分けて管理することで、  
配置計算がシンプルになります。

### dim! — ブロックを暗くする

テトロミノが盤面に固定されたとき、アクティブなブロックと区別するために少し暗くします。

```ruby
def dim!
  c = self.color
  self.color = [c.r * 0.85, c.g * 0.85, c.b * 0.85, c.a]
end
```

RGB 各成分を 0.85 倍するだけです。視覚的にはわずかに暗くなる程度で、  
色の違いは分かりつつ「固定済み」と「落下中」が区別できます。

### flash_on / flash_off — 点滅演出

ラインが揃ったときの点滅演出に使います。

```ruby
def flash_on
  self.color = [1, 1, 1, 1]   # 白く光る
end

def flash_off
  self.color = @base_color    # 元の色に戻す
end
```

`@base_color` は `initialize` で保存しておいた元の色です。  
`flash_off` で確実に元の色に戻せます。

次のページでは、盤面全体のブロックを管理する `BlockMap` クラスを作ります。
