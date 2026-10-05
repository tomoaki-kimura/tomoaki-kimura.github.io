---
layout: post
part: LLM(1)
title: ローカルLLM入門
categories: [llm_1, ollama_basic]
chapter: 1
section: 4
section_title: プロンプトを変えて試す
description: systemプロンプトとtemperatureを使って、LLMの回答の変わり方を確かめます。
---

## {{ page.section_title }}

### system プロンプトで役割を与える

`messages` の先頭に `role: "system"` の発言を入れると、LLM に「どんな立場で答えるか」を指示できます。

main.rb

```ruby
(略)
body = {
  model: "qwen2.5:3b",
  messages: [
    { role: "system", content: "あなたは小学生に教える先生です。やさしい言葉で、短く答えてください。" },
    { role: "user", content: "Rubyってどんなプログラミング言語？" }
  ],
  stream: false
}
(略)
```

### ファイルの実行

bash
```
llm $ ruby main.rb
```

### 結果

同じ質問でも、system プロンプトに合わせた言葉づかいで回答が返ってくる。

### temperature でばらつきを変える

LLM は次に来る言葉を確率で選んでいます。`temperature` はその選び方の「ばらつき」を決める値で、小さいほど毎回同じような回答になり、大きいほど回答がばらけます。

main.rb

```ruby
(略)
    { role: "user", content: "Rubyってどんなプログラミング言語？" }
  ],
  options: { temperature: 0 },
  stream: false
}
(略)
```

### ファイルの実行

bash
```
llm $ ruby main.rb
```

### 結果

`temperature: 0` では、何度実行してもほぼ同じ回答になる。

### ここまでのコード

main.rb

```ruby
require "net/http"
require "json"

uri = URI("http://localhost:11434/api/chat")

body = {
  model: "qwen2.5:3b",
  messages: [
    { role: "system", content: "あなたは小学生に教える先生です。やさしい言葉で、短く答えてください。" },
    { role: "user", content: "Rubyってどんなプログラミング言語？" }
  ],
  options: { temperature: 0 },
  stream: false
}

res = Net::HTTP.post(uri, body.to_json, "Content-Type" => "application/json")
data = JSON.parse(res.body)

puts data["message"]["content"]
```

#### *ここで試したいこと

- `temperature` を `0`、`0.8`、`1.5` に変えて、それぞれ3回ずつ実行して比べる。
- system プロンプトを「関西弁で答える」「必ず箇条書きで答える」などに変えてみる。
- system プロンプトで「Rubyの質問以外には答えない」と指示し、別の話題を聞いたらどうなるか試す。
