import { Injectable } from '@nestjs/common';
import { UserItem, 
         GetUserItemArrayResponseBody,
         GetUserItemResponseBody,
         DeleteUserItemResponseBody,
         AppendUserItemResponseBody,
         UpdateUserItemResponseBody } from '@nx-demo/api-interfaces';

import { join } from 'path';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync'


@Injectable()
export class UsersService {
  private users: UserItem[] = [];

  constructor() {}

  /**
   * @name loadUsers
   * @description CSVファイルを users に読み込む
   */
  loadUsers() { 
    const FILE = join(resolve(), 'data/UserItemList.csv');
    console.log('対象ファイルのパス:', FILE);

    // CSVロード&解析
    const data = readFileSync(FILE);
    const records = parse(data, {columns: true, trim: true});

    // 配列(users)を全クリア
    this.users.length = 0;

    // データ確認して配列(users)に追加
    for (const record of records) {
      // console.log(record);

      if( record['id'] != undefined
       && record['company'] != undefined
       && record['email'] != undefined
       && record['telephone'] != undefined
       && record['address'] != undefined
       && record['account'] != undefined
       && record['password'] != undefined) {
          // console.log('record match');
          this.users.push(record);
      }
    }
  }

  /**
   * @name getUsers
   * @description 一覧取得
   * @returns GetUserItemArrayResponseBody
   */
  getUsers(): GetUserItemArrayResponseBody {
    this.loadUsers();
    console.log('getUsers:件数=', (this.users) ? this.users.length : 'empty');

    const res: GetUserItemArrayResponseBody = {status: 0,
                                               item:  this.users};
    return res;
  }

  /**
   * @name getUser
   * @description 対象idの情報取得
   * @params id
   * @returns GetUserItemResponseBody
   */
  getUser(id: string): GetUserItemResponseBody {
    console.log('getUser:id=', id);
    this.loadUsers();

    var result = this.users.find(value => value.id == id );
    const res: GetUserItemResponseBody = {status: (result) ? 0 : 1, 
                                          item: result};
    return res;
  }

  /**
   * @name deleteUser
   * @description 対象idの情報削除
   * @params id
   * @returns DeleteUserItemResponseBody
   */
  deleteUser(id: string): DeleteUserItemResponseBody {
    console.log('deleteUser:id=', id);

    const res: DeleteUserItemResponseBody = {status: 0};
    return res;
  }

  /**
   * @name appendUser
   * @description 情報追加
   * @params UserItem
   * @returns AppendUserItemResponseBody
   */
  appendUser(user: UserItem): DeleteUserItemResponseBody {
    console.log('appendUser:company=', user.company);

    const res: AppendUserItemResponseBody = {status: 0};
    return res;
  }

  /**
   * @name updateUser
   * @description 情報更新
   * @params UserItem
   * @returns UpdateUserItemResponseBody
   */

  updateUser(user: UserItem): UpdateUserItemResponseBody {
    console.log('updateUser:id=', user.id);

    const res: UpdateUserItemResponseBody = {status: 0};
    return res;
  }

}
