import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verify } from 'src/verify/verify.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepositry: Repository<User>,
    @InjectRepository(Verify) private verifyRepository: Repository<Verify>,
  ) {}

  async login({ email, code }: { email: string; code: string }) {
    if (await this.verifyRepository.findOne({ where: { email, code } })) {
      const user = await this.userRepositry.findOne({ where: { email } });
      if (!user) {
        this.userRepositry.insert({ email });
      }
      return { success: true };
    } else {
      return { success: false, message: '验证码错误' };
    }
  }
}
