export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  achievedDate?: string;
}

export interface UserProgress {
  moneySaved: number;
  currentStreak: number;
  maxStreak: number;
  economyHistory: ChartDataPoint[];
  nextAchievement: Achievement;
  achievementsHistory: Achievement[];
}