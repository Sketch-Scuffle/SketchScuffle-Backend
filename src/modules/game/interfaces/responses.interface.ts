import { UserStatsInterface } from './user.interface';

export interface InitResponseInterface {
  roomId: string;
  usersObjects: UserResponseInterface[];
  userStats: { [key: string]: UserStatsInterface };
}

export interface UserSyncResponseInterface {
  users: UserResponseInterface[];
  userStats: {
    [key: string]: UserStatsInterface;
  };
}

export interface UserResponseInterface {
  id: string;
  nick: string;
  avatarUrl: string;
}
