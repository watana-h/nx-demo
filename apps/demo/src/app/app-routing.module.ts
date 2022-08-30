import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './shared/error/error.component';
import { ErrorItem, ErrorTarget } from '@nx-demo/api-interfaces';

const errNotFound: ErrorItem = {
  errorCode: 404,
  errorTarget: ErrorTarget.frontend
}

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },          // ベースURLのみ → login にリダイレクト
  { path: 'login', component: LoginComponent },                  // ログイン画面
  { path: 'users/user-list', component: UserListComponent },     // 会社情報一覧画面
  { path: 'users/user-edit', component: UserEditComponent },     // 会社情報追加画面
  { path: 'users/user-edit/:id', component: UserEditComponent }, // 会社情報編集画面
  { path: 'error', component: ErrorComponent },                  // エラー終了画面
  { path: '**', component: ErrorComponent, data: errNotFound }   // その他 → エラー終了画面
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
