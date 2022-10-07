import { Injectable } from '@nestjs/common';
import { AuthLoginRequestBody, AuthLoginResponseBody } from '@nx-demo/api-interfaces';

@Injectable()
export class LoginService {

  constructor() {
    // 何もしない
  }

  /**
   * @name authLogin
   * @description 認証処理
   */
  authLogin(body: AuthLoginRequestBody) : AuthLoginResponseBody {
    console.log('authLogin(): user=', body.param.user);
    let res: AuthLoginResponseBody;

    if (body.param.user === body.param.password) {
      console.log('認証NG');
      res = { result: false} ;
    } else {
      console.log('password=', body.param.password);
      res = { result: true} ;
    }
    return res;
  }

}
