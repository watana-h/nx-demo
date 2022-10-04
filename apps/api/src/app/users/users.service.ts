import { Injectable } from '@nestjs/common';
import { UserItem, 
         GetUserItemArrayResponseBody,
         GetUserItemResponseBody,
         DeleteUserItemResponseBody,
         AppendUserItemRequestBody,
         AppendUserItemResponseBody,
         UpdateUserItemRequestBody,
         UpdateUserItemResponseBody } from '@nx-demo/api-interfaces';

import { MastorRepository } from '../repositories/master-repository';

@Injectable()
export class UsersService {
  private emsgFileLoad = 'NestJS:対象ファイルの取得でエラーが発生しました。';
  private emsgFileSave = 'NestJS:対象ファイルの更新でエラーが発生しました。';
  private emsgNotFound = 'NestJS:対象とする情報が存在しません。';

  constructor(private masterRepo: MastorRepository) { }

  /**
   * @name getUsers
   * @description 一覧取得
   * @returns GetUserItemArrayResponseBody
   */
  getUsers(): GetUserItemArrayResponseBody {
    console.log('getUsers()');
    let   res: GetUserItemArrayResponseBody;
    const users: UserItem[] | null = this.masterRepo.FindAll();

    if(users) {
      res = {status: 0, item: users};
    } else {
      res = {status: 1, errmsg: this.emsgFileLoad};
    }
    return res;
  }

  /**
   * @name getUser
   * @description 対象idの情報取得
   * @params id
   * @returns GetUserItemResponseBody
   */
  getUser(id: string): GetUserItemResponseBody {
    console.log('getUser(): id=', id);
    let   res: GetUserItemResponseBody;
    const user: UserItem | undefined | null = this.masterRepo.FindOne(id);

    if(user == null) {
      res = {status: 1, errmsg: this.emsgFileLoad};
    } else if(user == undefined) {
      res = {status: 1, errmsg: this.emsgNotFound};
    } else {
      res = {status: 0, item: user};
    }
    return res;
  }

  /**
   * @name deleteUser
   * @description 対象idの情報削除
   * @params id
   * @returns DeleteUserItemResponseBody
   */
  deleteUser(id: string): DeleteUserItemResponseBody {
    console.log('deleteUser(): id=', id);
    let res: DeleteUserItemResponseBody;
    const bResult: boolean = this.masterRepo.DeleteOen(id);

    if (bResult) {
      res = {status: 0};
    } else {
      res = {status: 1, errmsg: this.emsgFileSave};
    }
    return res;
  }

  /**
   * @name updateUser
   * @description 対象idの情報更新
   * @params  UpdateUserItemRequestBody
   * @returns UpdateUserItemResponseBody
   */
  updateUser(body: UpdateUserItemRequestBody): UpdateUserItemResponseBody {
    console.log('updateUser(): id=', body.item.id);
    let res: UpdateUserItemResponseBody;
    const bResult: boolean = this.masterRepo.UpdateOne(body.item);

    if (bResult) {
      res = {status: 0};
    } else {
      res = {status: 1, errmsg: this.emsgFileSave};
    }
    return res;
  }

  /**
   * @name appendUser
   * @description 情報追加
   * @params  AppendUserItemRequestBody
   * @returns AppendUserItemResponseBody
   */
  appendUser(body: AppendUserItemRequestBody): AppendUserItemResponseBody {
    console.log('appendUser()');
    let res: AppendUserItemResponseBody;
    const bResult: boolean = this.masterRepo.AppendOne(body.item);

    if (bResult) {
      res = {status: 0};
    } else {
      res = {status: 1, errmsg: this.emsgFileSave};
    }
    return res;
  }

}
