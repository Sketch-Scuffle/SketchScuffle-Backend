import { Server, Socket } from 'socket.io';
import { UserModel } from '../models/user.model';
import { PersonalDataInterface, UserStatsInterface } from './user.interface';

export interface TimerInterface {
  timerTimeout: NodeJS.Timeout | null;
}

export interface CategoryInterface {
  categoryId: string;
  name: string;
  logoUrl: string;
}

export interface RoomInterface {
  id: string;
  timer: TimerInterface;
  isRunning: boolean;
  server: Server;
  roomSettings: {
    currentDrawer: string;
    nextDrawer: string;
    roundSeconds: number;
    guessWord: string;
    category: CategoryInterface; // TODO Category
  };
  users: {
    [key: string]: UserModel;
  };
  personalData: {
    [key: string]: PersonalDataInterface;
  };
  userStats: {
    [key: string]: UserStatsInterface;
  };
  sockets: {
    [key: string]: {
      socket: Socket;
      userId: string;
    };
  };
}
