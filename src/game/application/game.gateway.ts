import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagePayloadI } from './model/game.payload';
import { PlayerConverter } from './converter/player.converter';
import { UserService } from '../../user/domain/user.service';
import { GameConverter } from './converter/game.converter';
import { GameService } from '../domain/game.service';
import { GatewayPlayersI } from './model/gatewayPlayer.interface';
import { PlayerObject } from '../domain/model/player.object';
import { MessageType } from '../domain/model/messageType.enum';

@WebSocketGateway({ namespace: 'game', cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  players: GatewayPlayersI = {};
  constructor(
    private gameService: GameService,
    private userService: UserService,
  ) {}
  handleConnection(client: Socket): void {
    // TODO Handle reconnect

    const roomId = client.handshake.query.roomId as string;
    if (!roomId) {
      // TODO Handle missing room
      client.disconnect();
    }

    const currentRoom = this.gameService.getRoom(roomId);
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
    client.data.playerId = player.id;
    // TODO nicer way of registering players
    this.players[player.id] = { socket: client, roomId };
    currentRoom.addPlayer(player);

    client.join(roomId);
    client.emit('init', GameConverter.toInitResponse(currentRoom));
  }

  handleDisconnect(client: Socket): void {
    const roomId = client.data.roomId;

    // TODO let player reconnect on lost connection, Proper event for disconnecting
    this.gameService.removePlayer(roomId, client.data.player);

    client.leave(roomId);
    client
      .to(roomId)
      .emit(
        'playerSync',
        GameConverter.toPlayerSyncResponse(this.gameService.getRoom(roomId)),
      );
  }

  @SubscribeMessage('messageSend')
  handleMessageSend(client: Socket, payload: MessagePayloadI): void {
    const { player, roomId } = this.getPlayerData(client.data.playerId);
    const messageType = this.gameService.checkPlayerMessageType(
      player.id,
      roomId,
      payload.message,
    );

    switch (messageType) {
      case MessageType.Message:
        console.log(`${player.nick}: ${payload.message}`);
        client.to(roomId).emit('userMessage', { message: payload.message });
        break;
      case MessageType.CloseGuessMessage:
        console.log(`${player.nick}: Close`);
        break;
      case MessageType.GuessMessage:
        console.log(`${player.nick}: Guessed`);
        break;
    }
  }

  private getPlayerData(playerId: string): {
    player: PlayerObject;
    roomId: string;
  } {
    const roomId = this.players[playerId].roomId;
    return {
      player: this.gameService.getPlayerObject(roomId, playerId),
      roomId,
    };
  }
}
