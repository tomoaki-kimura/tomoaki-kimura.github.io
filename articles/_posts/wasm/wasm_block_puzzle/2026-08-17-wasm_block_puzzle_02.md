---
layout: post
part: WebAssembly
title: ブロックパズルをWASM公開する
categories: [wasm, wasm_block_puzzle]
chapter: 3
section: 2
section_title: Rakefile でファイルをバンドルする
description: 複数のRubyファイルを1つに結合するRakeタスクを作り、WASMビルドの前準備をします。
---

## {{ page.section_title }}

### Rakefile に wasm タスクを追加する

`Rakefile` に `:wasm` タスクを追加します。  
このタスクは「必要なファイルを正しい順番で1つに結合 → `ruby2d build --web` でビルド」という流れを自動化します。

```ruby
task :wasm do
  require "fileutils"
  FileUtils.mkdir_p ".bundle"

  files = [
    "settings.rb",
    "app/models/blocks/block.rb",
    "app/models/blocks/block_map.rb",
    "app/models/tetrominos/tetromino_base.rb",
    "app/models/tetrominos/tetromino_i.rb",
    "app/models/tetrominos/tetromino_j.rb",
    "app/models/tetrominos/tetromino_l.rb",
    "app/models/tetrominos/tetromino_o.rb",
    "app/models/tetrominos/tetromino_s.rb",
    "app/models/tetrominos/tetromino_t.rb",
    "app/models/tetrominos/tetromino_z.rb",
    "app/models/stage/stage.rb",
    "app/models/game/game.rb",
  ]

  bundle = %(require "ruby2d"\n\n)
  files.each { |f| bundle += File.read(f) + "\n" }

  main_body = File.read("app/main.rb").gsub(/^require.*\n/, "")
  bundle += main_body

  File.write(".bundle/bundle.rb", bundle)
  puts "Bundled → .bundle/bundle.rb"

  sh "ruby2d build --web .bundle/bundle.rb"

  FileUtils.cp "web/index.html", "build/web/app.html"
  puts "Template applied → build/web/app.html"
end
```

### 各ステップの解説

**① ファイルリストを順番通りに並べる**

```ruby
files = [
  "settings.rb",          # 定数を最初に
  "app/models/blocks/block.rb",   # 基底クラスを先に
  "app/models/blocks/block_map.rb",
  ...
]
```

mruby は上から順に実行するため、**クラスを使う前に定義されている必要があります**。  
`Block` を継承するクラスより先に `block.rb` を読み込む、という順序が重要です。

**② `require` 行を取り除いてから結合する**

```ruby
main_body = File.read("app/main.rb").gsub(/^require.*\n/, "")
bundle += main_body
```

`main.rb` の `require` 行はすべて削除します。  
すでに上で全ファイルの中身を結合しているので、`require` は不要になります。

**③ 先頭に `require "ruby2d"` だけ残す**

```ruby
bundle = %(require "ruby2d"\n\n)
```

`ruby2d` 本体は mruby 側で組み込まれているため、この1行だけは残します。

**④ `.bundle/` に出力してビルド**

```ruby
File.write(".bundle/bundle.rb", bundle)
sh "ruby2d build --web .bundle/bundle.rb"
```

結合したファイルを `.bundle/bundle.rb` に書き出し、`ruby2d build --web` に渡します。

**⑤ カスタム HTML をコピーする**

```ruby
FileUtils.cp "web/index.html", "build/web/app.html"
```

自動生成される HTML の代わりに、`web/index.html` を使います。  
カスタム HTML の作り方は次のセクションで説明します。

#### *ここで試したいこと

- `.bundle/bundle.rb` を開いて、全ファイルが1つにまとまっていることを確認しよう。
- `require` 行が消えていることも確認しよう。
