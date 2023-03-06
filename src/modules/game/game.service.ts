import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { PersonalDataResponseInterface } from './interfaces/responses.interface';
import { Server, Socket } from 'socket.io';
import { RoomModel } from './models/room.model';
import { ToInitResponse, ToUserSyncResponse } from './utils/convertRoom.util';
import { MessageSendInterface } from './interfaces/payloads.interface';
import { compareText } from "./utils/utils";

@Injectable()
export class GameService {
  rooms: { [key: string]: RoomModel } = {};
  socketServer: Server;

  handleConnection(client: Socket) {
    const roomId = client.handshake.query.roomId as string;
    if (!roomId) {
      client.disconnect(); // TODO no roomId handler
      return;
    }

    const currentRoom = this.rooms[roomId]; // TODO Check if room exists

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
      user.socketId = client.id;

      currentRoom.userStats[user.id] = {
        userId: user.id,
        active: true,
        points: 0,
      };

      currentRoom.users[user.id] = user;
    } else {
      currentRoom.userStats[user.id].active = true;
    }
    // Check if user has proper socket
    if (user.socketId !== client.id) {
      const socket = currentRoom.sockets[user.socketId];
      if (socket) {
        socket.socket.disconnect();
        delete currentRoom.sockets[user.socketId];
      }
      user.socketId = client.id;
    }

    currentRoom.sockets[client.id] = {
      socket: client,
      userId: user.id,
    };

    client.join(roomId); // JOIN ROOM
    client.emit('init', ToInitResponse(currentRoom)); // SEND INIT

    client
      .to(roomId) // SEND TO OTHER ROOM USERS
      .emit('userSync', ToUserSyncResponse(this.rooms[roomId]));

    const personalData: PersonalDataResponseInterface =
      currentRoom.personalData[user.id];
    if (personalData) {
      client.emit('personalData', personalData); // UPDATE PERSONAL DATA
    }
  }

  handleDisconnect(client: Socket) {
    const result = this.getUserData(client);
    if (!result) {
      return;
    }
    const { room, user } = result;
    room.userStats[user.id].active = false;
    client
      .to(room.id) // SEND TO OTHER ROOM USERS
      .emit('userSync', ToUserSyncResponse(this.rooms[room.id]));
    delete this.rooms[room.id].sockets[client.id];
  }

  handleMessageSend(client: Socket, payload: MessageSendInterface) {
    const { user, room } = this.getUserData(client);

    console.log(payload);
    const compareResult = compareText(
      payload.message,
      room.roomSettings.guessWord,
    );

    console.log(compareResult);

    if (compareResult == 100) {
      console.log(`${user.id} guessed!`);
    } else if (compareResult > 50) {
      console.log(`${user.id} guessed in ${compareResult}%`);
    } else {
      client.to(room.id).emit('userMessage', {
        userId: user.id,
        message: payload.message,
      });
    }
  }

  handleStartGame(client: Socket) {
    const { room } = this.getUserData(client);
    room.startGame(() => {
      console.log('Next round');
      this.socketServer.to(room.id).emit('roundEnd');
    });
  }

  createRoom() {
    // TODO Proper id generation | proper room generation
    const roomId = '100';
    this.rooms[roomId] = new RoomModel(roomId, this.socketServer);
    return roomId;
  }

  getUserData(client: Socket): { user: UserModel; room: RoomModel } {
    const roomId = client.handshake.query.roomId as string;
    if (!roomId) {
      client.disconnect(); // TODO Proper disconnect message
      return null;
    }

    const room = this.rooms[roomId];
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
}
