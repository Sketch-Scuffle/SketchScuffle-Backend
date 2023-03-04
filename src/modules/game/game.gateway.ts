import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { GameService } from './game.service';
import { RoomModel } from './models/room.model';

@Injectable()
@WebSocketGateway({ namespace: 'game' })
export class GameGateway implements OnGatewayConnection, OnGatewayInit {
  private rooms: { [key: string]: RoomModel } = {};
  @WebSocketServer() server: Server;
  constructor(private gameService: GameService) {
    // TODO Proper id generation | proper room generation
  }

  afterInit(server: Server) {
    const room = this.gameService.handleCreateRoom(server);
    this.rooms[room.id] = room;
  }

  handleConnection(client: Socket): any {
    this.gameService.handleConnection(client, this.rooms);
  }
  @SubscribeMessage('startGame')
  handleStartGame(client: Socket): any {
    const roomId = client.handshake.query.roomId as string;
    if (!roomId) {
      client.disconnect();
      return;
    }

    const room = this.rooms[roomId];
    if (!room) {
      client.disconnect();
      return;
    }

    const socket = room.sockets[client.id];
    if (!socket) {
      client.disconnect();
      return;
    }

    const userId = socket.userId;
    const user = room.users[userId];
    if (!user) {
      client.disconnect();
      return;
    }

    room.startGame();
  }
}
