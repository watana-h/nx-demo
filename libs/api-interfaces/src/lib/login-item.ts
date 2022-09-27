/**
 * @name 認証アカウント
 * @description 認証処理の情報を管理
*/
export interface LoginParam {
  user: string;
  password: string;
}

/**
 * @name AuthLoginRequestBody
 * @description HTTP REQUEST (authLogin)
*/
export interface AuthLoginRequestBody {
  param: LoginParam;
}
/**
 * @name AuthLoginResponseBody
 * @description HTTP RESPONSE (authLogin)
*/
export interface AuthLoginResponseBody {
  result: boolean;
}

