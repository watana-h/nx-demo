import { Controller, Get, Delete, Put, Post, Body, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { UserItem, 
         GetUserItemArrayResponseBody, 
         GetUserItemResponseBody,
         DeleteUserItemResponseBody,
         AppendUserItemRequestBody,
         AppendUserItemResponseBody,
         UpdateUserItemRequestBody,
         UpdateUserItemResponseBody } from '@nx-demo/api-interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @description 一覧取得
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(): GetUserItemArrayResponseBody {
    return this.usersService.getUsers();
  }

  /**
   * @description 対象idの情報取得
   * @params id
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK) 
  getUser(@Param('id') id: string): GetUserItemResponseBody {
    return this.usersService.getUser(id)
  }

  /**
   * @description 対象idの情報削除
   * @params id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK) 
  deleteUser(@Param('id') id: string): DeleteUserItemResponseBody {
    return this.usersService.deleteUser(id)
  }

  /**
   * @description 対象idの情報更新
   * @params UpdateUserItemRequestBody
   */
  @Put('update')
  @HttpCode(HttpStatus.OK) 
  updateUser(@Body() body: UpdateUserItemRequestBody): UpdateUserItemResponseBody {
    return this.usersService.updateUser(body)
  }

  /**
   * @description 情報追加
   * @params AppendUserItemRequestBody
   */
  @Post('append')
  @HttpCode(HttpStatus.OK) 
  appendUser(@Body() body: AppendUserItemRequestBody): AppendUserItemResponseBody {
    return this.usersService.appendUser(body)
  }
}
