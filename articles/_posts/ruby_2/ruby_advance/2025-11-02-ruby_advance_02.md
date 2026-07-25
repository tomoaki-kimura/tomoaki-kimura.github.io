---
layout: post
part: Ruby(2)
title: Ruby応用
categories: [ruby_2, ruby_advance]
chapter: 1
section: 2
section_title: クラスメソッド
description: def self.〜で定義するクラスメソッドと、インスタンスメソッドとの違いを学びます。
---

## {{ page.section_title }}

### インスタンスメソッドとクラスメソッド

前回の `attack` のように、インスタンス（`taro`）に対して呼び出すメソッドをインスタンスメソッドといいます。それに対して、インスタンスを作らずクラス自身に対して呼び出せるメソッドをクラスメソッドといいます。

クラスメソッドは `def self.メソッド名` で定義します。

```ruby
irb(main):001> class Character
irb(main):002>   def self.max_level
irb(main):003>     99
irb(main):004>   end
irb(main):005> end
=> :max_level
irb(main):006> Character.max_level
=> 99
```

`Character.new` を1回もしていないのに、`Character.max_level` が呼び出せています。「そのキャラクター全体に関するルール」のような、インスタンスごとに変わらない処理はクラスメソッドとして書くと自然です。

### クラスメソッドの中で複数のインスタンスを作る

クラスメソッドは、まとめて複数のインスタンスを作るときにも使われます。

```ruby
irb(main):001> class Character
irb(main):002>   attr_accessor :name
irb(main):003>
irb(main):004>   def initialize(name)
irb(main):005>     @name = name
irb(main):006>   end
irb(main):007>
irb(main):008>   def self.create_party(names)
irb(main):009>     names.map { |name| self.new(name) }
irb(main):010>   end
irb(main):011> end
=> :create_party
irb(main):012> party = Character.create_party(["たろう", "じろう", "さぶろう"])
=> [#<Character ...>, #<Character ...>, #<Character ...>]
irb(main):013> party.map { |c| c.name }
=> ["たろう", "じろう", "さぶろう"]
```

クラスメソッドの中で `self` はそのクラス自身（`Character`）を指すので、`self.new(name)` は `Character.new(name)` と同じ意味になります。

実際のブロック崩しでも、`Block` クラスにこのパターンが使われていました。

```ruby
class Block < Rectangle
  BLOCK_COLORS = %w(red orange yellow green blue)

  def self.set_blocks
    BLOCK_COLORS.map.with_index(0) do |color, r|
      9.times.map do |c|
        block = self.new
        block.color = color
        block
      end
    end
  end
end
```

`Block.set_blocks` と呼び出すだけで、色違いのブロックを9列ぶんまとめて作っています。

#### *ここで試したいこと

- `Character.create_party` に渡す名前の数を変えて、できあがる配列の中身を確認してみよう。
