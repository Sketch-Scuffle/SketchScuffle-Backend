import { Module } from '@nestjs/common';
import { GameGateway } from './application/game.gateway';
import { GameController } from './application/game.controller';
import { GameService } from './domain/game.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [GameGateway, GameService],
  exports: [GameService],
  controllers: [GameController],
})
export class GameModule {}
