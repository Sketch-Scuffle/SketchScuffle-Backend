import { UserModel } from '../models/user.model';
import { UserResponseInterface } from '../interfaces/responses.interface';

export const ToUserResponse = (user: UserModel): UserResponseInterface => {
  return {
    id: user.id,
    nick: user.nick,
    avatarUrl: user.avatarUrl,
  };
};
