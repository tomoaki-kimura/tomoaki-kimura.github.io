---
layout: post
part: Ruby(2)
title: Ruby応用
categories: [ruby_2, ruby_advance]
chapter: 1
section: 4
section_title: モジュール（include）
description: includeを使って、他のクラスの機能を取り込むモジュールの使い方を学びます。
---

## {{ page.section_title }}

### モジュールとは

モジュールは、メソッドをひとまとめにしたもので、クラスによく似ています。ただしモジュール自体から `.new` してインスタンスを作ることはできません。「便利なメソッドの詰め合わせ」を、必要なクラスや、今いる場所に取り込んで使うためのものです。

### include で取り込む

Rubyには、`Math` という数学系のメソッドを集めた標準モジュールが用意されています。`include Math` と書くと、`Math.cos` のように毎回書かなくても、`cos` だけで呼び出せるようになります。

```ruby
irb(main):001> Math.cos(0)
=> 1.0
irb(main):002> cos(0)
NoMethodError: undefined method 'cos'
irb(main):003> include Math
=> Object
irb(main):004> cos(0)
=> 1.0
irb(main):005> PI
=> 3.141592653589793
```

`include Math` した後は、`Math.cos` の代わりに `cos` と書くだけで呼び出せるようになります。`PI`（円周率）のような定数も同じように使えます。

実際のシューティングゲームでも、弾を発射する向きを計算するために `include Math` が使われていました。

```ruby
require "ruby2d"
include Math

# cos・sin・PIを使って、角度から弾の飛ぶ方向を計算する
```

`cos`・`sin`・`PI` は、キャラクターを斜め方向に飛ばしたり、円を描くように動かしたりする計算でよく使われます。

### 自分でモジュールを作ることもできる

`module` を使うと自分でモジュールを作れますが、ここでは「Rubyや外部のライブラリが用意してくれたモジュールを `include` で取り込んで使う」ということを覚えておけば十分です。実際、ここまでのゲーム制作でも `Sprite` や `Text` といったクラス、`Math` のようなモジュールは、すべてRuby2DやRubyがあらかじめ用意してくれていたものでした。

#### *ここで試したいこと

- `include Math` した状態で `sqrt(16)`（平方根）や `sin(0)` を試してみよう。
