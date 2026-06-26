# tomoaki-kimura.github.io カリキュラムサイト

HearthSide プログラミングスクールのカリキュラムサイト（Jekyll）。

## カリキュラムを追加・更新したときの必須作業

カリキュラムの Markdown ファイルを追加・変更したら、**必ず `_config.yml` にもメニューを追加する**。

### _config.yml への追加方法

`curriculums:` セクションの該当パートに `contents:` のエントリを追加する。

```yaml
- title: Ruby2D(1)          # パートのタイトル
  icon: lo-ruby-line
  part: ruby2d_1
  contents:
    - title: ブロック崩し    # ← 追加するカリキュラムのタイトル
      chapter: blocks        # ← _posts/ruby2d_1/{chapter}/ のフォルダ名
```

### Markdownファイルの置き場所

```
articles/_posts/{part}/{chapter}/YYYY-MM-DD-{chapter}_NN.md
```

例：`articles/_posts/ruby2d_1/shooting/2026-02-27-shooting_01.md`

## Ruby2D(1) の現在の構成

`_config.yml` の `Ruby2D(1)` セクション（part: ruby2d_1）：

| タイトル | chapter | フォルダ |
|---------|---------|---------|
| 基礎 | ruby2d_basic | _posts/ruby2d_1/ruby2d_basic/ |
| ブロック崩し | blocks | _posts/ruby2d_1/blocks/ |
| ヘビゲーム | hebi | _posts/ruby2d_1/hebi/ |
| シューティングゲーム | shooting | _posts/ruby2d_1/shooting/ |

## 注意事項

- `shooting` は `Ruby2D(1)` と `Ruby2D(2)` の両方にあるが別カリキュラム
- `blocks` は `Ruby2D(1)`（初級・クラス導入）と `Ruby2D(2)`（上級・app構成）で別物
