---
layout: post
part: LLM(1)
title: ローカルLLM入門
categories: [llm_1, ollama_basic]
chapter: 1
section: 2
section_title: ターミナルでモデルと話す
description: モデルをダウンロードして、ターミナルからLLMと会話します。
---

## {{ page.section_title }}

### モデルをダウンロードする

Ollama 自体には LLM は入っていないので、使うモデルをダウンロードします。ここでは日本語もある程度扱える `qwen2.5:3b`（約2GB）を使います。

```bash
$ ollama pull qwen2.5:3b
```

ダウンロードが終わったら、手元にあるモデルを確認します。

```bash
$ ollama list
NAME          ID              SIZE      MODIFIED
qwen2.5:3b    ...             1.9 GB    ...
```

### 会話してみる

```bash
$ ollama run qwen2.5:3b
>>> こんにちは。あなたは誰ですか？
```

`>>>` の後に文章を入力して Enter を押すと、LLM が回答を返します。終了するときは `/bye` と入力します。

```bash
>>> /bye
```

### 結果

自分のパソコンの中だけで、LLMが文章を生成して返してくれる。

### 動きが重いときは

メモリが少ないパソコンでは、さらに小さいモデルを使います。

```bash
$ ollama run gemma3:1b
```

使わなくなったモデルは `ollama rm モデル名` で削除できます。

#### *ここで試したいこと

- 同じ質問を何度かしてみて、毎回同じ回答になるか確認する。
- 計算問題や、最近のニュースについて聞いてみて、どんなことが苦手か調べる。
- `qwen2.5:3b` と `gemma3:1b` で同じ質問をして、回答を比べる。
