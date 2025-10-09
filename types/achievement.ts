export type AchievementCategory =
  | "daily-streak"
  | "volume-milestone"
  | "trade-count"
  | "referral"
  | "time-bound"
  | "winning-streak";

export type AchievementStatus = "locked" | "in-progress" | "completed";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  xpReward: number;
  status: AchievementStatus;
  progress?: {
    current: number;
    target: number;
  };
  completedAt?: string;
  icon?: string;
}

export interface AchievementFilters {
  status?: "all" | AchievementStatus;
  category?: "all" | AchievementCategory;
}

export interface AchievementStats {
  totalCompleted: number;
  totalInProgress: number;
  totalLocked: number;
  totalXPEarned: number;
  completionRate: number;
}
