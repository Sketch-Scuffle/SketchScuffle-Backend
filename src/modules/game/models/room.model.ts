import {
  CategoryInterface,
  RoomInterface,
  TimerInterface,
} from '../interfaces/room.interface';
import { Server, Socket } from 'socket.io';
import { UserModel } from './user.model';
import {
  PersonalDataInterface,
  UserStatsInterface,
} from '../interfaces/user.interface';

export class RoomModel implements RoomInterface {
  id: string;
  timer: TimerInterface = {
    timerTimeout: null,
  };
  server: Server;
  roomSettings: {
    guessWord: string;
    nextDrawer: string;
    currentDrawer: string;
    roundSeconds: number;
    category: CategoryInterface;
  };
  users: { [p: string]: UserModel } = {};
  sockets: { [p: string]: { socket: Socket; userId: string } } = {};
  userStats: { [p: string]: UserStatsInterface } = {};
  personalData: { [p: string]: PersonalDataInterface } = {};
  isRunning = false;

  constructor(id: string, server: Server) {
    this.id = id;
    this.server = server;

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
  startGame(nextRoundCallback: () => void) {
    if (this.isRunning) {
      return;
    }

    this.startTimer(nextRoundCallback);
  }
  startTimer(callback: (...args: any) => any) {
    this.timer.timerTimeout = setTimeout(
      callback,
      this.roomSettings.roundSeconds,
    );
  }
}
