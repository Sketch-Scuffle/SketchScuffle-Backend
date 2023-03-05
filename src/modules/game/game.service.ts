import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { InitResponseInterface } from './interfaces/responses.interface';
import { ConvertUserToResponse } from './utils/convertUserToResponse.util';
import { Socket } from 'socket.io';
import { RoomModel } from './models/room.model';
import { GameGateway } from './game.gateway';
import { ConvertRoomToUserSyncResponse } from "./utils/convertRoomToUserSyncResponse.util";

@Injectable()
export class GameService {
  constructor(
    @Inject(forwardRef(() => GameGateway)) private gameGateway: GameGateway,
  ) {}

  getUserData(client: Socket): {
    user: UserModel;
    room: RoomModel;
  } {
    const roomId = client.handshake.query.roomId as string;
    if (!roomId) {
      client.disconnect(); // TODO Proper disconnect message
      return null;
    }

    const room = this.gameGateway.rooms[roomId];
    if (!room) {
      client.disconnect();
      return null;
    }

    const socket = room.sockets[client.id];
    if (!socket) {
      client.disconnect();
      return null;
    }

    const userId = socket.userId;
    const user = room.users[userId];
    if (!user) {
      client.disconnect();
      return null;
    }

    return {
      room,
      user,
    };
  }

  handleConnection(client: Socket, rooms: { [key: string]: RoomModel }) {
    const roomId = client.handshake.query.roomId as string;
    if (!roomId) {
      client.disconnect();
      return;
    }

    const currentRoom = rooms[roomId]; // TODO Check if room exists

    if (!currentRoom) {
      // TODO Proper handle of missing room
      console.log(`Room: ${roomId} doesn't exist`);
      return;
    }

    const userId = client.handshake.query.userId as string; // TODO Proper authentication
    let user = currentRoom.users[userId];
    if (!user) {
      user = new UserModel(userId);
      user.roomId = roomId;
      currentRoom.userStats[user.id] = {
        active: true,
        points: 0,
      };

      currentRoom.users[user.id] = user;
    }

    currentRoom.sockets[client.id] = {
      socket: client,
      userId: user.id,
    };

    const response: InitResponseInterface = {
      roomId: currentRoom.id,
      usersObjects: Object.entries(currentRoom.users).map(
        ([, user]: [string, UserModel]) => ConvertUserToResponse(user),
      ),
      userStats: currentRoom.userStats,
    };

    client.broadcast.emit(
      'userSync',
      ConvertRoomToUserSyncResponse(rooms[roomId]),
    );
    client.emit('init', response);
  }
}
