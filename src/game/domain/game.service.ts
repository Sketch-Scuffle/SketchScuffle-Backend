import { Injectable } from '@nestjs/common';
import { RoomObject } from './model/room.object';
import { PlayerObject } from './model/player.object';
import { MessageType } from './model/messageType.enum';

@Injectable()
export class GameService {
  rooms: { [key: string]: RoomObject } = {};
  getRoom(roomId: string): RoomObject {
    // TODO handle missing roomID
    return this.rooms[roomId];
  }

  createRoom(): string {
    const roomId = '100';
    this.rooms[roomId] = new RoomObject(roomId);
    return roomId;
  }

  addPlayer(roomId: string, playerObject: PlayerObject): void {
    this.getRoom(roomId).addPlayer(playerObject);
  }

  removePlayer(roomId: string, playerId: string): void {
    this.getRoom(roomId).removePlayer(playerId);
  }

  getGuessWord(roomId: string): string {
    return this.getRoom(roomId).roomSettings.guessWord;
  }
  getPlayerObject(roomId: string, playerId: string): PlayerObject {
    return this.getRoom(roomId).playersData[playerId].playerObject;
  }

  checkPlayerMessageType(
    playerId: string,
    roomId: string,
    message: string,
  ): MessageType {
    const guessPercentage = this.compareText(
      message,
      this.getGuessWord(roomId),
    );

    // TODO handle users guesses
    if (guessPercentage === 100) {
      return MessageType.GuessMessage;
    } else if (guessPercentage > 75) {
      return MessageType.CloseGuessMessage;
    } else {
      return MessageType.Message;
    }
  }

  private compareText(text: string, key: string): number {
    if (text.length > key.length + 2) {
      return 0;
    }

    let matches = 0;
    for (let i = 0; i < key.length; i++) {
      if (!text[i]) {
        break;
      }

      if ((i > 0 && key[i] == text[i - 1]) || key[i] == text[i + 1]) {
        matches += 0.5;
      } else if (key[i] == text[i]) {
        matches++;
      }
    }

    const result = (matches / key.length) * 100;

    if (text.length > key.length) {
      return result - 5;
    }

    return result;
  }
}
