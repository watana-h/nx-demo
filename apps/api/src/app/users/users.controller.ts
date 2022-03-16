import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { UserItem } from '@nx-demo/api-interfaces';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(): UserItem[] {
    return this.usersService.getUsers();
  }
}
