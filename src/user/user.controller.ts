import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('login')
  async login(@Body('email') email, @Body('code') code) {
    return await this.userService.login({ email, code });
  }
}
