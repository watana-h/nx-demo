import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UsersModule, LoginModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
