## webpack-template

webpack 5 + EJS + TypeScript + Sass スターターキット

- ejs -> html
- ts -> js
- scss -> css

### ディレクトリ

| ディレクトリ | 内容         |
| ------------ | ------------ |
| src          | 開発用コード |
| public       | 出力コード   |

### 利用アーキテクチャ・バージョン

node: v18.19.0
Yarn: v4.0.2

### 各種コマンド

#### パッケージインストール

```
yarn install
```

上記コマンドで/node_modules/のインストール

#### 監視

```
yarn watch
```

上記コマンドで仮ビルドを実行  
/public/ には書き出されないので注意  
ローカルサーバーが立ち上がり確認可能（デフォルトでは localhost:8080）

#### 開発環境用ファイル生成

デベロップ用のファイル一式を生成

```
yarn dev
```

上記コマンドで /public/ ディレクトリに吐きだれる

#### 公開環境用ファイル生成

```
yarn build
```

上記コマンドで /public/ ディレクトリに吐きだれる
<small>※ 必ず納品時にこのコマンドを実行してください。</small>

#### キャッシュクリア

```
yarn clear-cache
```

監視時にエラーが出た場合に実行するといい具合になる  
もしくは /public/ を削除するといい具合になる

### ディレクトリ構成

```
├─ node_modules/
│  └─ パッケージ各種
│
├─ public/ (ビルド後、納品ファイルがここに生成される)
│  ├─ assets/
│  │  ├─ css/
│  │  ├─ images/
│  │  └─ js/
│  └─ index.html 他、ファイル、ディレクトリ群...
│
├─ src/（ソース）
│  ├─ ejs/
│  │  ├─ _templates/
│  │  └─ index.ejs
│  ├─ images/
│  ├─ js/
│  │  ├─ component/
│  │  ├─ home.js
│  │  └─ main.js
│  └─ scss/
│      ├─ foundation/
│      ├─ global/
│      ├─ layout/
│      ├─ object/
│      │  ├─ component/
│      │  ├─ project/
│      │  └─ utility/
│      ├─ page/
│      ├─ home.scss
│      └─ main.scss
│
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc.js
├─ .yarnrc.yml
├─ package.json
├─ README.md
├─ tsconfig.json
├─ webpack.config.js
└─ yarn.lock
```

### 再インストール

`yarn` まわりでエラーが出た場合は node_modules の再インストールをしてください。

```
$ rm -rf node_module
$ yarn install
```

## 注意事項 <!-- Reference -->

## 参考 <!-- Reference -->
