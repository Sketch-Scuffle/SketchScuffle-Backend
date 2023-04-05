import { RoomObject } from '../../domain/model/room.object';
import { RoomSettingsResponseI } from '../model/game.response';
import { PlayerDataDto } from '../dto/playerData.dto';
import { PlayerConverter } from './player.converter';

export class RoomConverter {
  static toRoomSettingsResponse(roomObject: RoomObject): RoomSettingsResponseI {
    return {
      categoryObject: roomObject.roomSettings.category,
      currentDrawer: roomObject.roomSettings.currentDrawer,
      nextDrawer: roomObject.roomSettings.nextDrawer,
    };
  }

  static toPlayersDataDto(room: RoomObject): PlayerDataDto[] {
    return Object.entries(room.playersData).map(([, player]): PlayerDataDto => {
      return {
        isActive: player.isActive,
        personalData: player.personalData,
        playerObject: PlayerConverter.toPlayerDto(player.playerObject),
        playerStats: player.playerStats,
      };
    });
  }
}
