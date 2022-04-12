/**
 * @name ユーザ情報
 * @description 本システムの利用ユーザ情報を管理
*/
export interface UserItem {
  id?: string;          // 識別番号
  company: string;      // 会社名
  email: string;
  telephone: string;
  address?: string;
  account: string;
  password: string;
}


/**
 * @name GetUserItemArrayResponseBody
 * @description HTTP RESPONSE (getUsers)
*/
export interface GetUserItemArrayResponseBody {
  count: number;          // 件数
  item?: UserItem[];
}
/**
 * @name GetUserItemResponseBody
 * @description HTTP RESPONSE (getUser)
*/
export interface GetUserItemResponseBody {
  count: number;          // 件数
  item?: UserItem;
}
