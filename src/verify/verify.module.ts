import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyController } from './verify.controller';
import { Verify } from './verify.entity';
import { VerifyService } from './verify.service';

@Module({
  imports: [TypeOrmModule.forFeature([Verify])],
  controllers: [VerifyController],
  providers: [VerifyService],
})
export class VerifyModule {}
