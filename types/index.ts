interface ChartDataPoint {
  label: string;
  value: number;
}

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  achievedDate?: string;
}

interface UserProgress {
  moneySaved: number;
  currentStreak: number;
  maxStreak: number;
  economyHistory: ChartDataPoint[];
  nextAchievement: Achievement;
  achievementsHistory: Achievement[];
}

type CommunityTag =
  | "desabafo"
  | "vitória"
  | "gatilhos"
  | "motivação"
  | "dúvida";

interface Post {
  id: number;
  authorId: number;
  authorName: string;
  authorAvatar: any;
  content: string;
  tags: CommunityTag[];
  timestamp: string;
  supportCount: number;
  commentCount: number;
}

interface User {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password?: string;
  communityUsername: string;
  fyoraAvatar: any;
}

interface OasisActivity {
  id: string;
  title: string;
  description: string;
  iconName: React.ComponentProps<
    typeof import("@expo/vector-icons").Ionicons
  >["name"];
}

interface FyoraStatus {
  level: number;
  xp: number;
  xpToNextLevel: number;
  happiness: number;
  hunger: number;
  entertainment: number;
  energy: number;
}

interface PlayerResources {
  feathers: number;
  streak: number;
  coins: number;
}

export {
  Achievement,
  ChartDataPoint,
  CommunityTag,
  FyoraStatus,
  OasisActivity,
  PlayerResources,
  Post,
  User,
  UserProgress,
};
