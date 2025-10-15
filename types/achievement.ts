export type AchievementCategory =
  | "daily-streak"
  | "volume-milestone"
  | "trade-count"
  | "referral"
  | "time-bound"
  | "winning-streak";

export type AchievementStatus = "locked" | "in-progress" | "completed";

// Backend response types
export interface BackendAchievement {
  taskCode: string;
  taskName: string;
  status: "completed" | "in_progress" | "locked";
  description: string;
  xpReceived: number;
  totalXp: number;
  progress: number;
  target: number;
  progressPercentage: number;
  category: string;
  difficulty: string;
  icon: string | null;
  completedAt: string | null;
}

export interface BackendAchievementsResponse {
  totalXp: string;
  currentLevel: number;
  achievements: BackendAchievement[];
  summary: {
    total: number;
    completed: number;
    inProgress: number;
    locked: number;
  };
}

// Frontend types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string; // Changed from enum to string to match backend flexibility
  xpReward: number;
  status: AchievementStatus;
  progress?: {
    current: number;
    target: number;
  };
  completedAt?: string;
  icon?: string;
  difficulty?: string;
  progressPercentage?: number;
  xpReceived?: number;
}

export interface AchievementFilters {
  status?: "all" | AchievementStatus;
  category?: "all" | string;
}

export interface AchievementStats {
  totalCompleted: number;
  totalInProgress: number;
  totalLocked: number;
  totalXPEarned: number;
  completionRate: number;
  currentLevel?: number;
  totalXp?: string;
}
