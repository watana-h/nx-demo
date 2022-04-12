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
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(予定)
  item?: UserItem[];
}
/**
 * @name GetUserItemResponseBody
 * @description HTTP RESPONSE (getUser)
*/
export interface GetUserItemResponseBody {
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(予定)
  item?: UserItem;
}
/**
 * @name DeleteUserItemResponseBody
 * @description HTTP RESPONSE (deleteUser)
*/
export interface DeleteUserItemResponseBody {
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(予定)
}
/**
 * @name AppendUserItemResponseBody
 * @description HTTP RESPONSE (appendUser)
*/
export interface AppendUserItemResponseBody {
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(予定)
}
/**
 * @name UpdateUserItemResponseBody
 * @description HTTP RESPONSE (updateUser)
*/
export interface UpdateUserItemResponseBody {
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(予定)
}





