import { RoomModel } from '../models/room.model';
import { UserSyncResponseInterface } from '../interfaces/responses.interface';
import { UserModel } from '../models/user.model';
import { ConvertUserToResponse } from './convertUserToResponse.util';

export const ConvertRoomToUserSyncResponse = (
  room: RoomModel,
): UserSyncResponseInterface => {
  return {
    userStats: {},
    users: Object.entries(room.users).map(([, user]: [string, UserModel]) =>
      ConvertUserToResponse(user),
    ),
  };
};
