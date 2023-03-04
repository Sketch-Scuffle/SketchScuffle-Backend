export interface UserInterface {
  id: string;
  nick: string;
  avatarUrl: string;
  roomId: string;
}

export interface UserResponseInterface {
  id: string;
  nick: string;
  avatarUrl: string;
}

export interface UserStatsInterface {
  userId: string;
  active: boolean;
  points: number;
}
