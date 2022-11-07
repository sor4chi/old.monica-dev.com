---
title: "Django環境構築"
description: "Djangoを初心者向けに環境構築するチュートリアルです"
tags: ["django", "python", "web"]
published: true
date: "2021-07-25 03:27"
---

# 【前提知識】Djangoとは

DjangoはPythonで作られたWebフレームワークの1つです。
YoutubeやInstagramなども一部サービスにDjangoが使われていたりなど様々な分野で活躍しています。

## Djangoのメリット

- 予め用意されている機能が豊富(ORM,管理ページetc...)で高速に開発ができる。
- 予め用意されてる機能のセキュリティが強い。
- 少ないコードで書ける。
- Pythonで書けるため学習コストが少ない。
- Pythonのライブラリが使えるため機械学習を組み込むといった複雑な機能も容易に実装できる。

## Djangoのデメリット

- 多機能ゆえに他のWebフレームワークに移るときの壁が高い。
- レスポンスが遅い。
- 日本語の記事やサイトがそれほど潤っていない。

# Djangoの環境構築

ここではポータブルな環境で開発すること、共同開発などで通用するような統合的な開発を想定して解説をしていきます。

## 仮想環境構築

今回はPythonが標準で用意している仮想環境```venv```を利用します。
上下どちらか実行できる方を実行してください。

```bash
python -m venv venv
python3 -m venv venv
```

:::message
以降使用するpipコマンドやpythonコマンドはpip3,python3と表しますので適宜pipやpythonに置き換えてください。
:::
続いて仮想環境に入ります。Windows(Power Shell)なら上を、MacやLinux(Terminal)なら下を実行してください。

```bash
./venv/Scripts/activate
source venv/bin/activate
```

次に仮想環境内にDjangoをインストールします。
作業ディレクトリ内にrequirements.txtを作成してください。

```txt:requirements.txt
Django==3.2.5
```

そして次を実行します。

```bash
pip3 install -r requirements.txt
```

こうすることでvenv内にDjango(v3.2.5が現時点では最新)がインストールされます。

## Django構築

それでは開発環境が整いましたのでDjangoを呼び出します。

```bash
django-admin startproject config .
```

これを実行するとconfigフォルダが直下に生成されます。このconfigフォルダが今回のWebアプリの軸となります。
Djangoの初期設定をします。ファイルの下の方でこのように一部変更をします。

```diff python:config/settings.py
...
- LANGUAGE_CODE = 'en-us'
+ LANGUAGE_CODE = 'ja'

- TIME_ZONE = 'UTC'
+ TIME_ZONE = 'Asia/Tokyo'
...
```

とりあえず今回はこれだけでOKです。ではDjangoを起動してみましょう。

```bash
python3 manage.py runserver
```

を実行してください。赤文字のエラーが少し出ますが後で解決するので今は無視してください。シェルの出力に <http://127.0.0.1:8000> でサーバーを立てたと書いてあるはずなのでそこにアクセスします。以下のような画面が出れば成功です。
![Djangoビルド成功画面](/blogs/b.png)
