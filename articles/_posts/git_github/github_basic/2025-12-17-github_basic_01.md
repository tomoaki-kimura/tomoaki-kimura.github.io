---
layout: post
part: Git/GitHub
title: GitHubの使い方
categories: [git_github, github_basic]
chapter: 1
section: 1
section_title: GitHubにアカウントとリポジトリを作る
description: GitHubにアカウントを作り、リモートリポジトリを作成します。
---

## {{ page.section_title }}

### GitHubとは

ここまで作ってきたリポジトリは、自分のPCの中だけにありました。GitHubは、そのリポジトリをインターネット上に置いて、他のPCと共有したり、公開したりできるサービスです。

### アカウントを作る

まだアカウントを持っていない場合は、以下にアクセスして作成します。

[https://github.com/](https://github.com/){:target="_blank"}

「Sign up」からメールアドレス・パスワード・ユーザー名を登録して、アカウントを作成します。画面の案内に従って進めれば作成できます。

### リポジトリを作る

ログインしたら、画面右上の「+」ボタンなどから「New repository」を選びます。

- Repository name: 好きな名前（例: `sample_app`）
- Public / Private: 公開するかどうか（学習用なら最初はどちらでも構いません）
- 「Add a README file」などのチェックボックスは、いったんすべて外したままで作成します

「Create repository」を押すと、空のリポジトリが作られます。作成後の画面に表示される、`https://github.com/ユーザー名/リポジトリ名.git` の形のURLを、次のセクションで使うので控えておきましょう。

#### *ここで試したいこと

- 作成したリポジトリのページを開いて、「Settings」タブがあることを確認してみよう（次のセクション以降で使います）。
