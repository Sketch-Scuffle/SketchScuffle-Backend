import { PlayerDataDto } from '../dto/playerData.dto';

export interface PlayerStatsResponseI {
  points: number;
}

export interface PlayerSyncResponseI {
  playersObjects: PlayerDataDto[];
}
