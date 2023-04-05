import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  compareText(text: string, key: string): number {
    if (text.length > key.length + 2) {
      return 0;
    }

    let matches = 0;
    for (let i = 0; i < key.length; i++) {
      if (!text[i]) {
        break;
      }

      if ((i > 0 && key[i] == text[i - 1]) || key[i] == text[i + 1]) {
        matches += 0.5;
      } else if (key[i] == text[i]) {
        matches++;
      }
    }

    if (text.length > key.length) {
      return (matches / key.length) * 75;
    }

    return (matches / key.length) * 100;
  }

  // handleStartGame(client: Socket) {
  //   const { room } = this.getPlayerData(client);
  //   room.startGame(() => {
  //     console.log('Next round');
  //     this.socketServer.to(room.id).emit('roundEnd');
  //   });
  // }
}
