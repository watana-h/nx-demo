/**
 * @name login.service
 * @description 認証処理
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthLoginRequestBody, AuthLoginResponseBody } from '@nx-demo/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    // 何もしない
  }

  /**
   * @name authLogin
   * @description 認証処理
   */
  authLogin(body: AuthLoginRequestBody): Observable<AuthLoginResponseBody> {
    return this.http.post<AuthLoginResponseBody>('/api/login/auth', body);
  }

}
