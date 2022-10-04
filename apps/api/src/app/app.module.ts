import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';
import { MastorRepository } from './repositories/master-repository';

@Module({
  imports: [UsersModule, LoginModule],
  controllers: [UsersController, LoginController],
  providers: [UsersService, LoginService, MastorRepository],
})
export class AppModule {}
