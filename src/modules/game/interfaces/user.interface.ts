export interface UserInterface {
  id: string;
  nick: string;
  avatarUrl: string;
  roomId: string;
  socketId: string;
}

export interface UserStatsInterface {
  userId: string;
  active: boolean;
  points: number;
}

export interface PersonalDataInterface {
  rating: number;
}
