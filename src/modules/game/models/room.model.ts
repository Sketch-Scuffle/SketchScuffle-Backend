import { RoomInterface, TimerInterface } from '../interfaces/room.interface';
import { Server, Socket } from 'socket.io';
import { UserModel } from './user.model';
import { UserStatsInterface } from '../interfaces/user.interface';

export class RoomModel implements RoomInterface {
  id: string;
  timer: TimerInterface;
  server: Server;
  roomSettings: { currentDrawer: string; roundSeconds: number; category: any };
  users: { [p: string]: UserModel } = {};
  sockets: { [p: string]: { socket: Socket; userId: string } } = {};
  userStats: { [p: string]: UserStatsInterface } = {};
  isRunning = false;

  constructor(id: string, server: Server) {
    this.id = id;
    this.roomSettings = {
      currentDrawer: '',
      roundSeconds: 1000,
      category: '',
    };
    this.timer = {
      timerTimeout: null,
    };

    this.server = server;
  }
  startGame() {
    if (this.isRunning) {
      return;
    }

    this.startTimer(() => {
      console.log('Next round'); // ToDo nextround handler
      this.server.emit('msg', 'Next round');
    });
  }
  startTimer(callback: (...args: any) => any) {
    this.timer.timerTimeout = setTimeout(
      callback,
      this.roomSettings.roundSeconds,
    );
  }
}
