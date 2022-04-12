/**
 * @name users.service
 * @description ユーザ情報をバックエンドから取得
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';

import { UserItem,
         GetUserItemArrayResponseBody,
         GetUserItemResponseBody,
         DeleteUserItemResponseBody,
         AppendUserItemResponseBody,
         UpdateUserItemResponseBody } from '@nx-demo/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // users: UserItem[] = [];

  constructor(private http: HttpClient) {}

  /**
   * @name getUsers
   * @description 一覧取得
   * @returns GetUserItemArrayResponseBody
   */
  getUsers(): Observable<GetUserItemArrayResponseBody> {
    return this.http.get<GetUserItemArrayResponseBody>('/api/users');
  }

  /**
   * @name getUser
   * @description 対象idの情報取得
   * @params id
   * @returns GetUserItemResponseBody
   */
  getUser(id: string): Observable<GetUserItemResponseBody> {
    return this.http.get<GetUserItemResponseBody>(`/api/users/${id}`);
  }

  /**
   * @name deleteUser
   * @description 対象idの情報削除
   * @params id
   * @returns DeleteUserItemResponseBody
   */
  deleteUser(id: string): Observable<DeleteUserItemResponseBody> {
    return this.http.delete<DeleteUserItemResponseBody>(`/api/users/${id}`);
  }

  /**
   * @name appendUser
   * @description 情報追加
   * @params UserItem
   * @returns AppendUserItemResponseBody
   */
//appendUser(user: UserItem): Observable<AppendUserItemResponseBody> {
//  return this.http.post<AppendUserItemResponseBody>('/api/users', user);
//}

  /**
   * @name updateUser
   * @description 情報更新
   * @params UserItem
   * @returns UpdateUserItemResponseBody
   */
//updateUser(user: UserItem): Observable<UpdateUserItemResponseBody> {
//  return this.http.post<UpdateUserItemResponseBody>('/api/users/${user.id}', user);
//}

}
