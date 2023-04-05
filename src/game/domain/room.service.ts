import { Injectable } from '@nestjs/common';
import { RoomObject } from './model/room.object';
import { PlayerObject } from './model/player.object';
import { Socket } from 'socket.io';

@Injectable()
export class RoomService {
  rooms: { [key: string]: RoomObject } = {};
  getRoom(roomId: string): RoomObject {
    // TODO handle missing roomID
    return this.rooms[roomId];
  }

  createRoom() {
    const roomId = '100';
    this.rooms[roomId] = new RoomObject(roomId);
    return roomId;
  }

  addPlayer(roomId: string, playerObject: PlayerObject, socket: Socket) {
    this.getRoom(roomId).addPlayer(playerObject, socket);
  }

  removePlayer(roomId: string, playerId: string) {
    this.getRoom(roomId).removePlayer(playerId);
  }

  getGuessWord(roomId: string) {
    return this.getRoom(roomId).roomSettings.guessWord;
  }
}
