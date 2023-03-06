import { RoomModel } from '../models/room.model';
import {
  InitResponseInterface,
  RoomSettingsResponseInterface,
  UserSyncResponseInterface,
} from '../interfaces/responses.interface';
import { UserModel } from '../models/user.model';
import { ToUserResponse } from './convertUser.util';

export const ToUserSyncResponse = (
  room: RoomModel,
): UserSyncResponseInterface => {
  return {
    userStats: room.userStats,
    usersObjects: Object.entries(room.users).map(
      ([, user]: [string, UserModel]) => ToUserResponse(user),
    ),
  };
};

export const ToInitResponse = (room: RoomModel): InitResponseInterface => {
  const { userStats, usersObjects } = ToUserSyncResponse(room);

  return {
    roomId: room.id,
    roomSettings: ToRoomSettings(room),
    userStats,
    usersObjects: usersObjects,
  };
};

export const ToRoomSettings = (
  room: RoomModel,
): RoomSettingsResponseInterface => {
  return {
    categoryObject: room.roomSettings.category,
    currentDrawer: room.roomSettings.currentDrawer,
    nextDrawer: room.roomSettings.nextDrawer,
  };
};
