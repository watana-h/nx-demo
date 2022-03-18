# nx-demo
Nx (Angular-NestJS monorepo) サンプル

<img src="https://github.com/watana-h/nx-demo/blob/main/doc/user-list.png" width="600">

<img src="https://github.com/watana-h/nx-demo/blob/main/doc/user-edit.png" width="600">

### 概要
Angular-NestJS お勉強で作成したサンプルアプリです。

- バックエンド
  - フロントエンドからのリクエストを受けて CSV 管理されている情報一覧をレスポンスする
- フロントエンド
  - Header, Main Content, Footer 構成
  - 一覧表示時にバックエンドから情報一覧を取得してテーブル表示
  - Angular Material - Table Component、列ヘッダーでのソート 
  - 一覧から対象リンクで編集画面に遷移

## 実行手順
### 事前準備

- Node.js 14.15.5
  - Angular 12.2.16
  - NestJS 8.2.0
  - nx 13.8.1
  - create-nx-workspace 13.8.1
- Visual Studio Code 1.64.2
  - Japanese Language Pack for Visual Studio Code v1.64.7
  - Angular Language Service v13.2.5
  - Angular Snippets (Version 12) v12.0.0
  - Prettier - Code formatter v9.3.0
  - Path Intellisense v2.8.0
  - Material Icon Theme v4.14.1
  - Nx Console v17.14.1

### 取得
```
$ git clone https://github.com/watana-h/nx-demo.git
$ cd nx-demo
$ npm ci
```
### 実行 - ターミナル利用
ひとつのターミナルで api (NestJS) サービスを提供
```
$ cd nx-demo
$ ng serve api
```

別ターミナルで demo (Angular) サービスを提供してブラウザを起動
```
$ cd nx-demo
$ ng serve demo --host 0.0.0.0 --open
```

### 実行 - VSCode利用
- Nx Console - Serve で `api` を選択して「Run」実行
- Nx Console - Serve で `demo` を選択、`open - Opens the url in default browser.` をチェック後、「Run」実行  

## フォルダ構成

```
nx-demo
 ├ apps 
 │  ├ api            ［ バックエンド：NestJS ］
 │  │  └ src 
 │  │     ├ app  
 │  │     │  └ users
 │  │     ├ assets  
 │  │     └ environments 
 │  ├ demo           ［ フロントエンド：Angular ］
 │  │  └ src 
 │  │     ├ app  
 │  │     │  ├ shared  
 │  │     │  │  ├ dialog
 │  │     │  │  ├ footer  
 │  │     │  │  └ header
 │  │     │  └ users
 │  │     │      ├ user-edit ［ 編集画面 ］
 │  │     │      └ user-list ［ 一覧画面 ］
 │  │     ├ assets  
 │  │     └ environments 
 │  └ demo-e2e
 ├ data               ［ 一覧表示用 CSV データ格納 ］
 ├ doc                ［ 画面キャプチャ ］
 ├ libs              
 │  └ api-interfaces ［ フロントエンド-バックエンド共通I/F定義 ］
 │      └ src
 │         └ lib 
 └ tools
```

## 作成手順メモ
```
# ---------------------------------------------------------
# (1) Workspace 生成
# ---------------------------------------------------------
$ npx create-nx-workspace nx-demo
$ cd nx-demo

# ---------------------------------------------------------
# (2) フロントエンド-バックエンド共通I/F定義
# ---------------------------------------------------------
// [TODO] libs/api-interfaces/src/lib/api-interfaces.ts を修正


# ---------------------------------------------------------
# (3) Anguar (apps/demo)
# ---------------------------------------------------------
# (3)-1. Angular Material 導入
$ npm install @angular/material@12
$ npx nx generate @angular/material:ng-add --project=demo
✔ Choose a prebuilt theme name, or "custom" for a custom theme: · indigo-pink
✔ Set up global Angular Material typography styles? (y/N) · false
✔ Set up browser animations for Angular Material? (Y/n) · true

$ npx nx generate module shared/material --flat --project=demo --module=app
// [TODO] apps/demo/src/app/shared/material.module.ts を修正

# (3)-2. Angular Flex-Layout 導入
$ npm install @angular/flex-layout@12.0.0-beta.35
// [TODO] schematics がサポートされていないので下記は実行不可
//        $ npx nx generate @angular/flex-layout:ng-add --project=demo
//        apps/demo/src/app/app.module.ts を手で修正

# (3)-3. フロントエンドアプリ構築
$ npx nx generate component shared/header   --project=demo --module=app
$ npx nx generate component shared/footer   --project=demo --module=app
$ npx nx generate component shared/dialog/alert-dialog --flat --project=demo --module=app
$ npx nx generate component users/user-edit --project=demo --module=app
$ npx nx generate component users/user-list --project=demo --module=app
$ npx nx generate service   users/users     --project=demo
// [TODO] 生成された各種ファイルを編集

# ---------------------------------------------------------
# (4) NestJS (apps/api)
# ---------------------------------------------------------
# (4)-1. 雛形で自動生成された不要ファイル削除
$ rm -f apps/api/src/app/app.controller.spec.ts
$ rm -f apps/api/src/app/app.controller.ts
$ rm -f apps/api/src/app/app.service.spec.ts
$ rm -f apps/api/src/app/app.service.ts

# (4)-2. CSVパーサー導入
$ npm install csv-parse

# (4)-3. バックエンドアプリ構築
$ npx nx generate @nrwl/nest:module     app/users --project=api
$ npx nx generate @nrwl/nest:controller app/users --project=api
$ npx nx generate @nrwl/nest:service    app/users --project=api
// [TODO] 生成された各種ファイルを編集

# ---------------------------------------------------------
# (5) CSVデータ
# ---------------------------------------------------------
$ mkdir data
// [TODO] data/UserItemList.csv を用意
```


