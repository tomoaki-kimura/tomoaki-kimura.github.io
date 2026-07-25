---
layout: post
part: Ruby(2)
title: Ruby応用
categories: [ruby_2, ruby_advance]
chapter: 1
section: 3
section_title: 継承
description: class A < Bで既存のクラスの機能を引き継ぐ継承と、superの使い方を学びます。
---

## {{ page.section_title }}

### すでに継承を使っていた

`class Fighter < Sprite` や `class Block < Rectangle` のように、ここまでのRuby2Dのゲームでは、実はずっと継承を使っていました。`Sprite` や `Rectangle` はRuby2Dが用意したクラスで、それを引き継いだ自分だけのクラスを作っていたのです。

### class A < B で継承する

`<` を使うと、あるクラス（親クラス）の機能を引き継いだ新しいクラス（子クラス）を作れます。

```ruby
irb(main):001> class Animal
irb(main):002>   attr_accessor :name
irb(main):003>
irb(main):004>   def initialize(name)
irb(main):005>     @name = name
irb(main):006>   end
irb(main):007>
irb(main):008>   def greet
irb(main):009>     puts "#{@name}です"
irb(main):010>   end
irb(main):011> end
=> :greet
irb(main):012> class Dog < Animal
irb(main):013> end
=> nil
irb(main):014> pochi = Dog.new("ポチ")
=> #<Dog ...>
irb(main):015> pochi.greet
ポチです
=> nil
```

`Dog` には `initialize` も `greet` も書いていませんが、親クラスの `Animal` から引き継いでいるので、そのまま使えます。

### メソッドを上書きする

子クラスで同じ名前のメソッドを定義すると、親クラスのメソッドを上書き（オーバーライド）できます。

```ruby
irb(main):001> class Dog < Animal
irb(main):002>   def greet
irb(main):003>     puts "ワン！ #{@name}です"
irb(main):004>   end
irb(main):005> end
=> :greet
irb(main):006> pochi = Dog.new("ポチ")
=> #<Dog ...>
irb(main):007> pochi.greet
ワン！ポチです
=> nil
```

### super で親クラスの処理を呼び出す

親クラスの処理を活かしつつ、追加の処理だけ足したいときは `super` を使います。

```ruby
irb(main):001> class Dog < Animal
irb(main):002>   def initialize(name)
irb(main):003>     super(name)
irb(main):004>     @tail_wagging = true
irb(main):005>   end
irb(main):006> end
=> :initialize
```

`super(name)` は「親クラス（`Animal`）の `initialize` を、同じ引数 `name` で呼び出す」という意味です。これで `@name = name` の処理は親クラスに任せつつ、`Dog` 独自の `@tail_wagging` を追加できます。

実際の `Fighter` クラスでも、同じパターンが使われていました。

```ruby
class Fighter < Sprite
  def initialize
    super("app/images/fighter.png")
    self.speed = 3.0
  end
end
```

`super("app/images/fighter.png")` で、親クラスの `Sprite` に画像の読み込みを任せてから、`Fighter` 独自の `speed` などを設定しています。

#### *ここで試したいこと

- `Animal` を継承した `Cat` クラスを作り、`greet` を「ニャー！」で上書きしてみよう。
