/**
 * @name users.service
 * @description ユーザ情報をバックエンドから取得
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';

import { UserItem,
         GetUserItemArrayResponseBody,
         GetUserItemResponseBody } from '@nx-demo/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // users: UserItem[] = [];

  constructor(private http: HttpClient) {}

  /**
   * @name getUsers
   * @description 一覧取得
   * @returns users
   */
  getUsers(): Observable<GetUserItemArrayResponseBody> {
    return this.http.get<GetUserItemArrayResponseBody>('/api/users');
  }


  /**
   * @name getUser
   * @description 対象idの情報取得
   * @params id
   * @returns users
   */
  getUser(id: string): Observable<GetUserItemResponseBody> {
    return this.http.get<GetUserItemResponseBody>(`/api/users/${id}`);
  }

/***
  setUser(user: UserItem): Observable<UserItem> {
    return this.http.post<UserItem>('/api/users', user);
  }

  updateUser(user: UserItem): Observable<UserItem> {
    return this.http.post<UserItem>('/api/users/${user.company}', user);
  }

  deleteUser(user: UserItem): Observable<UserItem> {
    return this.http.delete<UserItem>('/api/users/${user.company}');
  }
***/

}
