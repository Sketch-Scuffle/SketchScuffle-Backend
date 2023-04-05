import { PlayerObject } from './player.object';
import { Socket } from 'socket.io';
import { PersonalDataI, PlayerStatsI } from './player.interface';

export interface PlayerDataI {
  playerObject: PlayerObject;
  playerSocket: Socket;
  playerStats: PlayerStatsI;
  personalData: PersonalDataI;
  isActive: boolean;
}
