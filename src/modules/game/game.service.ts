import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { initResponse } from './interfaces/initResponse.interface';
import { UserToResponse } from './utils/convertUserToResponse.util';
import { Server, Socket } from 'socket.io';
import { RoomModel } from './models/room.model';

@Injectable()
export class GameService {
  handleCreateRoom(server: Server): RoomModel {
    return new RoomModel('100', server);
  }
  handleConnection(client: Socket, rooms: { [key: string]: RoomModel }) {
    const roomId = client.handshake.query.roomId as string;
    if (!roomId) {
      client.disconnect();
      return;
    }

    const currentRoom = rooms[roomId];
    const user = new UserModel();
    user.roomId = roomId;

    currentRoom.users[user.id] = user;
    currentRoom.sockets[client.id] = {
      socket: client,
      userId: user.id,
    };

    const response: initResponse = {
      roomId: currentRoom.id,
      usersObjects: Object.entries(currentRoom.users).map(
        ([, user]: [string, UserModel]) => UserToResponse(user),
      ),
    };
    client.emit('init', response);
  }
}
