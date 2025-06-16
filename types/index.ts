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

export type CommunityTag = 'desabafo' | 'vitória' | 'gatilhos' | 'motivação' | 'dúvida';

export interface Post {
  id: string;
  authorName: string;
  authorAvatar: any;
  timestamp: string;
  content: string;
  tags: CommunityTag[];
  supportCount: number;
  commentCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  communityUsername: string;
  fyoraAvatar: any;
}

export interface OasisActivity {
  id: string;
  title: string;
  description: string;
  iconName: React.ComponentProps<typeof import('@expo/vector-icons').Ionicons>['name'];
}

export interface FyoraStatus {
  level: number;
  xp: number; 
  xpToNextLevel: number; 
  happiness: number; 
  hunger: number; 
  entertainment: number; 
  energy: number; 
}

export interface PlayerResources {
  feathers: number; 
  streak: number;   
  coins: number;    
}
