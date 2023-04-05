import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from '../domain/game.service';
import { MessagePayloadI } from './model/game.payload';
import { PlayerConverter } from './converter/player.converter';
import { UserService } from '../../user/domain/user.service';
import { GameConverter } from './converter/game.converter';
import { RoomService } from '../domain/room.service';

@WebSocketGateway({ namespace: 'game' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private gameService: GameService,
    private userService: UserService,
    private roomService: RoomService,
  ) {}
  handleConnection(client: Socket): void {
    // TODO Handle reconnect

    const roomId = client.handshake.query.roomId as string;
    if (!roomId) {
      // TODO Handle missing room
      client.disconnect();
    }

    const currentRoom = this.roomService.getRoom(roomId);
    if (!currentRoom) {
      // TODO Poper handling of missing room
      client.disconnect();
    }

    const userId = client.handshake.query.userId as string;
    const user = this.userService.getUser(userId);
    if (!user) {
      // TODO handle missing user;
      client.disconnect();
    }

    const player = PlayerConverter.fromUserObject(user);
    client.data.roomId = roomId;
    client.data.player = player;
    currentRoom.addPlayer(player, client);

    client.join(roomId);
    client.emit('init', GameConverter.toInitResponse(currentRoom));

    console.log(client.data);
  }

  handleDisconnect(client: Socket) {
    const roomId = client.data.roomId;
    this.roomService.removePlayer(roomId, client.data.player);

    client
      .to(roomId)
      .emit(
        'playerSync',
        GameConverter.toPlayerSyncResponse(this.roomService.getRoom(roomId)),
      );
  }

  // @SubscribeMessage('startGame')
  // handleStartGame(client: Socket) {
  //   this.gameService.handleStartGame(client);
  // }

  @SubscribeMessage('messageSend')
  handleMessageSend(client: Socket, payload: MessagePayloadI) {
    const player = client.data.player;
    const roomId = client.data.roomId;

    const guessResult = this.gameService.compareText(
      payload.message,
      this.roomService.getGuessWord(roomId),
    );

    if (guessResult == 100) {
      console.log(`${player.id} guessed!`);
    } else if (guessResult > 50) {
      console.log(`${player.id} guessed in ${guessResult}%`);
    } else {
      client.to(roomId).emit('userMessage', {
        userId: player.id,
        message: payload.message,
      });
    }
  }
}
