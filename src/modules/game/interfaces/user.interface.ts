export interface UserInterface {
  id: string;
  nick: string;
  avatarUrl: string;
  roomId: string;
}

export interface UserStatsInterface {
  active: boolean;
  points: number;
}
