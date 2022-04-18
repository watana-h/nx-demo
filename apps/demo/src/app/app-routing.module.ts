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
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'users/user-list', component: UserListComponent },
  { path: 'users/user-edit', component: UserEditComponent },     // 追加
  { path: 'users/user-edit/:id', component: UserEditComponent }, // 更新
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent, data: errNotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
