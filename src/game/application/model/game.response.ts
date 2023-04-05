import { CategoryInterface } from '../../interfaces/room.interface';
import { PlayerDataDto } from '../dto/playerData.dto';

export interface InitResponseI {
  roomId: string;
  playersData: PlayerDataDto[];
  roomSettings: RoomSettingsResponseI;
}

export interface RoomSettingsResponseI {
  currentDrawer: string;
  nextDrawer: string;
  categoryObject: CategoryInterface;
}
