---
layout: post
part: LLM(1)
title: ローカルLLM入門
categories: [llm_1, ollama_basic]
chapter: 1
section: 1
section_title: このチャプターについて・Ollamaのインストール
description: 自分のパソコンでLLMを動かすためのツール「Ollama」をインストールします。
---

## {{ page.section_title }}

### このチャプターについて

ChatGPT や Claude のような「LLM（大規模言語モデル）」は、インターネットの向こうの大きなサーバーで動いています。一方で、小さめのモデルであれば自分のパソコンの中でも動かすことができます。

このチャプターでは、ローカルでLLMを動かすツール **Ollama（オラマ）** を使って、

- ターミナルでLLMと会話する
- Ruby のプログラムからLLMを呼び出す
- プロンプト（指示文）を変えて、回答がどう変わるか試す

ところまでやってみます。料金もアカウント登録も不要です。

### 必要なパソコンの性能

LLMはメモリをたくさん使います。目安は以下の通りです。

| メモリ | 使えるモデルの目安 |
| --- | --- |
| 8GB | 1B〜3B（10〜30億パラメータ）の小さいモデル |
| 16GB以上 | 7B〜8B くらいまで |

このチャプターでは 3B のモデルを使います。メモリが 8GB で動きが重い場合は、途中で紹介する 1B のモデルに切り替えてください。

### インストール（Mac）

[ollama.com](https://ollama.com) からMac版をダウンロードして、アプリケーションフォルダに入れて起動します。Homebrew を使っている場合は以下でもインストールできます。

```bash
$ brew install ollama
```

### インストール（Windows / WSL）

このカリキュラムでは Ruby を WSL の中で動かしているので、Ollama も **WSL の中** にインストールします。WSL のターミナルで以下を実行します。

```bash
$ curl -fsSL https://ollama.com/install.sh | sh
```

### インストールの確認

```bash
$ ollama -v
ollama version is 0.x.x
```

バージョンが表示されればOKです。

`could not connect to a running Ollama instance` のような警告が出た場合は、Ollama 本体（サーバー）が起動していません。別のターミナルを開いて以下を実行し、そのターミナルは開いたままにしておきます。

```bash
$ ollama serve
```

#### *ここで試したいこと

- 自分のパソコンのメモリ容量を調べてみよう。
