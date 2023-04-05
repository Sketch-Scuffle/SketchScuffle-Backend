export interface TimerInterface {
  timerTimeout: NodeJS.Timeout | null;
}

export interface CategoryInterface {
  categoryId: string;
  name: string;
  logoUrl: string;
}
