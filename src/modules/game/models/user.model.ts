import { UserInterface } from '../interfaces/user.interface';

export class UserModel implements UserInterface {
  id: string;
  nick: string;
  avatarUrl: string;
  constructor(id: string) {
    this.id = id;
    this.nick = 'Unknown' + Math.round(Math.random() * 100) + 1;
    this.avatarUrl = 'http://ugabuga.pl/image';
  }

  roomId: string;
  socketId: string;
}
