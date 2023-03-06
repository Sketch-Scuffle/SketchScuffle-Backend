import { UserStatsInterface } from './user.interface';
import { CategoryInterface } from './room.interface';

export interface RoomSettingsResponseInterface {
  currentDrawer: string;
  nextDrawer: string;
  categoryObject: CategoryInterface;
}

export interface InitResponseInterface {
  roomId: string;
  usersObjects: UserResponseInterface[];
  userStats: { [key: string]: UserStatsInterface };
  roomSettings: RoomSettingsResponseInterface;
}

export interface UserSyncResponseInterface {
  usersObjects: UserResponseInterface[];
  userStats: {
    [key: string]: UserStatsInterface;
  };
}

export interface UserResponseInterface {
  id: string;
  nick: string;
  avatarUrl: string;
}

export interface PersonalDataResponseInterface {
  rating: number;
}
