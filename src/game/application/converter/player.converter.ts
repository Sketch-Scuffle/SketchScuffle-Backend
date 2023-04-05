import { PlayerObject } from '../../domain/model/player.object';
import { UserObject } from '../../../user/domain/model/user.object';

export class PlayerConverter {
  static toPlayerDto(playerObject: PlayerObject): PlayerDto {
    return {
      id: playerObject.id,
      nick: playerObject.nick,
      avatarUrl: playerObject.avatarUrl,
    };
  }

  static fromUserObject(userObject: UserObject): PlayerObject {
    return new PlayerObject(
      userObject.id,
      userObject.nick,
      userObject.avatarUrl,
    );
  }
}
