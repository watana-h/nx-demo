# nx-demo
Nx (Angular-NestJS monorepo) サンプル

<img src="https://github.com/watana-h/nx-demo/blob/main/doc/login.png" width="600">

<img src="https://github.com/watana-h/nx-demo/blob/main/doc/user-list.png" width="600">

<img src="https://github.com/watana-h/nx-demo/blob/main/doc/user-edit.png" width="600">

<img src="https://github.com/watana-h/nx-demo/blob/main/doc/confirm.png" width="600">

<img src="https://github.com/watana-h/nx-demo/blob/main/doc/error.png" width="600">


### 概要
Angular-NestJS お勉強で作成したサンプルアプリです。

- バックエンド
  - フロントエンドからのリクエストを受けて CSV 管理されている情報一覧をレスポンスする
- フロントエンド
  - ワイヤーフレーム
    - Header, Main Content, Footer 構成
  - 画面構成
    - ログイン画面
    - アカウント一覧
    - アカウント編集
    - エラー表示画面
  - 画面遷移
    - ログイン画面で[ログイン]→アカウント一覧
    - アカウント一覧画面の一覧[左列リンク]→アカウント編集
    - アカウント編集画面[キャンセル]→アカウント一覧
    - Header右端[ログアウト]→ログイン画面

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
 │  │     │  │  ├ error         [ エラー表示画面 ]  
 │  │     │  │  ├ footer  
 │  │     │  │  ├ header  
 │  │     │  │  └ interceptors
 │  │     │  ├ login           ［ ログイン画面 ］
 │  │     │  └ users
 │  │     │      ├ user-edit   ［ 編集画面 ］
 │  │     │      └ user-list   ［ 一覧画面 ］
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
$ npx nx generate component   shared/header                --project=demo --module=app
$ npx nx generate component   shared/footer                --project=demo --module=app
$ npx nx generate service     shared/header/header         --flat --project=demo
$ npx nx generate service     shared/footer/footer         --flat --project=demo
$ npx nx generate component   shared/dialog/alert-dialog   --flat --project=demo --module=app
$ npx nx generate component   shared/dialog/confirm-dialog --flat --project=demo --module=app
$ npx nx generate component   shared/error                 --project=demo --module=app
$ npx nx generate interceptor shared/interceptors/HttpError --flat --project=demo
$ npx nx generate component   login           --project=demo --module=app
$ npx nx generate component   users/user-edit --project=demo --module=app
$ npx nx generate component   users/user-list --project=demo --module=app
$ npx nx generate service     users/users     --project=demo
// [TODO] 生成された各種ファイルを編集

# ---------------------------------------------------------
# (4) NestJS (apps/api)
# ---------------------------------------------------------
# (4)-1. 雛形で自動生成された不要ファイル削除
$ rm -f apps/api/src/app/app.controller.spec.ts
$ rm -f apps/api/src/app/app.controller.ts
$ rm -f apps/api/src/app/app.service.spec.ts
$ rm -f apps/api/src/app/app.service.ts

# (4)-2. CSV操作導入
$ npm install csv-parse
$ npm install csv-stringify

# (4)-3. バックエンドアプリ構築
$ npx nx generate @nrwl/nest:module     app/users --project=api
$ npx nx generate @nrwl/nest:controller app/users --project=api
$ npx nx generate @nrwl/nest:service    app/users --project=api
// [TODO] 生成された各種ファイルを編集

# ---------------------------------------------------------
# (5) libs/api-interfaces
# ---------------------------------------------------------
# (5)-1. 雛形で自動生成された不要ファイル削除
$ rm -f libs/api-interfaces/src/lib/api-interfaces.ts

# (5)-2. ファイル追加
$ touch libs/api-interfaces/src/lib/user-item.ts
$ touch libs/api-interfaces/src/lib/login-item.ts
$ touch libs/api-interfaces/src/lib/error-item.ts
// [TODO] 
//   生成された各種ファイルを編集
//   libs/api-interfaces/src/index.ts を修正

# ---------------------------------------------------------
# (6) CSVデータ
# ---------------------------------------------------------
$ mkdir data
// [TODO] data/UserItemList.csv を用意
```

## 参考情報
- 技術情報
  - <a href="https://nanbu.marune205.net/2021/12/angular-login-page.html">Angularでログインページを作成する</a>
  - <a href="https://satolabo.net/2019/12/14/angular-typescript-sleep/">Angular8のtypescriptでsleep処理を実装する</a>
  - <a href="https://note.com/haru_hira/n/nbb25eadadee9">Angularでheaderコンポーネントを1部のモジュールで非表示にしたい時</a>
  - <a href="https://stackoverflow.com/questions/47257167/dynamically-change-header-string-in-angular-2">Dynamically change header string in angular 2</a>
  - <a href="https://code-maze.com/angular-material-table/">Angular Material Table, Filtering, Sorting, Paging</a>
  - <a href="https://www.freakyjolly.com/angular-material-datatable-pagination-sorting-filter-and-fixed-columns-tutorial/">Angular Material 9|8 DataTable, Pagination, Sorting, Filter and Fixed Columns Tutorial</a>
  - <a href="https://www.mariokandut.com/how-to-translate-matpaginator-angular/">How to translate MatPaginator</a>
  - <a href="https://stackabuse.com/reading-and-writing-csv-files-in-nodejs-with-node-csv/">Reading and Writing CSV Files in Node.js with node-csv</a>

- アイコン、favicon生成
  - <a href="https://www.iconfinder.com/iconsets/developerkit">Developer Kit icon pack</a>
  - <a href="http://www.favicon.pro/">favicon.pro - favicon生成</a>
