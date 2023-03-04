import { UserResponseInterface } from './user.interface';

export interface initResponse {
  roomId: string;
  usersObjects: UserResponseInterface[];
}
