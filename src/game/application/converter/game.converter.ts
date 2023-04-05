import { RoomObject } from '../../domain/model/room.object';
import { InitResponseI } from '../model/game.response';
import { RoomConverter } from './room.converter';
import { PlayerSyncResponseI } from '../model/player.response';

export class GameConverter {
  static toPlayerSyncResponse(room: RoomObject): PlayerSyncResponseI {
    return {
      playersObjects: RoomConverter.toPlayersDataDto(room),
    };
  }
  static toInitResponse(room: RoomObject): InitResponseI {
    return {
      roomId: room.id,
      roomSettings: RoomConverter.toRoomSettingsResponse(room),
      playersData: RoomConverter.toPlayersDataDto(room),
    };
  }
}
