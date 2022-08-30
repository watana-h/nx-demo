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
  deleted: string;      // "1":deleted
}


/**
 * @name GetUserItemArrayResponseBody
 * @description HTTP RESPONSE (getUsers)
*/
export interface GetUserItemArrayResponseBody {
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(省略可)
  item?: UserItem[];
}
/**
 * @name GetUserItemResponseBody
 * @description HTTP RESPONSE (getUser)
*/
export interface GetUserItemResponseBody {
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(省略可)
  item?: UserItem;
}
/**
 * @name DeleteUserItemResponseBody
 * @description HTTP RESPONSE (deleteUser)
*/
export interface DeleteUserItemResponseBody {
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(省略可)
}
/**
 * @name AppendUserItemRequestBody
 * @description HTTP REQUEST (appendUser)
*/
export interface AppendUserItemRequestBody {
  item: UserItem;         // item.id バックエンドで自動発番
}
/**
 * @name AppendUserItemResponseBody
 * @description HTTP RESPONSE (appendUser)
*/
export interface AppendUserItemResponseBody {
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(省略可)
}
/**
 * @name UpdateUserItemRequestBody
 * @description HTTP REQUEST (updateUser)
*/
export interface UpdateUserItemRequestBody {
  item: UserItem;         // item.id をキーとして更新
}
/**
 * @name UpdateUserItemResponseBody
 * @description HTTP RESPONSE (updateUser)
*/
export interface UpdateUserItemResponseBody {
  status: number;         // 0:正常, 0以外はエラーコード(予定)
  errmsg?: string;        // エラーメッセージ(省略可)
}


