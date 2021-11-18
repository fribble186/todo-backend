import { Body, Controller, Post } from '@nestjs/common';
import { VerifyService } from './verify.service';

@Controller('verify')
export class VerifyController {
  constructor(private verifyService: VerifyService) {}

  @Post('sendVerify')
  async sendVerify(@Body('email') email) {
    return await this.verifyService.sendVerifyEmail({ email });
  }
}
