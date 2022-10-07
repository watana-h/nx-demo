/**
 * @name users.service
 * @description ユーザ情報をバックエンドから取得
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetUserItemArrayResponseBody,
         GetUserItemResponseBody,
         DeleteUserItemResponseBody,
         AppendUserItemRequestBody,
         AppendUserItemResponseBody,
         UpdateUserItemRequestBody,
         UpdateUserItemResponseBody } from '@nx-demo/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
    // 何もしない
  }

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
   * @name updateUser
   * @description 対象idの情報更新
   * @params  UpdataUserItemRequestBody
   * @returns UpdateUserItemResponseBody
   */
  updateUser(body: UpdateUserItemRequestBody): Observable<UpdateUserItemResponseBody> {
    return this.http.put<UpdateUserItemResponseBody>('/api/users/update', body);
  }

  /**
   * @name appendUser
   * @description 情報追加
   * @params  AppendUserItemRequestBody
   * @returns AppendUserItemResponseBody
   */
  appendUser(body: AppendUserItemRequestBody): Observable<AppendUserItemResponseBody> {
    return this.http.post<AppendUserItemResponseBody>('/api/users/append', body);
  }

}
