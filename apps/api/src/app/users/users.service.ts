import { Injectable } from '@nestjs/common';
import { UserItem, 
         GetUserItemArrayResponseBody,
         GetUserItemResponseBody } from '@nx-demo/api-interfaces';

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
    console.log('件数:', this.users.length);
  }

  /**
   * @name getUsers
   * @description 一覧取得
   * @returns users
   */
  getUsers(): GetUserItemArrayResponseBody {
    this.loadUsers();

    const res: GetUserItemArrayResponseBody = {count: this.users.length,
                                               item:  this.users};
    return res;

//  return this.users;
  }

  /**
   * @name getUser
   * @description 対象idの情報取得
   * @params id
   * @returns users
   */
  getUser(id: string): GetUserItemResponseBody {
    console.log('getUser:id=', id);
    this.loadUsers();

    var result = this.users.find(value => value.id == id );
    const res: GetUserItemResponseBody = {count: (result) ? 1: 0, 
                                          item: result};
    return res;

//  return this.users.find(value => value.id == id )    
  }


}
