import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { MessageSendInterface } from './interfaces/payloads.interface';

@WebSocketGateway({ namespace: 'game' })
export class GameGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private gameService: GameService) {}

  afterInit(server: Server) {
    this.gameService.socketServer = server;
  }

  handleConnection(client: Socket): any {
    this.gameService.handleConnection(client);
  }

  handleDisconnect(client: Socket) {
    this.gameService.handleDisconnect(client);
  }

  @SubscribeMessage('startGame')
  handleStartGame(client: Socket) {
    this.gameService.handleStartGame(client);
  }

  @SubscribeMessage('messageSend')
  handleMessageSend(client: Socket, payload: MessageSendInterface) {
    this.gameService.handleMessageSend(client, payload);
  }
}
