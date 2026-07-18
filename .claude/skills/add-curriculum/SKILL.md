---
name: add-curriculum
description: カリキュラム（章・レッスン）のMarkdownを追加・更新するときに使う。tomoaki-kimura.github.io（Jekyllのカリキュラムサイト）で新しいチャプターを作る、既存チャプターにページを足す、_config.ymlのメニューに反映する、といった作業で呼び出す。
---

# カリキュラムの追加・更新

このサイトはカリキュラムのMarkdownファイルと `_config.yml` のメニュー定義が**別管理**になっている。
ファイルを追加・変更しただけではサイトのメニューに出てこないため、**両方を必ずセットで更新する**。

## 手順

1. Markdownファイルを配置する

   ```
   articles/_posts/{part}/{chapter}/YYYY-MM-DD-{chapter}_NN.md
   ```

   例: `articles/_posts/ruby2d_1/shooting/2026-02-27-shooting_01.md`

   frontmatterの書式は `references/post_template.md` を参照。

2. `_config.yml` の `curriculums:` セクションにメニューを追加する

   該当パート（`part:` が一致するブロック）の `contents:` に1エントリ追加する。
   該当パートがまだ無い場合はパートごと新規追加する。

   書式は `references/config_entry_template.yml` を参照。

3. `bundle exec jekyll serve` 等でメニューとページの両方が反映されているか確認する。

## 注意事項

- `shooting` は `Ruby2D(1)`（`part: ruby2d_1`）と `Ruby2D(2)`（`part: ruby2d_2`）の両方に存在するが、別カリキュラム。`part` を取り違えないこと。
- `blocks` も同様に `Ruby2D(1)`（初級・クラス導入）と `Ruby2D(2)`（上級・app構成）で別物。

## 現在の構成を確認する

最新の構成は `_config.yml` の `curriculums:` セクションが正なので、古い一覧を書き写すのではなく直接読むこと。

```bash
grep -n "curriculums:" -A 200 _config.yml
```
