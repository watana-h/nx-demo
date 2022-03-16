import { Injectable } from '@nestjs/common';
import { UserItem } from '@nx-demo/api-interfaces';

import { join } from 'path';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync'

/*** CSVから取得に変更 ***
const UserItemList: UserItem[] = [
  { company: "札幌生魚店", email: "pn-060-8588@example.com", telephone: "011-231-4111", address: "北海道札幌市中央区北3条西6丁目" },
  { company: "青森生花店", email: "pn-030-8570@example.com", telephone: "017-722-1111", address: "青森県青森市長島一丁目1-1" },
  { company: "盛岡青果屋", email: "pn-020-8570@example.com", telephone: "019-651-3111", address: "岩手県盛岡市内丸10番1号" },
  { company: "仙台精肉店", email: "pn-980-8570@example.com", telephone: "022-211-2111", address: "宮城県仙台市青葉区本町3丁目8番1号" },
  { company: "秋田豆腐屋", email: "pn-010-8570@example.com", telephone: "018-860-1111", address: "秋田県秋田市山王四丁目１－１" },
];
***/

@Injectable()
export class UsersService {
  getUsers(): UserItem[] {
/*** CSVから取得に変更 ***
    return UserItemList;
***/
    const users: UserItem[] = [];
    const FILE = join(resolve(), 'data/UserItemList.csv');

    console.log('対象ファイルのパス', FILE);

    const data = readFileSync(FILE);
    const records = parse(data, {columns: true, trim: true});

    for (const record of records) {
      // console.log(record);

      if( record['company'] != undefined
       && record['email'] != undefined
       && record['telephone'] != undefined
       && record['address'] != undefined) {
          // console.log('record match');
          users.push(record);
      }
    }
    // console.log('END');
    // console.log(users);
    return users;
  }
}
