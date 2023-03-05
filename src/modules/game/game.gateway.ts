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
import { UserModel } from './models/user.model';

@Injectable()
@WebSocketGateway({ namespace: 'game' })
export class GameGateway implements OnGatewayConnection {
  rooms: { [key: string]: RoomModel } = {};
  @WebSocketServer() server: Server;
  constructor(private gameService: GameService) {
    // TODO Proper id generation | proper room generation
  }

  createRoom() {
    const roomId = '100';
    this.rooms[roomId] = new RoomModel(roomId, this.server);
    return roomId;
  }

  handleConnection(client: Socket): any {
    this.gameService.handleConnection(client, this.rooms);
  }
  @SubscribeMessage('startGame')
  handleStartGame(client: Socket): any {
    const { room } = this.gameService.getUserData(client);
    room.startGame();
  }
}
