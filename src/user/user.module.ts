import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
