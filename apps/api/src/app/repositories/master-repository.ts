import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { resolve } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync';

import { UserItem } from '@nx-demo/api-interfaces';

@Injectable()
export class MastorRepository {
  // 対象データソース (CSV)
  private csvFile = '';

  constructor() {
    this.csvFile = join(resolve(), 'data/UserItemList.csv');
  }

  /**
   * @name FindAll
   * @description CSVファイルを全件取得
   * @params 
   * @returns UserItem[] | null 
   */
  FindAll(): UserItem[] | null {
    console.log(' FindAll()');
    const users: UserItem[] = [];

    // 非同期コールバックでのエラー処理実装について知識不足のため
    // import { parse } from 'csv-parse/sync'
    // と同期版を利用して try～catch でエラー処理を構築してみました
    if (!existsSync(this.csvFile)) {
      console.log(' File Not Found [' + this.csvFile + ']');
      return null;
    } else {
      try {   
        // CSVロード&解析
        const data = readFileSync(this.csvFile);
        const records = parse(data, {columns: true, trim: true});

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
            users.push(record);
          }
        }
      } catch (e) {
        console.log(e);
        users.length = 0;
        return null;
      }
    }

    const allcount: number = (users) ? users.length : 0;
    console.log(' 件数=', allcount);
    if (allcount > 0) {
      const deleted = users.filter(function(item) {
        return item.deleted == "1";
      });
      console.log(' 削除件数=', (deleted) ? deleted.length : 0);
    }
    return users;
  }

  /**
   * @name FindOne
   * @description CSVファイルから１件取得
   * @params  id
   * @returns UserItem | nudefined | null
   */
  FindOne(id: string): UserItem | undefined | null {
    console.log(' FindOne(): id=', id);
    const users: UserItem[] | null = this.FindAll();

    if(users != null) {
      const target: UserItem | undefined = users.find(value => value.id == id );
      if (target != undefined) {
        return target;
      } else {
        console.log(' Id Not Found');
        return undefined;
      }
    } else {
      console.log(' Data Is Null');
      return null;
    }
  }

  /**
   * @name SaveAll
   * @description users を CSV に書き出す
   * @params  UserItem[]
   * @returns boolean
   */
  SaveAll(users: UserItem[]): boolean {
    console.log(' SaveAll()');
    let  bResult = false;

    if (users) {
      // 非同期コールバックでファイル出力とした場合のエラー処理実装について知識不足のため
      // import { stringify } from 'csv-stringify/sync'
      // と同期版を利用して try～catch でエラー処理を構築してみました
      try {
        const sheet: string =  stringify(users, { header: true, quoted_string: true});
        writeFileSync(this.csvFile, sheet);
        bResult = true;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log(' Data Is Null');
    }
    return bResult;
  }

  /**
   * @name UpdateOne
   * description CSVファイルに１件更新
   * @params  UserItem
   * @returns boolean
   */
  UpdateOne(user: UserItem): boolean {
    console.log(' UpdateOne(): id=', user.id);
    let  bResult = false;
    const users: UserItem[] | null = this.FindAll();

    if(users) {
      const index: number = users.findIndex(item => item.id == user.id);
      if(index >= 0) {
        users[index].company   = user.company;
        users[index].email     = user.email;
        users[index].telephone = user.telephone;
        users[index].address   = user.address;
        users[index].account   = user.account;
        users[index].password  = user.password;
        bResult = this.SaveAll(users);
      } else {
        console.log(' Id Not Found');
      }
    } else {
      console.log(' Data Is Null');
    }
    return bResult;
  }

  /**
   * @name DeleteOne
   * @description CSVファイルから１件削除
   * @params  id
   * @returns boolean
   */
  DeleteOen(id: string): boolean {
    console.log(' DeleteOne(): id=', id);
    let  bResult = false;
    const users: UserItem[] | null = this.FindAll();

    if(users) {
      const index: number = users.findIndex(item => item.id == id);
      if(index >= 0) {
        users[index].deleted = "1";
        bResult = this.SaveAll(users);
      } else {
        console.log(' Id Not Found');
      }
    } else {
      console.log(' Data Is Null');
    }
    return bResult;
  }

  /**
   * @name AppendOne
   * @description CSVファイルに１件追加
   * @params  UserItem
   * @returns boolean
   */
  AppendOne(user: UserItem): boolean {
    console.log(' AppendOne()');
    let  bResult = false;
    const users: UserItem[] | null = this.FindAll();
    
    if(users) {
      // 現時点 id の最大値
      const initialVals = 0;
      const maxVals: number = users.reduce(
        (previousValue, currentItem) => Math.max(previousValue, Number(currentItem.id)), initialVals
      );
      // ゼロパディング文字列
      const newId: string = ('0000' + (maxVals + 1)).slice(-4);
      console.log(' newId=', newId);
      // 追加
      const newItem : UserItem =
	      {id: newId, 
         company: user.company,
         email: user.email, 
         telephone: user.telephone,
         address: user.address, 
         account: user.account,
         password: user.password, 
         deleted: "0" };
      users.push(newItem);
      bResult = this.SaveAll(users);
    } else {
      console.log(' Data Is Null');
    }
    return bResult;
  }

}
