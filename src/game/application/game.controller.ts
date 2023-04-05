import { Controller, Post } from '@nestjs/common';
import { GameService } from '../domain/game.service';
import { RoomService } from '../domain/room.service';

@Controller('game')
export class GameController {
  constructor(private roomService: RoomService) {}
  @Post('/create')
  createGame(): any {
    const roomId = this.roomService.createRoom();
    return {
      roomId,
    };
  }
}
