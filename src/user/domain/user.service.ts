import { Injectable } from '@nestjs/common';
import { UserObject } from './model/user.object';

@Injectable()
export class UserService {
  getUser(userId: string) {
    return new UserObject(
      userId,
      'Unknown' + Math.round(Math.random() * 100) + 1,
      'http://ugabuga.pl/image',
    );
  }
}
