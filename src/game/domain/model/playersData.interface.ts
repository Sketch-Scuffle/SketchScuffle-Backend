import { PlayerObject } from './player.object';
import { PersonalDataI, PlayerStatsI } from './player.interface';

export interface PlayerDataI {
  playerObject: PlayerObject;
  // TODO wyjebać do aplikacji
  playerStats: PlayerStatsI;
  personalData: PersonalDataI;
  isActive: boolean;
}
