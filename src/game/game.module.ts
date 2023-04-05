import { Module } from '@nestjs/common';
import { GameGateway } from './application/game.gateway';
import { GameService } from './domain/game.service';
import { GameController } from './application/game.controller';
import { RoomService } from './domain/room.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [GameGateway, GameService, RoomService],
  exports: [GameService],
  controllers: [GameController],
})
export class GameModule {}
