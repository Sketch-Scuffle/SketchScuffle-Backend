import { Socket } from 'socket.io';

export interface GatewayPlayersI {
  [id: string]: GatewayPlayerI;
}

export interface GatewayPlayerI {
  socket: Socket;
  roomId: string;
}
