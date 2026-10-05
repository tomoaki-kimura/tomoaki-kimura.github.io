---
layout: post
part: LLM(1)
title: ローカルLLM入門
categories: [llm_1, ollama_basic]
chapter: 1
section: 3
section_title: RubyからOllamaを呼び出す
description: OllamaのAPIにHTTPでリクエストを送り、RubyのプログラムからLLMを使います。
---

## {{ page.section_title }}

### Ollama の API

Ollama は起動している間、`http://localhost:11434` で **API（プログラムから使うための窓口）** を開いています。ここに質問を JSON で送ると、回答が JSON で返ってきます。

`ollama run` の画面も、裏ではこの API を使っています。

### ディレクトリとファイルを作る

```bash
$ mkdir llm
$ cd llm
llm $ touch main.rb
```

### 質問を送る

main.rb

```ruby
require "net/http"
require "json"

uri = URI("http://localhost:11434/api/chat")

body = {
  model: "qwen2.5:3b",
  messages: [
    { role: "user", content: "Rubyってどんなプログラミング言語？3行で教えて。" }
  ],
  stream: false
}

res = Net::HTTP.post(uri, body.to_json, "Content-Type" => "application/json")
data = JSON.parse(res.body)

puts data["message"]["content"]
```

- `messages` には会話を配列で入れます。`role: "user"` は「人間の発言」という意味です。
- `stream: false` にすると、回答が全部できあがってから1回で返ってきます。

### ファイルの実行

bash
```
llm $ ruby main.rb
```

### 結果

ターミナルに LLM の回答が表示される。

最初の1回はモデルの読み込みに時間がかかるので、少し待ちます。

### 返ってきたデータを見る

`puts data["message"]["content"]` の下に、以下を追加します。

main.rb

```ruby
(略)
puts data["message"]["content"]

pp data
```

回答の本文以外に、使ったモデル名や、かかった時間（ナノ秒）などが入っていることがわかります。確認できたら `pp data` は削除しておきます。

#### *ここで試したいこと

- `content` の質問文を変えてみる。
- `model` を `gemma3:1b` に変えてみる。
- Ollama を止めた状態で実行すると、どんなエラーになるか確認する。
