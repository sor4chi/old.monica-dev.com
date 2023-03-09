export const blogData = `こんにちは、monicaです。
この度、ウルシステムズ株式会社さん主催の[UTE-1](https://uteone.jp/)というイベントに参加してきました。
UTE-1とは、学生を対象にしたGoアプリケーション開発のビジネスタスク力・パフォーマンスチューニング力を競うコンテストです。
ISUCONの学生向け、Goに特化したバージョンといった感じです。

## 私たちについて

### なぜUTE-1に参加したのか

私のいる某大学で昨年度の夏に新しく「Web研究会」を立ち上げました。
(正式には競プロサークルMaximumの子サークルという立ち位置です。)

未経験の学生がWebアプリケーション開発の基礎を学べる基盤を作りたいという目的で実務経験のある私(monica)と競プロサークルの代表(Asa)の２人で立ち上げました。
ISUCONに参加することを目標にして人材育成に励んでいたところ、ウルシステムズさんからUTE-1の招待をいただき、せっかくの機会なので参加してみようということになりました。

### メンバー構成

- 私（monica）: フルスタックエンジニア、Go初心者、実務経験者
- Asa: フルスタックエンジニア、Go初心者、Atcoderがつよいひと
- Through: Web未経験、一年前に競プロでプログラミングデビューをしたひと
- Kasa: Web未経験、一年前に競プロでプログラミングデビューをしたひと

### 事前準備

学期末が終わった2/9から毎晩3時間ほどあつまり、ISUCONの過去問をといて主に「パフォーマンスチューニング」について勉強しました[^1]。
本番が2/25日なので15日間と約二週間という短い期間で基礎をがん詰めするということになりました。

## 本番

UTE-1運営の意向により、問題内容やコードは公開しないとのことなので、ここでは私たちの取り組みについてのみ記載します。

### 流れ

|時間|内容|
|:--|:--|
|10:00|開会式|
|10:30|リポジトリの配布、本番環境の公開、開発スタート|
|17:00|本番環境の停止、開発終了、最終採点スタート|
|17:40|最終採点終了、結果発表、閉会式|
|18:00|終了|
|...|(優勝者だけが参加できる領域)|

### 開発環境

- リポジトリ: 事前にUTE-1のGithub Organizationへ招待され、各チームに1つ配布されます
- 環境:
  - ローカル: docker, docker-compose, devcontainer
  - 本番: k8s, GKE(GCP)
  - CI/CD: Github Actions
  - DB: MongoDB, MySQL

### チームの役割分担

|メンバー|役割|
|:--|:--|
|Through, Kasa| バグ洗い出し、Issue立て（仕様書を熟読してドメインリーダーになってもらう目的）|
|自分, Asa| Issue解決、バグ修正|

なるべく初心者の2人の開発負担を軽くしたいということで、このような役割分担をしました。

### バグの発見と修正

私たちはIssue Templateを事前に用意して、初心者でもGitFlowがうまく運用できるようにしておいたため、バグの発見から共有、タスクマネジメントはとてもスムーズでした。

![issue template](/images/117a84653f69a7/issue_template.png)

まずは、仕様書を読み、バグを洗い出しました。想定外[^2]のバグFixタスクなのでとても苦戦しました。
特にIO(Req,Res)のバリデーションやクエリ修正等のシンプルなものが多かったですが、トランザクション系のアプリ故になかなか読み慣れない書き方が多く、発見と修正に時間がかかりました。

![issue list](/images/117a84653f69a7/issue_list.png)

### パフォーマンスチューニング

[^1]のとおり、パフォーマンススコアを上げるためには、先にある程度のバグを修正する必要がありました。
自分たちのチームはバグで想定以上につまづいてしまったのでほとんどパフォーマンスチューニングに取り組めませんでした。
MongoDBやMysqlへのスキーマはSQLで定義せず、Go上のマイグレーション（？）から定義していました、しかしISUCON対策で未経験二人にSQLを教えていたため本番では詰んでいました...
（先見の明があれば...もっと実務的なことをやっておけばよかった...と反省しています）

## 結果

初動はかなり順調で、開始二時間半の時点で5/30位にランクインしました。
![result](/images/117a84653f69a7/result_max.png)

しかし、バグ修正と仕様書の解釈ミスが重なりに重なった結果、中盤以降のスコアが停滞してしまい（同じバグで3時間ほど悩んでしまいました...）、最終的には22/30位にとどまる結果となりました。
![result](/images/117a84653f69a7/result_final.png)

## 反省

結果を踏まえて当日中に感想会という形で振り返りを行いました。

- 仕様書の解釈ミスが目立った
  - 仕様書を読む担当とバグ修正担当で疎通がうまく取れず、解釈ミスがバグ改善の時間にも影響してしまったので、**ビジネスタスク力**や**読解力**がより重要になると感じました。
- バグ修正の時間がかかった
  - 適宜**テスト**を書くべきだった（時間的な焦りからテストを書くという選択肢に踏み出せなかった）
  - ローカル開発環境の立ち上げで詰まってしまった（dockerの立ち上げで30分ほどかかり、さらにローカルでの改修後反映の方法がわからず、結局本番でログを見ながら修正した）
  - ベンチマークをより積極的に使うべきだった（点数からできる問題推測やログを見ることも重要だと感じた）
- 人的リソースのマネジメント
  - 30分ごとにチーム全員へ進捗を聞くという形で被っているタスクをしていないか、同じ問題に詰まりすぎていないかを確認していたつもりだったが、結局口頭での毎回の確認が目立ち、時間がかかってしまった
  - 例えばIssue Flowを強固にしたり、リアルタイムタスク共有ツールを使ったりするなど、チーム全体のコミュニケーションをよりスムーズにする方法があると感じた
- 十分な事前学習ができていなかった
  - これは参加が決まって学期末が終わってからの対策で、効果があまり出なかった
  - 次回(ISUCONに参加する予定)はより長めの対策と過去問分析をしたい

## まとめ

ISUCONに参加して、自分とサークルとしての課題を見つけることができました。
<!-- textlint-disable -->
今回見つけた課題を今後のサークルの講義で活かし、より実践的な講義をしていきたいと思います。
<!-- textlint-enable -->

さいごに運営の方々、チームの皆さん、応援してくれた皆さん、ありがとうございました！

[^1]: ISUCONの過去問を事前勉強として解いていましたが、問題の仕様上Performanceチューニングの問題へ取り組む前にバグを見つけ修正しないとならなかったため、結局あまり役に立ちませんでした..。
[^2]: 見つけたバグを可能な限り修正していくものだと当時勘違いしていましたが、実際はベンチマーカーが吐いたバグ修正リストを元に修正していくものでした。気づくのに時間がかかったので、初動でベンチマークを走らせてみたチームほど点数が高かったと感じています。`;

