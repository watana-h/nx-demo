import { Injectable } from '@nestjs/common';
import { UserItem, 
         GetUserItemArrayResponseBody,
         GetUserItemResponseBody,
         DeleteUserItemResponseBody,
         AppendUserItemRequestBody,
         AppendUserItemResponseBody,
         UpdateUserItemRequestBody,
         UpdateUserItemResponseBody } from '@nx-demo/api-interfaces';

import { join } from 'path';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify';


@Injectable()
export class UsersService {
  private users: UserItem[] = [];

  constructor() { }

  /**
   * @name loadUsers
   * @description CSVファイルを users に読み込む
   */
  loadUsers() { 
    const csvFile: string = join(resolve(), 'data/UserItemList.csv');
//  console.log('loadUsers:file=', csvFile);

    // CSVロード&解析
    const data = readFileSync(csvFile);
    const records = parse(data, {columns: true, trim: true});

    // 配列(users)を全クリア
    this.users.length = 0;

    // データ確認して配列(users)に追加
    for (const record of records) {
      // console.log(record);

      if( typeof record['id'] !== "undefined"
       && typeof record['company'] !== "undefined"
       && typeof record['email'] !== "undefined"
       && typeof record['telephone'] !== "undefined"
       && typeof record['address'] !== "undefined"
       && typeof record['account'] !== "undefined"
       && typeof record['password'] !== "undefined"
       && typeof record['deleted'] !== "undefined") {
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
    const csvFile: string = join(resolve(), 'data/UserItemList.csv');
//  console.log('saveUsers:file=', csvFile);

    if (this.users) {
      stringify(this.users,
        { header: true, quoted_string: true}, 
        function(err, output) {
          writeFileSync(csvFile, output);
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
    const allcount: number = (this.users) ? this.users.length : 0;
    console.log('getUsers:件数=', allcount);

    if (allcount > 0) {
      const deleted = this.users.filter(function(item) {
        return item.deleted == "1";
      });
      console.log('削除件数=', (deleted) ? deleted.length : 0);
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

    const result: UserItem = this.users.find(value => value.id == id );
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

    const index: number = this.users.findIndex(item => item.id == id);
    if (index >= 0) {
      this.users[index].deleted = "1";
      this.saveUsers();
    }

    const res: DeleteUserItemResponseBody = {status: index >= 0 ? 0 : 1};
    return res;
  }

  /**
   * @name updateUser
   * @description 対象idの情報更新
   * @params  UpdateUserItemRequestBody
   * @returns UpdateUserItemResponseBody
   */
  updateUser(body: UpdateUserItemRequestBody): UpdateUserItemResponseBody {
    console.log('updateUser:id=', body.item.id);
    this.loadUsers();

    const index: number = this.users.findIndex(item => item.id == body.item.id);
    if (index >= 0) {
      this.users[index].company   = body.item.company;
      this.users[index].email     = body.item.email;
      this.users[index].telephone = body.item.telephone;
      this.users[index].address   = body.item.address;
      this.users[index].account   = body.item.account;
      this.users[index].password  = body.item.password;
      this.saveUsers();
    }

    const res: UpdateUserItemResponseBody = {status: index >= 0 ? 0 : 1};
    return res;
  }

  /**
   * @name appendUser
   * @description 情報追加
   * @params  AppendUserItemRequestBody
   * @returns AppendUserItemResponseBody
   */
  appendUser(body: AppendUserItemRequestBody): AppendUserItemResponseBody {
    // 現時点 id の最大値
    const initialVals: number = 0;
    const maxVals: number = this.users.reduce(
      (previousValue, currentItem) => Math.max(previousValue, Number(currentItem.id)), initialVals
    )

    // ゼロパディング文字列
    const newId: string = ('0000' + (maxVals + 1)).slice(-4);
    console.log('appendUser:id=', newId);

    // 追加
    const newItem : UserItem = 
	{id: newId, 
         company: body.item.company,
         email: body.item.email, 
         telephone: body.item.telephone,
         address: body.item.address, 
         account: body.item.account,
         password: body.item.password, 
         deleted: "0" };
    this.users.push(newItem);
    this.saveUsers();

    const res: AppendUserItemResponseBody = {status: 0};
    return res;
  }

}
