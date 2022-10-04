import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MastorRepository } from '../repositories/master-repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MastorRepository],
})
export class UsersModule {}
