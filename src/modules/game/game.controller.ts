import { Controller, Post } from '@nestjs/common';
import { GameGateway } from './game.gateway';

@Controller('game')
export class GameController {
  constructor(private gameGateway: GameGateway) {}
  @Post('/create')
  createGame(): any {
    const roomId = this.gameGateway.createRoom();
    return {
      roomId,
    };
  }
}
