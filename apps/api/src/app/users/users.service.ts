import { Injectable } from '@nestjs/common';
import { UserItem, 
         GetUserItemArrayResponseBody,
         GetUserItemResponseBody,
         DeleteUserItemResponseBody,
         AppendUserItemResponseBody,
         UpdateUserItemResponseBody } from '@nx-demo/api-interfaces';

import { join } from 'path';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify';



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
    console.log('loadUsers:file=', FILE);

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
       && record['password'] != undefined
       && record['deleted'] != undefined) {
          // console.log('record match');
          this.users.push(record);
      }
    }
  }

  /**
   * @name saveUsers
   * @description users を CSV に書き出す
   */
  saveUsers() { 
    const FILE = join(resolve(), 'data/UserItemList.csv');
    console.log('saveUsers:file=', FILE);

    if (this.users) {
      stringify(this.users,
        { header: true, quoted_string: true}, 
        function(err, output) {
          writeFileSync(FILE, output);
      });
    }
  }

  /**
   * @name getUsers
   * @description 一覧取得
   * @returns GetUserItemArrayResponseBody
   */
  getUsers(): GetUserItemArrayResponseBody {
    this.loadUsers();
    const allcount = (this.users) ? this.users.length : 'empty';
    console.log('getUsers:件数=', allcount);

    if (allcount > 0) {
      const deleted = this.users.filter(function(item) {
        return item.deleted == "1";
      });
      console.log('削除件数=', (deleted) ? deleted.length : 'empty');
    }

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
    this.loadUsers();

    const index = this.users.findIndex(item => item.id == id);
    if (index >= 0) {
      this.users[index].deleted = "1";
      this.saveUsers();
    }

    const res: UpdateUserItemResponseBody = {status: index >= 0 ? 0 : 1};
    return res;
  }

}
