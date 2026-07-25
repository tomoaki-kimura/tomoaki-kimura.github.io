---
layout: post
part: Git/GitHub
title: GitHubの使い方
categories: [git_github, github_basic]
chapter: 1
section: 2
section_title: ローカルのリポジトリをGitHubにpushする
description: git remote addとgit pushで、手元のリポジトリの内容をGitHubに送ります。
---

## {{ page.section_title }}

### リモートリポジトリを登録する

手元（ローカル）のリポジトリに、GitHub上のリポジトリ（リモートリポジトリ）の場所を教えます。前回控えておいたURLを使います。

```bash
sample_app $ git remote add origin https://github.com/ユーザー名/sample_app.git
```

`origin` は、このリモートリポジトリにつける名前です。とくに理由がなければ `origin` という名前を使うのが慣習になっています。

登録できたか確認します。

```bash
sample_app $ git remote -v
origin	https://github.com/ユーザー名/sample_app.git (fetch)
origin	https://github.com/ユーザー名/sample_app.git (push)
```

### push する

ローカルの `main` ブランチの内容を、`origin` の `main` ブランチに送ります。

```bash
sample_app $ git push -u origin main
```

初回はGitHubへのログイン（認証）を求められることがあります。案内に従って認証を済ませると、pushが完了します。

`-u` をつけて一度pushしておくと、次回からは `git push` だけで同じ場所に送れるようになります。

```bash
sample_app $ git push
```

### GitHub側で確認する

ブラウザでリポジトリのページを開き直すと、`main.rb` などのファイルがアップロードされているのが確認できます。以降、ローカルで `git add` → `git commit` → `git push` をくり返すことで、変更をGitHubに反映していきます。

#### *ここで試したいこと

- ローカルで何か変更を加えてコミットし、`git push` だけで反映されることを確認してみよう。
