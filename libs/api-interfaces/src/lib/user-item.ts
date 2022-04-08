/**
 * @name ユーザ情報
 * @description 本システムの利用ユーザ情報を管理
*/
export interface UserItem {
  id: string;          // 識別番号
  company: string;     // 会社名
  email: string;
  telephone: string;
  address: string;
  account: string;
  password: string;
}
// export class UserItem {
//   hoge: string;
//   
//   constructor() {
//     hoge = "";
//   }  
// }


