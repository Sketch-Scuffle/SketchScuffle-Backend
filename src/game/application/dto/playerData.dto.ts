import { PersonalDataI } from '../../domain/model/player.interface';
import { PlayerStatsResponseI } from '../model/player.response';

export class PlayerDataDto {
  playerObject: PlayerDto;
  playerStats: PlayerStatsResponseI;
  personalData: PersonalDataI;
  isActive: boolean;
}
