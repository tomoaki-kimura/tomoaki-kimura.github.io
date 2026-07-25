---
layout: post
part: Ruby(2)
title: Ruby応用
categories: [ruby_2, ruby_advance]
chapter: 1
section: 1
section_title: クラスの基礎
description: class・initialize・インスタンス変数・attr_accessorを使って、自分だけのクラスを作ります。
---

## {{ page.section_title }}

### クラスとは

`Circle` や `Rectangle` は、Ruby2Dが用意してくれていたクラスでした。クラスとは「値（データ）とそれを扱うメソッドをひとまとめにした設計図」です。この設計図から `Circle.new` のように実際のもの（インスタンス）を作ります。

`class` を使うと、自分だけのクラスを作れます。

```ruby
irb(main):001> class Character
irb(main):002> end
=> nil
irb(main):003> Character.new
=> #<Character:0x0000000104b0e2a0>
```

`Character.new` で `Character` クラスのインスタンス（実体）が1つ作られました。

### initialize でインスタンス作成時の処理を書く

`initialize` メソッドは、`.new` が呼ばれたときに自動的に実行される特別なメソッドです。

```ruby
irb(main):001> class Character
irb(main):002>   def initialize(name)
irb(main):003>     @name = name
irb(main):004>     puts "#{@name}が生まれた"
irb(main):005>   end
irb(main):006> end
=> :initialize
irb(main):007> taro = Character.new("たろう")
たろうが生まれた
=> #<Character:0x0000000104b12345 @name="たろう">
```

`Character.new("たろう")` の `"たろう"` が `initialize` の `name` に渡され、`@name` に保存されます。

### インスタンス変数（@変数）

`@name` のように `@` から始まる変数はインスタンス変数と呼ばれ、そのインスタンスの中でずっと保持される値です。ただし、クラスの外から `@name` を直接読み書きすることはできません。

```ruby
irb(main):001> taro.name
NoMethodError: undefined method 'name' for #<Character ...>
```

### attr_accessor でクラスの外から読み書きできるようにする

`attr_accessor` を使うと、インスタンス変数を読み書きするためのメソッドが自動的に作られます。

```ruby
irb(main):001> class Character
irb(main):002>   attr_accessor :name, :hp
irb(main):003>
irb(main):004>   def initialize(name)
irb(main):005>     @name = name
irb(main):006>     @hp = 100
irb(main):007>   end
irb(main):008> end
=> :initialize
irb(main):009> taro = Character.new("たろう")
=> #<Character ...>
irb(main):010> taro.name
=> "たろう"
irb(main):011> taro.hp = 80
=> 80
irb(main):012> taro.hp
=> 80
```

`attr_accessor :name, :hp` を書くだけで、`taro.name`（読み取り）と `taro.name = "..."`（書き込み）の両方ができるようになります。

実際のシューティングゲームでも、`Fighter` クラスで以下のように使われていました。

```ruby
class Fighter < Sprite
  attr_accessor :speed, :status, :pow, :level, :life, :life_gauge

  def initialize
    super("app/images/fighter.png")
    self.speed = 3.0
    self.life = 3
  end
end
```

`self.speed = 3.0` のように `self.` をつけて書いているのは、`attr_accessor` が作った書き込み用のメソッドを呼び出しているためです（`@speed = 3.0` と直接書いてもほぼ同じ結果になります）。

#### *ここで試したいこと

- `Character` に `attack` というメソッドを追加して、`puts "#{@name}の攻撃！"` と表示させてみよう。
