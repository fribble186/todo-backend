import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Verify } from './verify.entity';

@Injectable()
export class VerifyService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Verify) private verifyRepository: Repository<Verify>,
  ) {}

  async sendVerifyEmail({ email }: { email: string }) {
    let verifyCode = '';
    for (let i = 0; i < 4; i++) {
      verifyCode += String.fromCharCode(
        Math.floor(Math.random() * 26) + 'a'.charCodeAt(0),
      );
    }
    verifyCode = verifyCode.toUpperCase();
    this.verifyRepository.insert({
      email,
      code: verifyCode,
    });
    try {
      await this.mailerService.sendMail({
        from: 'todo_fribble186@163.com',
        to: email,
        subject: '您有一封 todo list 的验证码，快来查收一下吧！',
        text: verifyCode,
      });
      return { success: true };
    } catch (e) {
      return { success: false, message: e };
    }
  }
}
