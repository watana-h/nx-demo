import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';

import { AuthLoginRequestBody, AuthLoginResponseBody } from '@nx-demo/api-interfaces';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/auth')
  @HttpCode(HttpStatus.OK)
  authLogin(@Body() body: AuthLoginRequestBody): AuthLoginResponseBody {
    return this.loginService.authLogin(body);
  }
}
