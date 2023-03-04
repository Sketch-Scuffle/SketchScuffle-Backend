import { UserResponseInterface } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

export const UserToResponse = (user: UserModel): UserResponseInterface => {
  return {
    id: user.id,
    nick: user.nick,
    avatarUrl: user.avatarUrl,
  };
};
