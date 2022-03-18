import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

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

  @Get(':company')
  @HttpCode(HttpStatus.OK) 
  getUser(@Param('company') company: string): UserItem {
    return this.usersService.getUser(company)
  }
}
