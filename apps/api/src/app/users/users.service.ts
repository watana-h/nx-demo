import { Injectable } from '@nestjs/common';
import { UserItem } from '@nx-demo/api-interfaces';

import { join } from 'path';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync'

/*** CSVから取得に変更 ***
const UserItemList: UserItem[] = [
  { id: "0001",
    company: "札幌生魚店", email: "pn-060-8588@example.com", telephone: "011-231-4111", 
    address: "北海道札幌市中央区北3条西6丁目",  
    account: "pn-060-8588", password: "011-231-4111" },
  { id: "0002",
    company: "青森生花店", email: "pn-030-8570@example.com", telephone: "017-722-1111", 
    address: "青森県青森市長島一丁目1-1", 
    account: "pn-030-8570", password: "017-722-1111" },
  { id: "0003",
    company: "盛岡青果屋", email: "pn-020-8570@example.com", telephone: "019-651-3111", 
    address: "岩手県盛岡市内丸10番1号", 
    account: "pn-020-8570", password: "019-651-3111" },
  { id: "0004",
    company: "仙台精肉店", email: "pn-980-8570@example.com", telephone: "022-211-2111", 
    address: "宮城県仙台市青葉区本町3丁目8番1号",
    account: "pn-980-8570", password: "022-211-2111" },
  { id: "0005",
    company: "秋田豆腐屋", email: "pn-010-8570@example.com", telephone: "018-860-1111",
    address: "秋田県秋田市山王四丁目１－１", 
    account: "pn-010-8570", password: "018-860-1111" },
];
***/

@Injectable()
export class UsersService {
  private users: UserItem[] = [];

  constructor() {}

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

  getUsers(): UserItem[] {
  // return UserItemList;

    this.loadUsers();
    return this.users;
  }

  getUser(id: string): UserItem {
    console.log('getUser:id=', id);
    this.loadUsers();
    return this.users.find(value => value.id == id )    
  }


}
