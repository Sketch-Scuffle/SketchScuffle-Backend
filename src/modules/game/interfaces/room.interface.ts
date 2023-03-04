import { Server, Socket } from "socket.io";
import { UserModel } from '../models/user.model';
import { UserStatsInterface } from './user.interface';

export interface TimerInterface {
  timerTimeout: NodeJS.Timeout | null;
}

export interface RoomInterface {
  id: string;
  timer: TimerInterface;
  isRunning: boolean;
  server: Server;
  roomSettings: {
    currentDrawer: string;
    roundSeconds: number;
    category: any; // TODO Category
  };
  users: {
    [key: string]: UserModel;
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
