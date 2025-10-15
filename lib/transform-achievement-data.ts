import type {
  Achievement,
  AchievementFilters,
  AchievementStats,
  AchievementStatus,
  BackendAchievement,
  BackendAchievementsResponse,
} from "@/types/achievement";

/**
 * Converts backend achievement status to frontend status
 */
function convertStatus(
  backendStatus: "completed" | "in_progress" | "locked",
): AchievementStatus {
  if (backendStatus === "in_progress") return "in-progress";

  return backendStatus as AchievementStatus;
}

/**
 * Transforms a single backend achievement to frontend format
 */
function transformAchievement(
  backendAchievement: BackendAchievement,
): Achievement {
  return {
    id: backendAchievement.taskCode,
    title: backendAchievement.taskName,
    description: backendAchievement.description,
    category: backendAchievement.category,
    xpReward: backendAchievement.totalXp,
    status: convertStatus(backendAchievement.status),
    progress:
      backendAchievement.target > 0
        ? {
            current: backendAchievement.progress,
            target: backendAchievement.target,
          }
        : undefined,
    completedAt: backendAchievement.completedAt || undefined,
    icon: backendAchievement.icon || undefined,
    difficulty: backendAchievement.difficulty,
    progressPercentage: backendAchievement.progressPercentage,
    xpReceived: backendAchievement.xpReceived,
  };
}

/**
 * Transforms backend achievements response to frontend format
 */
export function transformBackendAchievements(
  backendResponse: BackendAchievementsResponse,
): Achievement[] {
  return backendResponse.achievements.map(transformAchievement);
}

/**
 * Calculates achievement statistics from achievements array and backend summary
 */
export function calculateAchievementStats(
  achievements: Achievement[],
  backendSummary: BackendAchievementsResponse["summary"],
  totalXp: string,
  currentLevel: number,
): AchievementStats {
  // Calculate total XP earned from completed achievements
  const totalXPEarned = achievements.reduce(
    (sum, achievement) => sum + (achievement.xpReceived || 0),
    0,
  );

  // Calculate completion rate
  const completionRate =
    backendSummary.total > 0
      ? (backendSummary.completed / backendSummary.total) * 100
      : 0;

  return {
    totalCompleted: backendSummary.completed,
    totalInProgress: backendSummary.inProgress,
    totalLocked: backendSummary.locked,
    totalXPEarned,
    completionRate,
    currentLevel,
    totalXp,
  };
}

/**
 * Filters achievements based on provided filters
 */
export function filterAchievements(
  achievements: Achievement[],
  filters?: AchievementFilters,
): Achievement[] {
  if (!filters) return achievements;

  let filtered = achievements;

  // Apply status filter
  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter(
      (achievement) => achievement.status === filters.status,
    );
  }

  // Apply category filter
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(
      (achievement) => achievement.category === filters.category,
    );
  }

  return filtered;
}

/**
 * Extracts unique categories from achievements
 */
export function getUniqueCategories(achievements: Achievement[]): string[] {
  const categories = new Set(achievements.map((a) => a.category));

  return Array.from(categories).sort();
}
