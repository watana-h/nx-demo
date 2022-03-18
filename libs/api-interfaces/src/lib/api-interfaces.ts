/* ユーザ情報項目 */
export interface UserItem {
  company: string;
  email: string;
  telephone: string;
  address: string;
  id: string;
  account: string;
  password: string;
}

/* class でも良い？ *
export class UserItem {
  company: string;
  email: string;
  telephone: string;
  address: string;

  constructor() {
    this.company = "";
    this.email = "";
    this.telephone = "";
    this.address = "";
  }
}
*****/

/* 雛形で生成されたので不要 *
export interface Message {
  message: string;
}
*****/
