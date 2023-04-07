import { CategoryInterface } from '../../interfaces/room.interface';
import { PlayerObject } from './player.object';
import { PlayerDataI } from './playersData.interface';

export class RoomObject {
  id: string;

  roomSettings: {
    guessWord: string;
    nextDrawer: string;
    currentDrawer: string;
    roundSeconds: number;
    category: CategoryInterface;
  };

  playersData: { [p: string]: PlayerDataI } = {};
  isRunning = false;

  constructor(id: string) {
    this.id = id;

    // TODO Unmock data
    this.roomSettings = {
      nextDrawer: '',
      currentDrawer: '',
      roundSeconds: 1000,
      guessWord: 'gnar',
      category: {
        categoryId: '1234',
        name: 'League of Legends',
        logoUrl: 'https://aha.hahah.pl',
      },
    };
  }
  addPlayer(playerObject: PlayerObject): void {
    this.playersData[playerObject.id] = {
      isActive: true,
      playerObject,
      personalData: { rating: 0 },
      playerStats: {
        points: 0,
      },
    };
  }
  removePlayer(playerId: string): void {
    delete this.playersData[playerId];
  }
}
