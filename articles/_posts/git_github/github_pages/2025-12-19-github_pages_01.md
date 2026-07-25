---
layout: post
part: Git/GitHub
title: GitHub Pagesで公開
categories: [git_github, github_pages]
chapter: 1
section: 1
section_title: GitHub Pagesを有効にする
description: GitHub Pagesの設定を行い、リポジトリの内容をWebサイトとして公開します。
---

## {{ page.section_title }}

### GitHub Pagesとは

GitHub Pagesは、GitHubのリポジトリの中身を、そのままWebサイトとして公開できる機能です。このカリキュラムサイト自体も、GitHub Pagesを使って公開されています。

### 公開する内容を用意する

まずは公開したいHTMLファイルをリポジトリに用意します。試しに `index.html` を作ってpushしてみましょう。

```bash
sample_app $ echo "<h1>はじめてのGitHub Pages</h1>" > index.html
sample_app $ git add index.html
sample_app $ git commit -m "index.htmlを追加"
sample_app $ git push
```

### GitHub Pagesを有効にする

ブラウザでリポジトリのページを開き、「Settings」タブを開きます。左側のメニューから「Pages」を選びます。

「Build and deployment」の「Source」で、公開したいブランチ（`main` など）と、公開するフォルダ（ルートディレクトリの場合は `/ (root)`）を選び、「Save」を押します。

### 公開されたURLを確認する

保存すると、少し時間が経ってから、以下の形のURLでページが公開されます。

```
https://ユーザー名.github.io/リポジトリ名/
```

このURLにアクセスして、`index.html` の内容が表示されていれば成功です。

### 更新する

以降、`index.html` などの内容を変更して `git push` すると、しばらくして自動的に公開ページも更新されます。

#### *ここで試したいこと

- `index.html` の内容を変更してpushし、公開ページが更新されるまでの時間を確認してみよう。