export const blogsData = [
  {
    content:
      '# コンテナ技術の基礎を学ぼう\n\nコンテナ技術は、近年注目を集めているアプリケーションのデプロイ技術です。DockerやKubernetesといったコンテナオーケストレーションツールを利用することで、アプリケーションのデプロイがより簡単になります。\n\n## コンテナとは？\n\nコンテナは、アプリケーションを動かすために必要なライブラリやツール類を一緒にパッケージ化したものです。このようにパッケージ化することで、アプリケーションを実行する環境が揃い、どの環境でも同じようにアプリケーションを動かすことができます。\n\n## Dockerとは？\n\nDockerは、コンテナ技術を実現するためのオープンソースのプラットフォームです。Dockerを利用することで、アプリケーションやその依存関係を一つのイメージにまとめ、そのイメージを使ってコンテナを起動することができます。\n\n## Kubernetesとは？\n\nKubernetesは、Dockerなどのコンテナ技術を利用して、アプリケーションのデプロイや管理を自動化するオープンソースのツールです。Kubernetesは、コンテナのスケーリングやロードバランシングなどを自動で行い、アプリケーションの安定稼働を支援します。\n\nコンテナ技術を学ぶことで、アプリケーションのデプロイや管理がより簡単になります。DockerやKubernetesといったツールを利用することで、アプリケーションをよりスムーズに運用することができます。',
    createdAt: '2022-01-01T00:00:00Z',
    description:
      'DockerやKubernetesなど、コンテナ技術の基礎を解説します。コンテナを活用することで、アプリケーションのデプロイが楽になります。',
    id: '1',
    slug: 'learn-container-technology',
    tags: ['コンテナ', 'Docker', 'Kubernetes'],
    title: 'コンテナ技術の基礎を学ぼう',
    updatedAt: '2022-02-01T00:00:00Z',
  },
  {
    content:
      ':::message\nRustを始めて書くのであまり鵜呑みにしないようにお願いします。\n構文解析の知識、アルゴリズムに関しては間違っている可能性があります、もしあれば教えていただけると嬉しいです。\n:::\n\n# 経緯\n\nプログラミング言語論の講義を大学で履修しており、構文解析が面白かったのでRustで実装してみたいと思いました。なるべく学んだことを対応づけながら実装していきます。\n\nちなみに作ったものを学友に教えるのが目的なので、あまり高度なものは作りたくない...。\n-> **Json Parserだったら楽では**\nってことでJsonの構文解析をやってみます。\n\n脳死でやりたいのでなんちゃってTDDでやります\n単にParserの実装をしても面白くないので、Parser -> Formatter -> Cliとして派生させていきます。\n\n**成果物**\nhttps://github.com/sor4chi/json-parser\n\n# 字句解析\n\nまず最初に字句解析をします。\n\nまずはJSONの構成に必要なTokenを定義します。\nhttps://ja.wikipedia.org/wiki/%E5%AD%97%E5%8F%A5%E8%A7%A3%E6%9E%90\n> 計算機科学における字句解析 (じくかいせき、英: lexical analysis) とは、広義の構文解析の前半の処理で、自然言語の文やプログラミング言語のソースコードなどの文字列を解析して、後半の狭義の構文解析で最小単位（終端記号）となっている「トークン」（字句）の並びを得る手続きである。字句解析を行うプログラムは字句解析器である。\n\n作ってからWikiを確認しましたがやっぱりTokenっていわゆる終端記号のことだったっぽい？\n\n:::details 考察 *終端記号とToken*\n言語の理論でチョムスキー標準形など、言語の生成規則の標準化をするプロセス内で終端を明示的にする表現が出てきます。\n\n$S \\rightarrow AB | ASB$\n$A \\rightarrow a$\n$B \\rightarrow b$\n\nこのように終端記号を弾き出す$a$や$b$のことを終端記号、いわゆるTokenと呼ぶのかな？\nこういう標準化のやりたいことがなんとなく理解できる。形式言語から構文を推測するための手法？\n:::\n\n実装し始めてすぐ気づいて直したのですが、NumberやStringといったリテラルのものをTokenとして扱うと定義や処理が複雑になってしまいます。これは上記Wikiにも全く同じことが書いてあって安心しました。\nToken = 終端記号とはせず、リテラルも一塊のTokenとして扱うようにした方が処理上都合いいとわかりました。\n\n:::details 考察 *JSONのBNFと終端記号の話*\nリポジトリにJSONをBNF記法で定義したもの。\nhttps://github.com/sor4chi/json-parser/blob/main/json.bnf\n[BNF Playground](https://bnfplayground.pauliankline.com/?bnf=%3Cjson%3E%20%3A%3A%3D%20%3Cobject%3E%20%7C%20%3Carray%3E%0A%3Cobject%3E%20%3A%3A%3D%20%22%7B%22%20%3Cmembers%3E%20%22%7D%22%0A%3Cmembers%3E%20%3A%3A%3D%20%3Cpair%3E%20%7C%20%3Cpair%3E%20%22%2C%22%20%3Cmembers%3E%0A%3Cpair%3E%20%3A%3A%3D%20%3Cstring%3E%20%22%3A%22%20%3Cvalue%3E%0A%3Carray%3E%20%3A%3A%3D%20%22%5B%22%20%3Celements%3E%20%22%5D%22%0A%3Celements%3E%20%3A%3A%3D%20%3Cvalue%3E%20%7C%20%3Cvalue%3E%20%22%2C%22%20%3Celements%3E%0A%3Cvalue%3E%20%3A%3A%3D%20%3Cstring%3E%20%7C%20%3Cnumber%3E%20%7C%20%3Cobject%3E%20%7C%20%3Carray%3E%20%7C%20%22true%22%20%7C%20%22false%22%20%7C%20%22null%22%0A%3Cstring%3E%20%3A%3A%3D%20%22%27%22%20%3Ccharacters%3E%20%22%27%22%0A%3Ccharacters%3E%20%3A%3A%3D%20%3Ccharacter%3E%20%7C%20%3Ccharacter%3E%20%3Ccharacters%3E%0A%3Ccharacter%3E%20%3A%3A%3D%20%5Ba-z%5D%0A%3Cnumber%3E%20%3A%3A%3D%20%3Cinteger%3E%20%7C%20%3Cinteger%3E%20%22.%22%20%3Cfraction%3E%20%7C%20%3Cinteger%3E%20%22.%22%20%3Cfraction%3E%20%3Cexponent%3E%20%7C%20%3Cinteger%3E%20%3Cexponent%3E%0A%3Cinteger%3E%20%3A%3A%3D%20%3Cdigit%3E%20%7C%20%3Cdigit%3E%20%3Cinteger%3E%0A%3Cdigit%3E%20%3A%3A%3D%20%5B0-9%5D%0A%3Cfraction%3E%20%3A%3A%3D%20%3Cdigit%3E%20%3Cfraction%3E%0A%3Cexponent%3E%20%3A%3A%3D%20%3Cexponent%3E%20%3Cexponent%3E%0A&name=)\nを書いて置いておきましたが、このダブルクオートで囲われた記号にあたるのがTokenというわけですね？\n:::\n\nなので、Tokenは以下のように定義します。\n\n```rust:token.rs {1, 3-6} showLineNumbers\n#[derive(Debug, PartialEq, PartialOrd, Clone)]\npub enum Token {\n    LBrace,\n    RBrace,\n    LBracket,\n    RBracket,\n    Colon,\n    Comma,\n    StringValue(String),\n    NumberValue(f64),\n    BooleanValue(bool),\n    NullValue,\n    End,\n}\n```\n\nRustのenumは構造体のように扱えるので、StringやNumberなどのリテラルをTokenに含めることができます。この性質を利用して先ほどの拡張された定義でのTokenを実装します。\n\n## テスト\n\nTDDなんで先にテストを書きます。\n\n```rust\n#[test]\nfn test_tokenize() {\n    let input = r#"{"foo":123}"#;\n    let mut lexer = Lexer::new(input);\n    let tests: Vec<Token> = vec![\n        Token::LBrace,                         // {\n        Token::StringValue("foo".to_string()), // "foo"\n        Token::Colon,                          // :\n        Token::NumberValue(123.0),             // 123\n        Token::RBrace,                         // }\n        Token::End,                            // end\n    ];\n\n    for test in tests {\n        assert_eq!(lexer.next_token(), test);\n    }\n}\n```\n\nこれが通れば一応簡易的なLexerは完成です。\n\n## 実装\n\nLexerを実装します。（コードは全文載せると長いので一部抜粋しています）\n\nまず、Lexerを作るにあたってPeekという構造を使います。\nPeekは入力を1Itemずつ読み込むいわばストリームで、カーソル（ポインタ）を進めずに次のItemを覗き見る（peekする）ことができます。\nそして次のItemにカーソルを進めるとそれはそのItemを消費した（consumeした）ことになり、そのItemは破棄されます。\n\n字句解析では、Inputが`Vec<char>`で現在見ている文字と次の文字を見る必要があるので、Peekというデータ構造がピッタリのようです。\n\nまずVecをPeekableなIteratorに変換するユーティリティ型を定義します。これは後の構文解析でも使うので、`src/utility.rs`に定義しました。\n\n```rust\nuse std::iter::Peekable;\nuse std::vec::IntoIter;\n\npub type PeekableIter<T> = Peekable<IntoIter<T>>;\n```\n\n次にLexerを定義します。LexerはPeekableなIterator`char_stream`を持ちます。\nあとはnewメソッドでLexerを作成できるようにします。\n\n```rust\npub struct Lexer {\n    char_stream: PeekableIter<char>,\n}\n\nimpl Lexer {\n    pub fn new(input: &str) -> Self {\n        Lexer {\n            char_stream: input.chars().collect::<Vec<char>>().into_iter().peekable(),\n        }\n    }\n}\n```\n\n本当はParserを正しく実装する場合それぞれのTokenがSource Code上のどこにあるか、どれくらいの長さかを保持しておくことが必要です(エラー出力、フォーマットなどで使う)。\n今回は簡易的に実装するので、Tokenの位置情報は保持しません。\n\n次に、LexerのTokenをPhfMapで定義します。これは`src/token.rs`に定義しました。\nPhfMapはRustのマクロで、コンパイル時にハッシュマップを作成します。静的なハッシュマップを作成するので、実行時にはハッシュマップを作成する必要がなく、高速に動作して便利です。\n\n```rust\npub static CHAR_TOKENS: phf::Map<char, Token> = phf_map! {\n    \'{\' => Token::LBrace,\n    \'}\' => Token::RBrace,\n    \'[\' => Token::LBracket,\n    \']\' => Token::RBracket,\n    \':\' => Token::Colon,\n    \',\' => Token::Comma,\n};\n\npub static KEYWORD_TOKENS: phf::Map<&\'static str, Token> = phf_map! {\n    "true" => Token::BooleanValue(true),\n    "false" => Token::BooleanValue(false),\n    "null" => Token::NullValue,\n};\n```\n\nここでは、`{`や`}`などのCharをTokenに変換するためのマップと、`true`や`false`などのKeywordをTokenに変換するためのマップを定義しています。\n\n次に、Lexerのconsume_charメソッドを実装します。これはPeekableなIteratorのnextメソッドを呼び出して、次の文字を消費します。\n\n### 文字消費\n\n#### テスト\n\nまずはテストを書きます。\n\n```rust\n#[test]\nfn test_consume_char() {\n    let input = r#"{}[]:,"#;\n    let mut lexer = Lexer::new(input);\n    assert_eq!(lexer.consume_char(), Token::LBrace); // {\n    assert_eq!(lexer.consume_char(), Token::RBrace); // }\n    assert_eq!(lexer.consume_char(), Token::LBracket); // [\n    assert_eq!(lexer.consume_char(), Token::RBracket); // ]\n    assert_eq!(lexer.consume_char(), Token::Colon); // :\n    assert_eq!(lexer.consume_char(), Token::Comma); // ,\n}\n```\n\nこれが通ればconsume_charメソッドは完成です。\n\n#### 実装\n\n```rust\nimpl Lexer {\n    fn consume_char(&mut self) -> Token {\n        match self.char_stream.next() {\n            Some(c) => match CHAR_TOKENS.get(&c) {\n                Some(token) => token.clone(),\n                None => Token::Unknown,\n            },\n            None => Token::End,\n        }\n    }\n}\n```\n\nこれで、Lexerのconsume_charメソッドは完成です。\n\nこれを数値リテラルやBoolean値、Null値などのTokenに対しても実装します。（コードは省略します）\n\n# 構文解析\n\n構文解析は、字句解析で得られたTokenを元に、構文木を作成します。\nイメージとしては、1次元的なTokenの列を、構文という2次元的な木構造のデータに変換するようなものです。\n\n構文解析は、字句解析と同様に、PeekableなIteratorを使って実装します。\n\nまずは、構文解析のための構文木を定義します。構文木は`src/node.rs`に定義しました。\n\n```rust\npub enum SyntaxKind {\n    StringLiteral(String),\n    NumberLiteral(f64),\n    TrueKeyword,\n    FalseKeyword,\n    NullKeyword,\n    PropertyAssignment,\n    Identifier(String),\n    ObjectLiteralExpression,\n    ArrayLiteralExpression,\n    End,\n}\n```\n\n構文木は、`SyntaxKind`というenumをネストした構造体で定義しています。\n\n次に、構文木のノードを定義します。ノードは、`SyntaxKind`と、そのノードの子ノードのVecを持ちます。\n\n```rust\npub struct SyntaxNode {\n    pub kind: SyntaxKind,\n    pub children: Vec<SyntaxNode>,\n}\n```\n\nこうすることで構文のパーツひとつひとつ（ノード）の関係を表現できます。\n\n例えばObjectはKey(=foo)とValue(=bar)のペアを持ちますが、これをSyntaxNodeで表現します。\n\n```rust\nSyntaxNode {\n    kind: SyntaxKind::ObjectLiteralExpression,\n    children: vec![\n        SyntaxNode {\n            kind: SyntaxKind::PropertyAssignment,\n            children: vec![\n                SyntaxNode {\n                    kind: SyntaxKind::Identifier("foo".to_string()),\n                    children: vec![],\n                },\n                SyntaxNode {\n                    kind: SyntaxKind::StringLiteral("bar".to_string()),\n                    children: vec![],\n                },\n            ],\n        },\n    ],\n}\n```\n\nというようになり、構文木を構成できます。\n\n次に、構文解析をするParserを定義します。ParserはPeekableなIterator`token_stream`を持ちます。\n\n```rust\npub struct Parser {\n    token_stream: PeekableIter<Token>,\n}\n```\n\nParserは、`src/parser.rs`に定義しました。\n\n## テスト\n\nテストを書きます。\n\n```rust\n#[test]\nfn test_parse() {\n    let input = r#"{"foo": "bar"}"#;\n    let expected = SyntaxNode {\n        kind: SyntaxKind::ObjectLiteralExpression,\n        children: vec![SyntaxNode {\n            kind: SyntaxKind::PropertyAssignment,\n            children: vec![\n                SyntaxNode {\n                    kind: SyntaxKind::Identifier("foo".to_string()),\n                    children: vec![],\n                },\n                SyntaxNode {\n                    kind: SyntaxKind::StringLiteral("bar".to_string()),\n                    children: vec![],\n                },\n            ],\n        }],\n    };\n\n    let mut parser = Parser::new(input);\n    let actual = parser.parse();\n    assert_eq!(actual, expected);\n}\n```\n\nこれが通れば、parseメソッドは完成です。\n\n## 実装\n\nとりあえず簡易的に実装してみます。\n\nまずは、Parserのnewメソッドを実装します。これは、LexerからTokenを受け取って、Parserを作成します。\n\n```rust\nimpl Parser {\n    pub fn new(input: &str) -> Self {\n        let mut lexer = Lexer::new(input);\n        let tokens = lexer.tokenize();\n        let token_stream = tokens.into_iter().peekable();\n        Parser { token_stream }\n    }\n}\n```\n\n次に、Parserのparseメソッドを実装します。\n\n```rust\nimpl Parser {\n    pub fn parse(&mut self) -> Node {\n        let first_token = self.token_stream.peek();\n        let result = match first_token {\n            Some(Token::LBrace) => self.consume_object(),\n            Some(Token::LBracket) => self.consume_array(),\n            _ => Err("Unexpected the first token of input".to_string()),\n        };\n        match result {\n            Ok(value) => value,\n            Err(e) => panic!("{}", e),\n        }\n    }\n}\n```\n\nもうちょっといい書き方ができそうなのですが、とりあえずこれで。\nまず簡単なValidationを行っています。\n`{`か`[`で始まっているかを確認しています。これは、JSONのルートノードはObjectかArrayであることを意味しています。\n\n次に、`consume_object`か`consume_array`を呼び出しています。先ほどのValidationで、`{`か`[`で始まっていることを確認しているので、ここでは、それぞれのメソッドを呼び出すだけです。\n\n### Property Assignmentの解析(消費)\n\nProperty Assignmentの解析(消費)を実装します。\nObjectは内部的にKeyとValueのペアを持っています。これをProperty Assignmentと呼ぶことにしています。\nこのProperty Assignmentを複数持っているのがObjectと考えています。\n\n#### テスト\n\n```rust\n#[test]\nfn test_property_assignment() {\n    let input = r#""foo": 1"#;\n    let expected = SyntaxNode {\n        kind: SyntaxKind::PropertyAssignment,\n        children: vec![\n            SyntaxNode {\n                kind: SyntaxKind::Identifier("foo".to_string()),\n                children: vec![],\n            },\n            SyntaxNode {\n                kind: SyntaxKind::NumberLiteral(1.0),\n                children: vec![],\n            },\n        ],\n    };\n}\n```\n\n#### 実装\n\n```rust\nimpl Parser {\n    fn consume_property_assignment(&mut self) -> Result<Node, String> {\n        let property_name = match self.token_stream.peek() {\n            Some(Token::StringValue(s)) => s.clone(),\n            _ => return Err("Unexpected Identifier".to_string()),\n        };\n        self.token_stream.next();\n        self.token_stream.next();\n        match self.consume_value() {\n            Ok(value) => Ok(Node::new(\n                SyntaxKind::PropertyAssignment,\n                vec![\n                    Node::new(SyntaxKind::Identifier(property_name), vec![]),\n                    value,\n                ],\n            )),\n            Err(e) => Err(e),\n        }\n    }\n}\n```\n\nまず、`token_stream`からTokenを取り出しています。これは、Property Nameとなります。\n次に、`:`を読み飛ばしています。これは、Property NameとValueの間にある`:`を読み飛ばしています。\n最後に、Valueを読み込んでいます。\n\n他にもObjectやArrayの解析(消費)を実装する必要がありますが、ここでは省略します。\n\nこのように構文解析を実装してみました。\n\n# 派生\n\nこれらParserはCrateとしてパッケージ化して、他のプロジェクトで使えるようにします。\n\n## パッケージ呼び出し\n\n例えばformatterのCargo.tomlには以下のように記述します。\n\n```rust\n[package]\nname = "formatter"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]\njson-parser = { path = "../parser" }\n```\n\nこうすれば`crates/`フォルダにあるparserパッケージを呼び出すことができます。\nこうやって詳細に機能を切り出すことが容易にできるcrateのシステムは便利ですね。\n\nFormatterやCliなどの別のアプリケーション内でparserパッケージを呼び出してみます。\n例えばFormatterのmain.rsには以下のように記述します。\n\n```rust\nuse json_parser::{\n    node::{Node, SyntaxKind},\n    parse::Parser,\n};\n\nfn main() {\n    let input = r#"{\n    "foo": 1,\n    "bar": "baz"\n}"#;\n    let mut parser = Parser::new(input);\n    let node = parser.parse();\n    println!("{:#?}", node);\n}\n```\n\n今までparser/に書いてきた構文解析の資産を呼び出して別のアプリケーションで派生させることができそうですね。\n\n# まとめ\n\nFormatterやCliなどの別のアプリケーション化は実装が長いので省略しますがぜひソースコードを読んでみてください。\n\n学びたてor今回が初めてなことだらけで実装にこだわる時間もなかったので質が最悪ですが、講義の復習とRustの学習のいい機会になりました。\n\nここまで読んでくださりありがとうございました。\n',
    createdAt: '2022-01-02T12:30:00Z',
    description: '機械学習について初心者でも理解できるように、基本的な用語やアルゴリズムについて解説します。',
    id: '2',
    slug: 'learn-machine-learning',
    tags: ['機械学習', '人工知能'],
    title: '初心者でも分かる機械学習の入門',
    updatedAt: '2022-02-02T12:30:00Z',
  },
  {
    createdAt: '2022-01-03T08:00:00Z',
    description: 'リアクティブプログラミングにおける、ストリーミングデータや非同期処理の基礎的な考え方を解説します。',
    id: '3',
    slug: 'reactive-programming',
    tags: ['リアクティブプログラミング', '非同期処理'],
    title: 'リアクティブプログラミングの基本的な考え方',
    updatedAt: '2022-02-03T08:00:00Z',
  },
  {
    createdAt: '2022-01-04T10:15:00Z',
    description:
      'サーバレスアーキテクチャを利用するメリットやデメリットについて解説します。サーバレスアーキテクチャを採用することで、コスト削減やスケーラビリティの向上が期待できます。',
    id: '4',
    slug: 'serverless-architecture',
    tags: ['サーバレスアーキテクチャ', 'クラウド'],
    title: 'サーバレスアーキテクチャの利点と欠点',
    updatedAt: '2022-02-04T10:15:00Z',
  },
  {
    createdAt: '2022-01-05T16:45:00Z',
    description:
      'JavaScriptの基礎的な文法や、DOM操作、Ajax通信などについて解説します。Web開発において、JavaScriptは欠かせない言語です。',
    id: '5',
    slug: 'learn-javascript',
    tags: ['JavaScript', 'Web開発'],
    title: 'JavaScriptの基礎をマスターしよう',
    updatedAt: '2022-02-05T16:45:00Z',
  },
  {
    createdAt: '2022-01-06T14:00:00Z',
    description:
      'DevOps文化の導入方法について解説し、その効果についても考察します。DevOps文化の導入により、開発チームと運用チームのコミュニケーションが改善され、開発速度や品質の向上が期待できます。',
    id: '6',
    slug: 'devops',
    tags: ['DevOps', 'アジャイル開発'],
    title: 'DevOps文化の導入方法とその効果',
    updatedAt: '2022-02-06T14:00:00Z',
  },
  {
    createdAt: '2022-01-07T09:30:00Z',
    description:
      'Webアプリケーションのセキュリティ対策について、基本的な手法から実践的な方法まで解説します。Webアプリケーションのセキュリティ対策は、重要な課題です。',
    id: '7',
    slug: 'web-application-security',
    tags: ['セキュリティ', 'Webアプリケーション'],
    title: 'Webアプリケーションのセキュリティ対策について',
    updatedAt: '2022-02-07T09:30:00Z',
  },
  {
    createdAt: '2022-01-08T11:45:00Z',
    description:
      'データベースの基本的な概念や、データベース設計のポイントについて解説します。データベースは、情報を管理する上で欠かせない技術です。',
    id: '8',
    slug: 'database',
    tags: ['データベース', '情報管理'],
    title: 'データベースの基本と設計のポイント',
    updatedAt: '2022-02-08T11:45:00Z',
  },
  {
    createdAt: '2022-01-09T13:00:00Z',
    description:
      'クラウドコンピューティングの基本的な概念や、利用方法について解説します。クラウドコンピューティングを利用することで、インフラストラクチャの運用負荷を軽減できます。',
    id: '9',
    slug: 'cloud-computing',
    tags: ['クラウドコンピューティング', 'インフラストラクチャ'],
    title: 'クラウドコンピューティングの基本と利用方法',
    updatedAt: '2022-02-09T13:00:00Z',
  },
  {
    createdAt: '2022-01-10T15:30:00Z',
    description:
      'コードレビューの効果的な方法と、ツールについて解説します。コードレビューを行うことで、開発者のスキルアップや品質の向上が期待できます。',
    id: '10',
    slug: 'code-review',
    tags: ['コードレビュー', '開発者向け'],
    title: 'コードレビューの効果的な方法とツール',
    updatedAt: '2022-02-10T15:30:00Z',
  },
  {
    createdAt: '2022-01-11T17:45:00Z',
    description:
      '機械学習は、人工知能の分野の一部であり、コンピュータが人間と同じように学習することができるようにするための技術です。',
    id: '11',
    slug: 'introduction-to-machine-learning',
    tags: ['機械学習', '人工知能'],
    title: '機械学習の概要',
    updatedAt: '2022-02-11T17:45:00Z',
  },
  {
    createdAt: '2022-01-12T19:00:00Z',
    description:
      'Reactは、Facebookが開発したJavaScriptのライブラリであり、Webアプリケーションを構築するための人気の高いツールです。',
    id: '12',
    slug: 'getting-started-with-react',
    tags: ['React', 'JavaScript', 'Web開発'],
    title: 'Reactのはじめかた',
    updatedAt: '2022-02-12T19:00:00Z',
  },
  {
    createdAt: '2022-01-13T21:15:00Z',
    description: 'データ構造は、データを効率的に処理するための方法を提供する重要なコンピュータサイエンスの分野です。',
    id: '13',
    slug: 'the-basics-of-data-structures',
    tags: ['データ構造', 'アルゴリズム', 'コンピュータサイエンス'],
    title: 'データ構造の基本',
    updatedAt: '2022-02-13T21:15:00Z',
  },
  {
    createdAt: '2022-01-14T23:30:00Z',
    description:
      'Dockerは、コンテナ仮想化技術を使用してアプリケーションを実行するためのプラットフォームであり、今日のソフトウェア開発において不可欠なツールの1つです。',
    id: '14',
    slug: 'beginners-guide-to-docker',
    tags: ['Docker', 'コンテナ仮想化', 'DevOps'],
    title: 'Docker入門ガイド',
    updatedAt: '2022-02-14T23:30:00Z',
  },
  {
    createdAt: '2022-01-15T01:45:00Z',
    description:
      '人工知能は、ますます重要性を増し、私たちの生活のあらゆる側面に影響を与えるようになっています。この記事では、人工知能の将来について考察しています。',
    id: '15',
    slug: 'the-future-of-artificial-intelligence',
    tags: ['人工知能', '技術の未来'],
    title: '人工知能の未来',
    updatedAt: '2022-02-15T01:45:00Z',
  },
  {
    createdAt: '2022-01-16T04:00:00Z',
    description: 'プログラミングは芸術であるという見方がある。しかし、その芸術はどのようにして生まれるのか？',
    id: '16',
    slug: 'the-art-of-programming',
    tags: ['プログラミング', '芸術', '哲学'],
    title: 'プログラミングの芸術',
    updatedAt: '2022-02-16T04:00:00Z',
  },
  {
    createdAt: '2022-01-17T06:15:00Z',
    description: 'AIは人類の最大の発明の一つと言われる。その力を知れば、未来を切り開くことができる。',
    id: '17',
    slug: 'the-power-of-ai',
    tags: ['AI', '未来', '革命'],
    title: 'AIの力',
    updatedAt: '2022-02-17T06:15:00Z',
  },
  {
    createdAt: '2022-01-18T08:30:00Z',
    description: 'ReactはWeb開発において最も人気のあるフレームワークの一つだ。その本質とは何か？',
    id: '18',
    slug: 'the-essence-of-react',
    tags: ['React', 'フロントエンド', 'Web開発'],
    title: 'Reactの本質',
    updatedAt: '2022-02-18T08:30:00Z',
  },
  {
    createdAt: '2022-01-19T10:45:00Z',
    description: 'ブロックチェーンは今やビジネスの現場で欠かせない技術となっている。その理由を探る。',
    id: '19',
    slug: 'the-rise-of-blockchain',
    tags: ['ブロックチェーン', 'ビジネス', 'テクノロジー'],
    title: 'ブロックチェーンの台頭',
    updatedAt: '2022-02-19T10:45:00Z',
  },
  {
    createdAt: '2022-01-20T13:00:00Z',
    description: 'プログラミングにおいて、デザインパターンは美しく有用なものだ。その魅力を探る。',
    id: '20',
    slug: 'the-beauty-of-design-patterns',
    tags: ['デザインパターン', 'プログラミング', '美学'],
    title: 'デザインパターンの美',
    updatedAt: '2022-02-20T13:00:00Z',
  },
  {
    createdAt: '2022-01-21T15:15:00Z',
    description: 'JavaScriptはWeb開発の世界で最も重要なプログラミング言語の一つだ。その未来にはどんな約束があるのか？',
    id: '21',
    slug: 'the-promise-of-javascript',
    tags: ['JavaScript', 'フロントエンド', 'Web開発'],
    title: 'JavaScriptの約束',
    updatedAt: '2022-02-21T15:15:00Z',
  },
];
